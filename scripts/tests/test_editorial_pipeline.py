import copy
import datetime as dt
import importlib.util
import json
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location('editorial', Path(__file__).resolve().parents[1] / 'editorial_pipeline.py')
e = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(e)


def packet():
    return {'version':2,'date':'2026-10-26','kind':'daily','items':[{'event_key':'sample-event','source_ids':['S01']}],
            'sources':[{'id':'S01','url':'https://example.com/release','sha256':'a'*64,
                        'read_at':'2026-10-26T07:00:00+08:00','source_date':'2026-10-25','quotes':['stable API'],'excerpt':'stable API'}]}


def draft():
    return {'decision':'publish','reason':'Documented release with a concrete adoption limit.',
            'slug_hint':'stable-api-and-runtime','event_keys':['sample-event'],
            'title_zh':'接口稳定性与运行时升级的适用条件','title_en':'Stable APIs and the limits of a runtime upgrade',
            'description_zh':'这次版本发布明确了稳定接口与实验功能的区别。本文依据官方说明，整理升级范围、已有系统需要核对的条件，以及尚未测试的运行时限制，帮助开发者判断是否应该采用。',
            'description_en':'A source-based guide to the stable API boundary, coordinated upgrades and experimental runtime limits, with concrete checks before adoption.',
            'sections':[{'heading_zh':'先核对升级范围','heading_en':'Check the upgrade boundary',
                         'zh':'官方将接口列为稳定，但运行时仍属实验。部署前应在自己的工作负载下验证恢复行为。',
                         'en':'The API is documented as stable, while the runtime remains experimental. Validate recovery with your own workload before adoption.',
                         'source_ids':['S01']}],
            'limitations_zh':'本文依据文档分析，没有进行独立性能或长期稳定性测试。',
            'limitations_en':'This is document-based analysis; no independent performance or long-running reliability test was performed.'}


def review():
    return {'verdict':'pass','checks':{k:True for k in e.CHECKS},'reasons':['The claims are bounded by the cited source and both languages agree.']}


class EvidenceTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.edition = self.root / '2026-10-26'
        self.edition.mkdir()
        self.text = 'The API is stable. The harness is experimental.'
        (self.edition/'original-release.md').write_text(self.text)
        self.report = {'date':'2026-10-26','items':[{'event_key':'release','title':'SDK release','facts':self.text,
                       'event_date':'2026-10-25','sources':[{'url':'https://example.com/release','original_file':'original-release.md',
                       'sha256':e.digest(self.text),'read_at':'2026-10-26T07:00:00+08:00','source_date':'2026-10-25'}],
                       'evidence_quotes':[{'source':'release','quote':'The API is stable.'}]}]}
        self.save()

    def tearDown(self):
        self.tmp.cleanup()

    def save(self):
        e.save(self.edition/'report.json',self.report)

    def items(self):
        return e.verified_items(self.edition,dt.date(2026,10,26),3)

    def test_valid_original_and_quote(self):
        self.assertEqual(len(self.items()),1)

    def test_hash_tampering_excludes_item(self):
        (self.edition/'original-release.md').write_text('Different content')
        self.assertEqual(self.items(),[])

    def test_fabricated_quote_excludes_item(self):
        self.report['items'][0]['evidence_quotes'][0]['quote']='It is production proven.'
        self.save()
        self.assertEqual(self.items(),[])

    def test_source_path_escape(self):
        self.report['items'][0]['sources'][0]['original_file']='../secrets'
        self.save()
        self.assertEqual(self.items(),[])

    def test_symlink_escape(self):
        original=self.edition/'original-release.md'
        original.unlink()
        outside=self.root/'outside.md';outside.write_text(self.text)
        original.symlink_to(outside)
        self.assertEqual(self.items(),[])

    def test_failed_report_is_not_a_successful_edition(self):
        self.report['status']='collection_failed';self.save()
        with self.assertRaises(e.Blocked): self.items()

    def test_date_mismatch(self):
        self.report['date']='2026-10-27';self.save()
        with self.assertRaises(e.Blocked): self.items()

    def test_future_event_is_excluded(self):
        self.report['items'][0]['event_date']='2026-10-27';self.save()
        self.assertEqual(self.items(),[])

    def test_old_event_is_excluded(self):
        self.report['items'][0]['event_date']='2026-10-20';self.save()
        self.assertEqual(self.items(),[])

    def test_source_url_secrets_and_local_hosts(self):
        for url in ['http://example.com/','https://127.0.0.1/','https://user:pass@example.com/',
                    'https://example.com/?token=secret','https://localhost/',
                    'https://example.com/)\n<script>alert(1)</script>']:
            with self.subTest(url=url), self.assertRaises(e.Blocked): e.safe_url(url)

    def test_historical_file_alias_and_url_quote(self):
        source=self.report['items'][0]['sources'][0]
        source['file']=source.pop('original_file')
        quote=self.report['items'][0]['evidence_quotes'][0]
        quote['url']=source['url'];quote.pop('source')
        self.save();self.assertEqual(len(self.items()),1)

    def test_extraction_container_hashes_text_not_json(self):
        source=self.report['items'][0]['sources'][0]
        source.pop('original_file');source['extraction_file']='extract.json'
        e.save(self.edition/'extract.json',{'results':[{'url':source['url'],'raw_content':self.text}]})
        quote=self.report['items'][0]['evidence_quotes'][0]
        quote['url']=source['url'];quote.pop('source')
        self.save();self.assertEqual(len(self.items()),1)

    def test_wrong_extraction_url_is_not_reused(self):
        source=self.report['items'][0]['sources'][0]
        source.pop('original_file');source['extraction_file']='extract.json'
        e.save(self.edition/'extract.json',{'results':[{'url':'https://example.com/other','raw_content':self.text}]})
        self.save();self.assertEqual(self.items(),[])

    def test_only_declared_unicode_format_normalization(self):
        text='The API is sta\u200bble.'
        (self.edition/'original-release.md').write_text(text)
        self.report['items'][0]['sources'][0]['sha256']=e.digest(text)
        self.save();self.assertEqual(self.items(),[])
        self.report['items'][0]['evidence_quotes'][0]['normalization']='Unicode invisible formatting characters removed for comparison; archived original unchanged'
        self.save();self.assertEqual(len(self.items()),1)

    def test_inline_svg_does_not_displace_article_evidence(self):
        text = 'Stable API.\n![logo](data:image/svg+xml,' + ('%20svg' * 9000) + ')\nExperimental runtime.'
        excerpt = e.excerpt(text, ['Stable API.'])
        self.assertIn('Experimental runtime.', excerpt)
        self.assertNotIn('%20svg', excerpt)
        self.assertLess(len(excerpt),200)

    def test_same_day_report_required(self):
        with self.assertRaises(e.Blocked):
            e.prepare('daily','2026-10-27',self.root,self.root)

    def test_refresh_does_not_only_bump_date(self):
        with self.assertRaises(e.Skip):
            e.prepare('refresh','2026-10-26',self.root,self.root)


