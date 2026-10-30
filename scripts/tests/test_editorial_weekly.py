import datetime as dt
import hashlib
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import editorial_weekly as w

class WeeklyEvidenceTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name)
        self.date=dt.date(2026,10,30)
    def tearDown(self):self.tmp.cleanup()
    def save(self,path,data):
        p=self.root/path;p.parent.mkdir(parents=True,exist_ok=True)
        p.write_text(json.dumps(data));return p
    def receipt(self,name='example-guide',**overrides):
        r={'slug':name,'created_at':'2026-10-29T10:00:00+08:00','date':'2026-02-11',
           'files':{f'src/content/blog/{l}/{name}.md':'0'*64 for l in ('en','zh')}}
        r.update(overrides);self.save(f'editorial/receipts/{name}.json',r);return r
    def metrics(self,**values):
        day=dt.date(2026,10,29);base='reports/seo/verified-daily/'
        row={'keys':[day.isoformat()],'clicks':0,'impressions':0,'ctr':0,'position':0}|values
        raw=self.save(base+'raw-2026-10-29.json',{'rows':[row]})
        meta={'site':'https://kuoo.uk/','window':{'start':str(day),'end':str(day)},
              'fetched_at':'2026-10-30T00:00:00+08:00','raw_file':base+raw.name,
              'sha256':hashlib.sha256(raw.read_bytes()).hexdigest()}
        p=self.save(base+str(day)+'.json',meta);return day,p,meta,raw
    def test_week_bounds(self):
        self.assertEqual(w.week(self.date),(dt.date(2026,10,26),dt.date(2026,11,1)))
        self.assertEqual(w.week(dt.date(2026,11,1)),w.week(self.date))
    def test_counts_receipt_creation_not_article_date(self):
        self.receipt(backfill=True)
        rows=w.receipt_rows(self.root,self.date)
        self.assertEqual(len(rows),1);self.assertTrue(rows[0]['backfill'])
    def test_future_receipts_not_counted(self):
        self.receipt(created_at='2026-10-31T00:00:00+08:00')
        self.assertEqual(w.receipt_rows(self.root,self.date),[])
    def test_timezone_is_normalized(self):
        self.receipt(created_at='2026-10-25T17:00:00+00:00')
        self.assertEqual(len(w.receipt_rows(self.root,self.date)),1)
    def test_receipt_requires_timezone(self):
        self.receipt(created_at='2026-10-29T12:00:00')
        with self.assertRaises(ValueError):w.receipt_rows(self.root,self.date)
    def test_receipt_requires_bilingual_pair(self):
        self.receipt(files={'src/content/blog/en/example-guide.md':'0'*64})
        with self.assertRaises(ValueError):w.receipt_rows(self.root,self.date)
    def test_untrusted_receipt_slug_rejected(self):
        self.receipt(slug='../private')
        with self.assertRaises(ValueError):w.receipt_rows(self.root,self.date)
    def test_revisions_are_not_new_articles(self):
        self.receipt(operation='revise')
        text=w.render(self.root,self.date,'2026-10-30 07:50','ok')
        self.assertIn('| Receipt-backed new bilingual editions | N/A | 0 |',text)
        self.assertIn('| Receipt-backed revised bilingual editions | N/A | 1 |',text)
    def test_unknown_metrics_are_not_zero(self):
        text=w.render(self.root,self.date,'2026-10-30 07:50','ok')
        self.assertIn('| Impressions | N/A | N/A | N/A |',text)
        self.assertIn('| Indexed Pages | N/A | N/A | N/A |',text)
        self.assertIn('| Missing Days (week) | 5/5 |',text)
        self.assertIn('| 2026-10-31 | ⚪ | future | N/A | not-observed |',text)
        self.assertIn('Search CTR is not bounce rate.',text)
    def test_missing_metric_file_is_unknown(self):
        self.assertIsNone(w.daily_metrics(self.root,self.date))
    def test_true_zero_is_preserved(self):
        day,_,_,_=self.metrics();values=w.daily_metrics(self.root,day)
        self.assertEqual(values['impressions'],0)
        self.assertEqual(w.display(w.aggregate([values]),'impressions'),'0')
        self.assertEqual(w.display(w.aggregate([values]),'ctr'),'N/A')
    def test_incomplete_window_is_unknown(self):
        self.assertIsNone(w.aggregate([None,{'clicks':1,'impressions':10,'ctr':0.1,'position':2}]))
    def test_weighted_aggregation_not_mean_of_ratios(self):
        result=w.aggregate([{'clicks':1,'impressions':10,'ctr':0.1,'position':2},
                            {'clicks':1,'impressions':90,'ctr':1/90,'position':10}])
        self.assertEqual(result['ctr'],0.02);self.assertEqual(result['position'],9.2)
    def test_rolling_window_rejected(self):
        day,p,m,_=self.metrics();m['window']['start']='2026-10-01';p.write_text(json.dumps(m))
        with self.assertRaises(ValueError):w.daily_metrics(self.root,day)
    def test_wrong_raw_hash_rejected(self):
        day,_,_,raw=self.metrics();raw.write_text('{}')
        with self.assertRaises(ValueError):w.daily_metrics(self.root,day)
    def test_missing_metric_value_rejected(self):
        day,_,_,_=self.metrics(clicks=None)
        with self.assertRaises(ValueError):w.daily_metrics(self.root,day)
    def test_inconsistent_ratio_rejected(self):
        day,_,_,_=self.metrics(clicks=1,impressions=100,ctr=0.5,position=2)
        with self.assertRaises(ValueError):w.daily_metrics(self.root,day)
    def test_wrong_date_dimension_rejected(self):
        day,_,_,_=self.metrics(keys=['2026-10-28'])
        with self.assertRaises(ValueError):w.daily_metrics(self.root,day)
    def test_early_fetch_rejected(self):
        day,p,m,_=self.metrics();m['fetched_at']='2026-10-29T07:00:00+08:00';p.write_text(json.dumps(m))
        with self.assertRaises(ValueError):w.daily_metrics(self.root,day)
    def test_symlink_and_escape_rejected(self):
        target=self.root/'outside';target.mkdir();(self.root/'link').symlink_to(target,target_is_directory=True)
        for path in ['../private','link/file.json']:
            with self.subTest(path=path),self.assertRaises(ValueError):w.public_file(self.root,path)
    def test_private_rolling_exports_are_not_read(self):
        self.save('data/gsc/gsc-2026-10-29.json',{'overall':{'impressions':987654321}})
        text=w.render(self.root,self.date,'2026-10-30 07:50','ok')
        self.assertNotIn('987654321',text)
    def test_snapshot_does_not_write_editorial_review(self):
        original=self.root/'WEEKLY_REVIEW.md';original.write_text('Reviewed conclusions, not a template')
        w.render(self.root,self.date,'2026-10-30 07:50','ok')
        self.assertEqual(original.read_text(),'Reviewed conclusions, not a template')

if __name__=='__main__':unittest.main()
