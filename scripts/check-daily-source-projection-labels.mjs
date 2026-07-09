import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractStories, labelFor } from './lib/daily-generator.mjs';
import { projectEnglishSourceLabel } from './lib/source-projection-rules.mjs';
import { realCronFixtures } from './fixtures/daily-real-cron-fixtures.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

function fail(message, details = []) {
  console.error(`daily source projection label check failed: ${message}`);
  for (const detail of details) console.error(`- ${detail}`);
  process.exit(1);
}

function storySource(story) {
  return [story?.title, story?.what, story?.why, story?.impact].filter(Boolean).join(' ');
}

function assertFixtureLabels({ fixtureName, fixture, expectedSignals }) {
  const stories = extractStories(fixture);
  const failures = [];
  expectedSignals.forEach((expected, index) => {
    const story = stories[index];
    const metadataLabel = projectEnglishSourceLabel(storySource(story));
    const generatedLabel = labelFor(story, index + 1);
    if (metadataLabel !== expected.enLabel) {
      failures.push(`${fixtureName} story ${index + 1}: source projection metadata label "${metadataLabel || '(empty)'}" !== expected "${expected.enLabel}"`);
    }
    if (generatedLabel !== expected.enLabel) {
      failures.push(`${fixtureName} story ${index + 1}: generator label "${generatedLabel || '(empty)'}" !== expected "${expected.enLabel}"`);
    }
  });
  if (failures.length) fail('fixture labels drifted from source projection metadata', failures);
}


function fixtureDateFor(fixtureModule) {
  return fixtureModule.fixtureDate || fixtureModule.realCronFixture?.match?.(/\n(\d{4}-\d{2}-\d{2})\s/)?.[1] || 'unknown-date';
}

function labelReadyFixtures() {
  return realCronFixtures
    .filter((fixtureModule) => Array.isArray(fixtureModule.expectedSignals) && fixtureDateFor(fixtureModule) >= '2026-06-05')
    .map((fixtureModule) => ({
      fixtureName: `daily-real-cron-${fixtureDateFor(fixtureModule)}`,
      fixture: fixtureModule.realCronFixture,
      expectedSignals: fixtureModule.expectedSignals,
    }));
}

function assertRegistryDrivenFixtureCoverage(fixtures) {
  const fixtureDates = fixtures.map(({ fixtureName }) => fixtureName.replace('daily-real-cron-', ''));
  const missingRecentFixtures = ['2026-07-07', '2026-07-08', '2026-07-09'].filter((date) => !fixtureDates.includes(date));
  if (missingRecentFixtures.length) {
    fail('daily source projection label check is not driven by all recent registry fixtures', missingRecentFixtures);
  }
  if (fixtures.length < 17) {
    fail('daily source projection label check covers too few label-ready fixtures', [`actual=${fixtures.length}`, 'expected>=17']);
  }
}

function assertNoGeneratorHardcodedOverrides() {
  const generatorPath = path.join(repoRoot, 'scripts/lib/daily-generator.mjs');
  const generator = fs.readFileSync(generatorPath, 'utf8');
  const forbiddenSnippets = [
    'Record & Replay\') && text.includes(\'Scheduled tasks',
    'Alexa+\') && (text.includes(\'Brazil',
    'HPE AI Factory with NVIDIA\') && text.includes(\'NVIDIA Agent Toolkit',
    '世界人工智能合作组织\') && text.includes(\'上海世界人工智能大会',
  ];
  const found = forbiddenSnippets.filter((snippet) => generator.includes(snippet));
  if (found.length) {
    fail('daily-generator still contains token-level topic label overrides instead of source projection metadata', found);
  }
}

