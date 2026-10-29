import copy
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import editorial_pipeline as e
import editorial_research as r
from test_editorial_pipeline import draft, packet
from test_editorial_research import TOPIC, URL, URL2, TEXT

ORIGINAL='---\ntitle: Original\ndescription: >\n  A multiline old description\n  that needs a revision.\npubDate: "2025-01-02"\ntags: [ai, guide]\nlang: en\n---\nOld article body.\n'

class RevisionTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name);self.state=self.root/'state';self.state.mkdir()
        self.run=self.state/'runs/test';self.run.mkdir(parents=True)
        e.save(self.state/'private-output-policy.json',{'version':1,'blocked_literals':['SYNTHETIC_PRIVATE_MARKER']})
        (self.state/'private-output-policy.json').chmod(0o600)
        self.topic=copy.deepcopy(TOPIC)|{'id':'existing-guide-review','target_slug':'existing-guide'}
        e.save(self.root/'editorial/topics.json',[self.topic])
        for lang in ('zh','en'):e.save(self.root/f'src/content/blog/{lang}/existing-guide.md',ORIGINAL)
        for url in (URL,URL2):r.store_source(e,self.state,url,TEXT,e.now().isoformat())
    def tearDown(self):self.tmp.cleanup()
    def prepare(self):return r.prepare_guide(e,self.root,self.state,'2026-10-29',self.run)
    def test_prepare_binds_original_pair_and_target(self):
        p=self.prepare();self.assertEqual(e.article_slug({},p),'existing-guide')
        self.assertEqual(set(p['original_articles']),{'en','zh'})
        self.assertEqual(set(p['previous_files'].values()),{e.digest(ORIGINAL)})
    def test_revision_removes_unreviewed_legacy_faq(self):
        p=self.prepare();p['original_articles']['en']=ORIGINAL.replace('lang: en','lang: en\nfaq:\n  - question: Old claim?\n    answer: Unsupported guarantee.')
        d=draft()|{'revision_summary_zh':'本次修订根据公开原文纠正过时说法与适用范围。','revision_summary_en':'This revision corrects outdated claims using current public documents.'}
        text=e.render(d,p,'en')
        self.assertIn('faq: []',text);self.assertNotIn('Unsupported guarantee',text)
        self.assertIn('pubDate: "2025-01-02"',text)
    def test_multiple_revisions_check_latest_files_not_old_hashes(self):
        p=self.prepare();pair=set(p['previous_files']);old={x:e.digest('first article') for x in pair}
        first={'version':2,'kind':'guide','date':'2026-10-28','topic_id':'prior-guide-review','slug':'existing-guide',
            'target_slug':'existing-guide','operation':'revise','pillar':'agents','previous_files':p['previous_files'],
            'created_at':'2026-10-28T09:00:00+08:00','draft_sha256':e.digest('first draft'),
            'review':{'verdict':'pass','checks':{k:True for k in e.CHECKS},'reasons':['documented correction']},
            'sources':[{'url':URL,'sha256':e.digest(TEXT)}],'files':old}
        body='second article '+URL;latest=first|{'date':'2026-10-29','topic_id':self.topic['id'],
            'created_at':'2026-10-29T09:00:00+08:00','previous_files':old,'files':{x:e.digest(body) for x in pair}}
        for receipt in (first,latest):e.save(self.root/e.receipt_path(receipt),receipt)
        for relative in pair:e.save(self.root/relative,body)
        self.assertEqual(e.validate_published(self.root)['receipts'],2)
        e.save(self.root/next(iter(pair)),body+'unreviewed')
        with self.assertRaisesRegex(e.Blocked,'differs'):e.validate_published(self.root)
    def test_missing_translation_blocks_revision(self):
        (self.root/'src/content/blog/en/existing-guide.md').unlink()
        with self.assertRaises(e.Blocked):self.prepare()
    def test_symlink_to_private_file_is_not_an_original(self):
        f=self.root/'src/content/blog/en/existing-guide.md';f.unlink();outside=self.root/'not-public';outside.write_text(ORIGINAL);f.symlink_to(outside)
        with self.assertRaises(e.Blocked):self.prepare()
    def test_unsafe_and_daily_targets_rejected(self):
        for value in ('../secret','/private','ai-daily-2026-10-29','openclaw-weekly-old',None):
            e.save(self.root/'editorial/topics.json',[self.topic|{'target_slug':value}])
            with self.subTest(target=value),self.assertRaises(e.Blocked):r.topics(e,self.root)
    def test_multiline_frontmatter_replacement_preserves_other_fields(self):
        front=e.revised_frontmatter(ORIGINAL,{'title':'A "quoted" title','description':'New description','updatedDate':'2026-10-29'},'2026-10-29')
        self.assertIn('pubDate: "2025-01-02"',front);self.assertIn('tags: [ai, guide]',front)
        self.assertNotIn('multiline old',front);self.assertIn('description: "New description"',front)
        self.assertEqual(front.count('description:'),1)
    def test_revisions_cannot_predate_original(self):
        with self.assertRaises(e.Blocked):e.revised_frontmatter(ORIGINAL,{},'2020-01-01')
    def test_duplicate_frontmatter_keys_rejected(self):
        with self.assertRaises(e.Blocked):e.frontmatter_parts(ORIGINAL.replace('lang: en','lang: en\ntitle: Duplicate'))
    def test_revision_requires_summary_in_both_languages(self):
        p=packet()|{'kind':'guide','target_slug':'existing-guide'}
        with self.assertRaisesRegex(e.Blocked,'summary'):e.validate_draft(draft(),p)
    def test_bad_revision_receipt_cannot_bypass_slug_binding(self):
        p=self.prepare();receipt={'version':2,'kind':'guide','date':'2026-10-29','topic_id':self.topic['id'],
            'slug':'existing-guide','target_slug':'existing-guide','operation':'revise','pillar':'agents',
            'review':{'verdict':'pass','checks':{k:True for k in e.CHECKS},'reasons':['documented correction']}}
        e.save(self.root/e.receipt_path(receipt),receipt)
        with self.assertRaisesRegex(e.Blocked,'original bilingual hashes'):e.validate_published(self.root)

class PrivatePolicyTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.state=Path(self.tmp.name);self.path=self.state/'private-output-policy.json'
        e.save(self.path,{'version':1,'blocked_literals':['SYNTHETIC_PRIVATE_MARKER']});self.path.chmod(0o600)
    def tearDown(self):self.tmp.cleanup()
    def test_safe_draft_and_local_marker(self):
        e.validate_private_output(draft(),self.state)
        with self.assertRaises(e.Blocked) as error:e.validate_private_output({'text':'synthetic_private_marker'},self.state)
        self.assertNotIn('SYNTHETIC_PRIVATE_MARKER',str(error.exception))
    def test_missing_policy_blocks_publication(self):
        self.path.unlink()
        with self.assertRaises(e.Blocked):e.validate_private_output('',self.state)
    def test_group_readable_policy_rejected(self):
        self.path.chmod(0o640)
        with self.assertRaises(e.Blocked):e.validate_private_output('',self.state)
    def test_symlink_policy_rejected(self):
        real=self.state/'actual';self.path.rename(real);self.path.symlink_to(real)
        with self.assertRaises(e.Blocked):e.validate_private_output('',self.state)
    def test_invalid_policy_rejected(self):
        for value in ({'version':1,'blocked_literals':[]},{'version':1,'blocked_literals':['short']},{'version':1,'blocked_literals':['abcdef'],'unknown':True}):
            e.save(self.path,value);self.path.chmod(0o600)
            with self.subTest(value=value),self.assertRaisesRegex(e.Blocked,'invalid private'):e.validate_private_output('',self.state)

if __name__=='__main__':unittest.main()
