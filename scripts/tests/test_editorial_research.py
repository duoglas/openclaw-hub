import copy
import datetime as dt
import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
from types import SimpleNamespace

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import editorial_pipeline as e
import editorial_research as r

URL='https://github.com/deepseek-ai/deepseek-harness'
URL2='https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.md'
TEXT='DeepSeek Harness is a developer preview. This is public documentation, not a runtime test.\n'*15
TOPIC={'id':'harness-safety','pillar':'agents','question':'What must a developer verify before evaluating this harness?',
       'source_urls':[URL,URL2],'required_points':['Check preview status and safety limitations.'],'not_before':'2026-10-29','enabled':True}

class PublicResearchTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
        self.state=self.root/'state';self.state.mkdir();self.run=self.root/'run';self.run.mkdir()
        self.stamp=e.now().isoformat();e.save(self.root/'editorial/topics.json',[TOPIC])
        e.save(self.state/'private-output-policy.json',{'version':1,'blocked_literals':['SYNTHETIC_PRIVATE_MARKER']})
        (self.state/'private-output-policy.json').chmod(0o600)
    def tearDown(self):self.tmp.cleanup()
    def store(self,url=URL,text=TEXT,stamp=None):return r.store_source(e,self.state,url,text,stamp or self.stamp)
    def test_only_approved_public_sources(self):
        for url in ['https://localhost/a','https://127.0.0.1/a','https://github.com/other/private','https://github.com/deepseek-ai/../other','https://github.com/deepseek-ai/%2e%2e/a',URL+'?token=secret',URL+'#fragment','https://github.com.evil.test/deepseek-ai/a']:
            with self.subTest(url=url),self.assertRaises(e.Blocked):r.approved_url(e,url)
        self.assertEqual(r.approved_url(e,URL),URL)
    def test_registry_unknown_private_fields_rejected(self):
        row=copy.deepcopy(TOPIC);row['private_references']=['private-file'];e.save(self.root/'editorial/topics.json',[row])
        with self.assertRaises(e.Blocked):r.topics(e,self.root)
    def test_registry_private_paths_rejected(self):
        row=copy.deepcopy(TOPIC);row['question']='Read /Users/person/private-note before drafting';e.save(self.root/'editorial/topics.json',[row])
        with self.assertRaises(e.Blocked):r.topics(e,self.root)
    def test_registry_duplicate_id_rejected(self):
        e.save(self.root/'editorial/topics.json',[TOPIC,TOPIC])
        with self.assertRaises(e.Blocked):r.topics(e,self.root)
    def test_disabled_and_future_topics_not_selected(self):
        for updates in ({'enabled':False},{'not_before':'2099-01-01'}):
            e.save(self.root/'editorial/topics.json',[TOPIC|updates])
            with self.assertRaises(e.Skip):r.select_topic(e,self.root,'2026-10-29')
    def test_topic_dedup_is_not_per_day(self):
        e.save(self.root/'editorial/receipts/old.json',{'kind':'guide','topic_id':TOPIC['id']})
        with self.assertRaises(e.Skip):r.select_topic(e,self.root,'2026-10-30')
    def test_public_cache_integrity(self):
        self.store();source=r.cached_source(e,self.state,URL)
        self.assertEqual(source['sha256'],e.digest(TEXT));self.assertIsNone(source['source_date'])
        self.assertNotIn('original_file',source)
        _,_,raw=r.cache_paths(e,self.state,URL);raw.write_text(TEXT+'alteration')
        with self.assertRaises(e.Blocked):r.cached_source(e,self.state,URL)
    def test_cache_url_binding(self):
        self.store();_,meta,_=r.cache_paths(e,self.state,URL);record=e.load(meta);record['url']=URL2;e.save(meta,record)
        with self.assertRaises(e.Blocked):r.cached_source(e,self.state,URL)
    def test_old_source_expires(self):
        self.store(stamp=(e.now()-dt.timedelta(days=8)).isoformat())
        self.assertIsNone(r.cached_source(e,self.state,URL))
    def test_future_and_naive_time_rejected(self):
        for stamp in ((e.now()+dt.timedelta(days=1)).isoformat(),'2026-10-29T00:00:00'):
            with self.assertRaises(e.Blocked):self.store(stamp=stamp)
    def test_error_page_rejected(self):
        for text in ['# 404 - page not found\n'+'menu '*200,'Cannot find a valid ref in main/SAFETY.md\n'+'menu '*200,'tiny']:
            with self.assertRaises(e.Blocked):self.store(text=text)
    def test_cache_symlink_escape_rejected(self):
        self.store();folder,meta,raw=r.cache_paths(e,self.state,URL);raw.unlink();outside=self.root/'outside';outside.write_text(TEXT);raw.symlink_to(outside)
        with self.assertRaises(e.Blocked):r.cached_source(e,self.state,URL)
        with self.assertRaises(e.Blocked):self.store()
    def test_old_original_survives_cache_refresh(self):
        self.store();self.store(text=TEXT+'New public paragraph.')
        archive=self.state/'research/originals'/('source-'+e.digest(TEXT)+'.md')
        self.assertEqual(archive.read_text(),TEXT)
    def test_cache_hit_does_not_claim_network_success(self):
        self.store();self.store(URL2)
        with patch.object(r,'tvly',side_effect=AssertionError('must use valid cache')):
            packet=r.prepare_guide(e,self.root,self.state,'2026-10-29',self.run)
        self.assertEqual(packet['kind'],'guide');self.assertIsNone(packet['items'][0]['event_date'])
        status=e.load(self.state/'research/latest-collection.json')
        self.assertFalse(status['network_exercised']);self.assertEqual(status['status'],'verified_cache')
    def test_extraction_requires_exact_url(self):
        with patch.object(r,'tvly',return_value={'results':[{'url':URL2,'raw_content':TEXT}]}):
            with self.assertRaises(e.Blocked):r.fetch_sources(e,self.state,[URL],self.run)
    def test_guide_slug_and_receipt_stable(self):
        packet={'kind':'guide','date':'2026-10-29','topic_id':'harness-safety'}
        self.assertEqual(e.article_slug({},packet),'ai-guide-harness-safety')
        self.assertIn('guide-harness-safety.json',e.receipt_path(packet))
        with self.assertRaises(e.Blocked):e.article_slug({},packet|{'topic_id':'../escape'})
    def test_unreceipted_guide_rejected(self):
        e.save(self.root/'src/content/blog/en/ai-guide-harness-safety.md','unreviewed')
        with self.assertRaises(e.Blocked):e.validate_published(self.root)
    def test_zero_news_creates_no_empty_report(self):
        with patch.object(r,'tvly',return_value={'results':[{'url':URL}]}),patch.object(r,'fetch_sources',return_value=[]),patch.object(e,'model_json',return_value=({'items':[]},{})):
            with self.assertRaises(e.Skip):r.collect_daily(e,self.root,self.state,'2026-10-29',self.run)
        self.assertFalse((self.state/'research/news/2026-10-29/report.json').exists())
    def test_more_than_three_news_events_rejected(self):
        with patch.object(r,'tvly',return_value={'results':[{'url':URL}]}),patch.object(r,'fetch_sources',return_value=[]),patch.object(e,'model_json',return_value=({'items':[{}]*4},{})):
            with self.assertRaises(e.Blocked):r.collect_daily(e,self.root,self.state,'2026-10-29',self.run)
    def test_positive_news_uses_original_hash_and_quote_validator(self):
        text='Released 2026-10-29: the agent harness has a new stable API.\n'+TEXT
        self.store(text=text);source=r.cached_source(e,self.state,URL)
        item={'event_key':'agent-stable-api','title':'Agent API release','event_date':'2026-10-29','facts':'The agent harness has a new stable API.',
              'source_urls':[URL],'evidence_quotes':[{'url':URL,'quote':'Released 2026-10-29: the agent harness has a new stable API.'}]}
        with patch.object(r,'tvly',return_value={'results':[{'url':URL}]}),patch.object(r,'fetch_sources',return_value=[source]),patch.object(e,'model_json',return_value=({'items':[item]},{'input_sha256':'a'*64})):
            packet=r.collect_daily(e,self.root,self.state,'2026-10-29',self.run)
        self.assertEqual(packet['source_method'],'website-independent-public-research')
        self.assertEqual(packet['sources'][0]['sha256'],e.digest(text))
        self.assertEqual(len(packet['items']),1)
    def test_wrong_guide_receipt_slug_rejected(self):
        receipt={'version':2,'kind':'guide','date':'2026-10-29','topic_id':'harness-safety','slug':'wrong','pillar':'agents',
                 'review':{'verdict':'pass','checks':{k:True for k in e.CHECKS},'reasons':['bounded evidence']}}
        e.save(self.root/'editorial/receipts/bad.json',receipt)
        with self.assertRaisesRegex(e.Blocked,'topic/slug/category'):e.validate_published(self.root)
    def test_guide_backfill_and_misplaced_topic_rejected(self):
        with self.assertRaises(e.Blocked):e.run_pipeline('guide','2026-10-29',True)
        with self.assertRaises(e.Blocked):e.run_pipeline('daily','2026-10-29',False,'harness-safety')
    def test_focus_quote_retrieves_verified_middle_context(self):
        quote='This sentence is an exact public evidence anchor.'
        self.store(text='opening '+('x'*30000)+quote+('y'*30000)+' final limitation')
        source=r.cached_source(e,self.state,URL)
        self.assertNotIn(quote,source['excerpt'])
        focused=r.focus_source(e,self.state,source,[quote])
        self.assertIn(quote,focused['excerpt']);self.assertEqual(focused['sha256'],source['sha256'])
        self.assertIn('EXCERPT BOUNDARY',focused['excerpt'])
    def test_invented_focus_quote_and_altered_archive_fail_closed(self):
        self.store();source=r.cached_source(e,self.state,URL)
        with self.assertRaisesRegex(e.Blocked,'focus quote'):r.focus_source(e,self.state,source,['an invented public sentence'])
        archive=self.state/'research/originals'/('source-'+source['sha256']+'.md');archive.write_text(TEXT+'changed')
        with self.assertRaisesRegex(e.Blocked,'verified original'):r.focus_source(e,self.state,source,['DeepSeek Harness is a developer preview.'])
    def test_focus_quote_schema_is_bounded_to_declared_sources(self):
        for value in ({'https://other.example/doc':['a public source quote']},{URL:['short']},{URL:'not a quote list'}):
            e.save(self.root/'editorial/topics.json',[TOPIC|{'source_quotes':value}])
            with self.assertRaises(e.Blocked):r.topics(e,self.root)
    def test_private_topic_is_blocked_before_research_or_model_input(self):
        e.save(self.root/'editorial/topics.json',[TOPIC|{'question':TOPIC['question']+' SYNTHETIC_PRIVATE_MARKER'}])
        with patch.object(r,'fetch_sources') as fetch:
            with self.assertRaisesRegex(e.Blocked,'private output marker'):r.prepare_guide(e,self.root,self.state,'2026-10-29',self.run)
        fetch.assert_not_called()
    def test_search_is_first_party_and_budget_is_balanced(self):
        groups=[[URL+'/'+str(i)+'-'+str(j) for j in range(5)] for i in range(3)]
        with patch.object(r,'tvly',side_effect=[{'results':[{'url':u} for u in g]} for g in groups]) as search,patch.object(r,'fetch_sources',return_value=[]) as fetch,patch.object(e,'model_json',return_value=({'items':[]},{})):
            with self.assertRaises(e.Skip):r.collect_daily(e,self.root,self.state,'2026-10-29',self.run)
        self.assertEqual(fetch.call_args.args[2],[groups[i][j] for j in range(2) for i in range(3)])
        for call in search.call_args_list:self.assertIn('--include-domains',call.args[1])
    def test_no_approved_candidates_is_not_a_transport_failure(self):
        with patch.object(r,'tvly',return_value={'results':[{'url':'https://unapproved.example/news'}]}):
            with self.assertRaises(e.Skip):r.collect_daily(e,self.root,self.state,'2026-10-29',self.run)
        self.assertEqual(e.load(self.run/'discovery.json')['selected_urls'],[])
    def fake_cli(self):
        path=self.root/'.local/bin/tvly-hikari';path.parent.mkdir(parents=True);path.touch()
    def test_real_child_process_finds_cli_without_login_shell_path(self):
        directory=self.root/'.local/bin';directory.mkdir(parents=True)
        wrapper=directory/'tvly-hikari';wrapper.write_text('#!/bin/sh\nexec tvly "$@"\n');wrapper.chmod(0o755)
        cli=directory/'tvly';cli.write_text("#!/bin/sh\nprintf '%s\\n' '{\"results\":[]}'\n");cli.chmod(0o755)
        with patch.object(e,'HOME',self.root),patch.dict(os.environ,{'PATH':'/usr/bin:/bin'}):
            result=r.tvly(e,['search','synthetic public query'],self.run,'cli-smoke')
        self.assertEqual(result,{'results':[]})
        self.assertEqual(e.load(self.run/'api-attempts.json')[0]['status'],'accepted')
    def test_api_success_has_a_separate_transport_record(self):
        self.fake_cli();result=SimpleNamespace(returncode=0,stdout='{"results":[]}',stderr='')
        with patch.object(e,'HOME',self.root),patch.object(r.subprocess,'run',return_value=result) as cli:
            r.tvly(e,['search','public question'],self.run,'search')
        self.assertEqual(e.load(self.run/'api-attempts.json')[0]['status'],'accepted')
        self.assertEqual(cli.call_args.kwargs['env']['HTTPS_PROXY'],'http://127.0.0.1:8016')
    def test_api_retry_preserves_failed_and_successful_attempts(self):
        self.fake_cli();bad=SimpleNamespace(returncode=4,stdout='{"error":"synthetic failure"}',stderr='');good=SimpleNamespace(returncode=0,stdout='{"results":[]}',stderr='')
        with patch.object(e,'HOME',self.root),patch.object(r.subprocess,'run',side_effect=[bad,good]),patch.object(r.time,'sleep'):
            r.tvly(e,['search','public question'],self.run,'search')
        self.assertEqual([x['status'] for x in e.load(self.run/'api-attempts.json')],['failed','accepted'])
    def test_invalid_api_envelope_does_not_become_network_success(self):
        self.fake_cli();result=SimpleNamespace(returncode=0,stdout='{"data":[]}',stderr='')
        with patch.object(e,'HOME',self.root),patch.object(r.subprocess,'run',return_value=result),patch.object(r.time,'sleep'):
            with self.assertRaises(e.Blocked):r.tvly(e,['search','public question'],self.run,'search')
        self.assertTrue(all(x['status']=='failed' for x in e.load(self.run/'api-attempts.json')))
    def test_real_registry_is_valid(self):
        self.assertGreaterEqual(len(r.topics(e,Path(__file__).resolve().parents[2])),2)

if __name__=='__main__':unittest.main()