function assertSyntheticConditionalLabel() {
  const hpeSource = 'HPE AI Factory with NVIDIA adds Vera CPU and NVIDIA Agent Toolkit for private cloud AI.';
  const broadCloudSource = 'NVIDIA said partners are expanding AI Cloud capacity across six continents for training and inference.';
  const oldHumanoidSource = '据新华社报道，工信部、国务院国资委联合启动 2026 年度人形机器人与具身智能实景实训专项行动，在真实生产生活环境中常态化部署。';
  const newerHumanoidSource = '工信部办公厅、国务院国资委办公厅发布通知，推动人形机器人真实场景训练和万台级规模落地能力。';
  const nvidiaKoreaSource = 'NVIDIA CEO 黄仁勋到访首尔，称 Grace Blackwell 表现良好，Vera Rubin 已进入 full production；下半年 AI 基础设施建设会很忙，并点名韩国在机器人、物理 AI、存储制造等方向的机会。';
  const nvidiaDoosanSource = 'NVIDIA said it is expanding cooperation with South Korea’s Doosan Group across robotics, industrial automation, AI factory infrastructure, power systems, and data-center materials.';
  const nvidiaCosmosSource = 'NVIDIA 在 GTC Taipei 发布 Cosmos 3，称其为开放的物理 AI 世界基础模型，用于机器人、自动驾驶、视觉 AI 的合成数据和策略模型开发。';
  const nvidiaCvprSource = 'NVIDIA Research highlighted GraspGen-X, LCDrive, NitroGen and other CVPR 论文 for robotics and autonomous-driving pipelines.';
  const hpeLabel = projectEnglishSourceLabel(hpeSource);
  const broadLabel = projectEnglishSourceLabel(broadCloudSource);
  const oldHumanoidLabel = projectEnglishSourceLabel(oldHumanoidSource);
  const newerHumanoidLabel = projectEnglishSourceLabel(newerHumanoidSource);
  const nvidiaKoreaLabel = projectEnglishSourceLabel(nvidiaKoreaSource);
  const nvidiaDoosanLabel = projectEnglishSourceLabel(nvidiaDoosanSource);
  const nvidiaCosmosLabel = projectEnglishSourceLabel(nvidiaCosmosSource);
  const nvidiaCvprLabel = projectEnglishSourceLabel(nvidiaCvprSource);
  if (hpeLabel !== 'NVIDIA / HPE / AI infrastructure capacity') {
    fail('conditional HPE display label did not resolve from source projection rule metadata', [`actual=${hpeLabel || '(empty)'}`]);
  }
  if (broadLabel) {
    fail('broad NVIDIA AI Cloud source received an HPE-specific label', [`actual=${broadLabel}`]);
  }
  if (oldHumanoidLabel !== 'Xinhua / MIIT / China / robotics deployment') {
    fail('2026-06-11 humanoid robotics display label did not resolve from source projection metadata', [`actual=${oldHumanoidLabel || '(empty)'}`]);
  }
  if (newerHumanoidLabel !== 'MIIT / SASAC / China humanoid robotics training') {
    fail('2026-06-11 humanoid robotics display label polluted newer MIIT/SASAC source text', [`actual=${newerHumanoidLabel || '(empty)'}`]);
  }
  if (nvidiaKoreaLabel !== 'Korea / NVIDIA / CEO / compute infrastructure') {
    fail('2026-06-06 NVIDIA Korea display label did not resolve from source projection metadata', [`actual=${nvidiaKoreaLabel || '(empty)'}`]);
  }
  if (nvidiaDoosanLabel !== 'Korea / NVIDIA / GPU / compute infrastructure') {
    fail('2026-06-06 NVIDIA Korea display label polluted 2026-06-08 Doosan source text', [`actual=${nvidiaDoosanLabel || '(empty)'}`]);
  }
  if (nvidiaCosmosLabel !== 'NVIDIA / Cosmos / GTC / compute infrastructure') {
    fail('2026-06-05 NVIDIA Cosmos display label did not resolve from source projection metadata', [`actual=${nvidiaCosmosLabel || '(empty)'}`]);
  }
  if (nvidiaCvprLabel !== 'NVIDIA / CVPR / Research / robotics deployment') {
    fail('2026-06-05 NVIDIA Cosmos display label polluted 2026-06-06 CVPR source text', [`actual=${nvidiaCvprLabel || '(empty)'}`]);
  }
}

assertNoGeneratorHardcodedOverrides();
const fixtures = labelReadyFixtures();
assertRegistryDrivenFixtureCoverage(fixtures);
for (const fixture of fixtures) assertFixtureLabels(fixture);
assertSyntheticConditionalLabel();
console.log(`daily source projection label check passed: fixtures=${fixtures.length}, expectedSignals=${fixtures.reduce((sum, fixture) => sum + fixture.expectedSignals.length, 0)}`);