class EditorialTests(unittest.TestCase):
    def test_valid_single_event_does_not_require_padding(self):
        e.validate_draft(draft(),packet())

    def test_unknown_citation(self):
        d=draft();d['sections'][0]['source_ids']=['S99']
        with self.assertRaises(e.Blocked): e.validate_draft(d,packet())

    def test_unknown_event(self):
        d=draft();d['event_keys']=['invented-event']
        with self.assertRaises(e.Blocked): e.validate_draft(d,packet())

    def test_html_and_private_data_blocked(self):
        for text in ['<script>alert(1)</script>','<svg onload="alert(1)">','[secret](file:///etc/passwd)',
                     'https://made-up.example/','/home/duoglas/.openclaw/.env']:
            d=draft();d['sections'][0]['en']=text
            with self.subTest(text=text),self.assertRaises(e.Blocked):e.validate_draft(d,packet())

    def test_untranslated_english(self):
        d=draft();d['sections'][0]['en']='这里是没有翻译的中文，不能当成英文文章。'
        with self.assertRaises(e.Blocked):e.validate_draft(d,packet())

    def test_review_all_checks_required(self):
        for key in e.CHECKS:
            r=review();r['checks'][key]=False
            with self.subTest(check=key),self.assertRaises(e.Blocked):e.validate_review(r)

    def test_review_string_true_is_not_boolean(self):
        r=review();r['checks']['safety']='true'
        with self.assertRaises(e.Blocked):e.validate_review(r)

    def test_review_reason_required(self):
        r=review();r['reasons']=[]
        with self.assertRaises(e.Blocked):e.validate_review(r)

    def test_no_article_for_editor_skip(self):
        d=draft();d['decision']='skip'
        with self.assertRaises(e.Skip):e.validate_draft(d,packet())

    def test_slug_path_escape(self):
        d=draft();d['slug_hint']='../outside';p=packet();p['kind']='analysis'
        with self.assertRaises(e.Blocked):e.article_slug(d,p)

    def test_backfill_disclosed_in_both_languages(self):
        self.assertIn('历史补录',e.render(draft(),packet(),'zh',True))
        self.assertIn('not today',e.render(draft(),packet(),'en',True))

    def test_cjk_bold_labels_without_rewriting_code(self):
        text='**事实：**内容\n- **边界：**条件\n```markdown\n**字面：**保留\n```\n`**字面：**保留`\n'
        fixed=e.readable_markdown(text)
        self.assertIn('**事实：** 内容',fixed)
        self.assertIn('- **边界：** 条件',fixed)
        self.assertIn('```markdown\n**字面：**保留\n```',fixed)
        self.assertIn('`**字面：**保留`',fixed)

    def test_freshness_status_is_not_cron_success(self):
        with tempfile.TemporaryDirectory() as tmp:
            result=e.status(Path(tmp),Path(tmp))
            self.assertTrue(result['stale'])
            self.assertIsNone(result['last_daily'])

    def test_unreceipted_new_article_fails(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);e.save(root/'src/content/blog/en/ai-daily-2026-10-26.md','unreviewed')
            with self.assertRaises(e.Blocked):e.validate_published(root)


class GitPublishTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.base=Path(self.tmp.name)
        self.root=self.base/'site'
        self.remote=self.base/'remote.git'
        self.state=self.base/'state'
        self.run=self.state/'runs'/'test-run';self.run.mkdir(parents=True)
        subprocess.run(['git','init','--bare',str(self.remote)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        subprocess.run(['git','clone',str(self.remote),str(self.root)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        self.git('config','user.email','tests@example.invalid')
        self.git('config','user.name','Editorial Tests')
        self.git('config','commit.gpgsign','false')
        self.git('checkout','-b','main')
        (self.root/'.gitignore').write_text('node_modules\ndist/\n')
        (self.root/'node_modules').mkdir()
        self.git('add','.gitignore');self.git('commit','-m','initial');self.git('push','-u','origin','main')
        self.real=e.command

    def tearDown(self):self.tmp.cleanup()

    def git(self,*args):
        return subprocess.check_output(['git',*args],cwd=self.root,text=True,stderr=subprocess.DEVNULL).strip()

    def no_build(self,args,*a,**kw):
        if args[0]=='pnpm':return 'fixture build/check passed'
        return self.real(args,*a,**kw)

    def publish(self):
        return e.publish(self.root,self.run,packet(),draft(),review(),{'requested_model':'writer'},
                         {'requested_model':'reviewer','input_sha256':e.digest({'packet':packet(),'draft':draft()})},True)

    def test_real_git_publish_isolated_and_idempotent(self):
        with patch.object(e,'command',self.no_build):
            result=self.publish()
            self.assertEqual(result['status'],'pushed')
            self.assertEqual(self.git('status','--porcelain'),'')
            self.assertEqual(self.git('rev-parse','HEAD'),self.git('rev-parse','origin/main'))
            self.assertEqual(e.validate_published(self.root)['articles'],2)
            with self.assertRaises(e.Skip):self.publish()

    def test_review_of_a_different_draft_cannot_authorize_publish(self):
        changed=draft();changed['sections'][0]['en']+=' An added claim after review.'
        with self.assertRaises(e.Blocked):
            e.publish(self.root,self.run,packet(),changed,review(),{},
                      {'input_sha256':e.digest({'packet':packet(),'draft':draft()})},True)
        self.assertEqual(self.git('log','--oneline').count('\n'),0)

    def test_dirty_root_is_never_committed(self):
        (self.root/'someone-elses-draft.md').write_text('not owned')
        with patch.object(e,'command',self.no_build),self.assertRaises(e.Blocked):self.publish()
        self.assertEqual(self.git('log','--oneline').count('\n'),0)

    def test_failed_build_does_not_touch_main_or_push(self):
        before=self.git('rev-parse','HEAD')
        def fail_build(args,*a,**kw):
            if args[0]=='pnpm':raise e.Blocked('synthetic build failure')
            return self.real(args,*a,**kw)
        with patch.object(e,'command',fail_build),self.assertRaises(e.Blocked):self.publish()
        self.assertEqual(self.git('rev-parse','HEAD'),before)
        self.assertEqual(self.git('rev-parse','origin/main'),before)
        self.assertEqual(self.git('status','--porcelain'),'')

    def test_push_retry_uses_exact_reviewed_commit(self):
        def fail_push(args,*a,**kw):
            if args[:2]==['git','push']:raise e.Blocked('synthetic push failure')
            return self.no_build(args,*a,**kw)
        with patch.object(e,'command',fail_push),self.assertRaises(e.Blocked):self.publish()
        pending=e.load(self.run/'pending-push.json')
        result=e.recover_pending(self.root,self.state,self.run/'retry.log')
        self.assertEqual(result[0]['commit'],pending['commit'])
        self.assertEqual(self.git('rev-parse','HEAD'),pending['commit'])
        self.assertEqual(e.validate_published(self.root)['articles'],2)

    def test_approved_article_tamper_is_rejected(self):
        with patch.object(e,'command',self.no_build):self.publish()
        path=self.root/'src/content/blog/en/ai-daily-2026-10-26.md'
        path.write_text(path.read_text()+'\nAn unsupported claim.\n')
        with self.assertRaises(e.Blocked):e.validate_published(self.root)


if __name__=='__main__':unittest.main()
