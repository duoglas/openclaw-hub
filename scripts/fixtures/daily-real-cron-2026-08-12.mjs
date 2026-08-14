export const fixtureDate = '2026-08-12';

export const realCronFixture = `《AI、科技日报》  
2026-08-12 07:30｜截至发稿可核验信息

## 今日要闻（5条）

1. ChatGPT 广告正式扩张至英、墨、巴、日、韩

发生了什么：  
ChatGPT 在免费/Go 层级正式向英国、墨西哥、巴西、日本、韩国推出广告。这是自2月美国试点以来最大规模扩张。OpenAI 称广告不影响答案质量，用户对话隐私不会被共享给广告主。

为什么重要：  
这是 OpenAI 商业化的关键一步。如果广告模型在主要市场跑通，ChatGPT 将从纯订阅模式转向"免费+广告+订阅"混合模式，影响数亿用户的使用体验。

可能影响：  
中短期 Plus/Pro/Enterprise 用户不受影响；免费用户可以选择关闭广告但减少每日消息数。对中国市场暂无直接影响，但为国内 AI 产品的广告变现提供了参考模板。

来源：OpenAI 官方 / ChatGPT 广告扩展
https://openai.com/

---

2. OpenAI Daybreak 网络安全模型登陆 AWS Bedrock，顶级安全厂商加入生态

发生了什么：  
OpenAI 的 Daybreak 系列网络安全模型（包括 Daybreak Blue 通用防御模型和 Daybreak Red 专业渗透测试模型）正式通过 Amazon Bedrock 上线。同时启动 Daybreak 合作伙伴计划，Accenture、IBM、CrowdStrike、Palo Alto Networks、Cloudflare 等 15+ 家头部安全厂商加入。

为什么重要：  
网络安全正进入"AI vs AI"时代。攻击者用 AI 找漏洞的速度越来越快，防守方需要同等甚至更强的 AI 能力。Daybreak 进入 AWS 意味着企业可以在现有云环境中直接使用前沿安全 AI。

可能影响：  
网络安全行业的 AI 军备竞赛正式升级。对普通企业用户，未来安全服务的响应速度和检测能力会显著提升，但安全预算也可能随之增加。

来源：OpenAI Daybreak / AWS Bedrock / 合作伙伴计划
https://openai.com/

---

3. 国产大模型改写全球调用版图：OpenRouter 前五全是中国模型

发生了什么：  
OpenRouter 最新周度 Token 调用榜显示：DeepSeek V4 Flash 登顶第一，小米 MiMo V2.5、腾讯 Hy3、DeepSeek V4 Pro、智谱 GLM5.2 包揽前五。DeepSeek V4 Flash 正式版上线后单日使用量和新用户均增长约 30%。

为什么重要：  
这是中国大模型首次在海外主流聚合平台实现"霸榜"。核心驱动力是极致性价比（每百万 Token 输入仅 1 元人民币）+ MoE 架构带来的推理成本优势。

可能影响：  
中国 AI 企业的竞争从"追平能力"转向"成本碾压"。短期利好出海开发者和推理芯片产业链；中长期需要把价格优势转化为服务稳定性、合规能力和高价值应用，否则可能陷入"高调用低利润"困境。

来源：OpenRouter 周度排名 / 新华网
https://openrouter.ai/rankings

---

4. ChatGPT Business 推出 Premium 席位：$125/月，无使用限制

发生了什么：  
OpenAI 为 ChatGPT Business 推出 Premium 席位，每月 125 美元/用户（年付 100 美元），提供标准席位 5 倍的用量且无 5 小时使用上限。可与标准席位（25 美元/月）混合搭配。

为什么重要：  
这是 OpenAI 在企业市场进一步分层定价的信号。Premium 瞄准重度用户——用 AI 做深度分析、代码开发、营销策划的团队。

可能影响：  
企业 AI 支出会更加分化。重度用户愿意为"不中断"买单，轻度用户则继续用标准席位。国内企业级 AI 产品可能跟进类似分层策略。

来源：OpenAI 官方 / ChatGPT Business 更新
https://openai.com/business/

---

5. 中国自动驾驶出租车集体"出海"阿联酋

发生了什么：  
百度"萝卜快跑"在迪拜获得全无人驾驶测试许可并启动商业化运营（覆盖约 25 平方公里）；文远知行在中东部署超 200 辆 Robotaxi 且已实现无人化运营。

为什么重要：  
中国自动驾驶技术正从国内试点转向海外落地。阿联酋作为中东科技枢纽，监管友好、基础设施完善，成为出海第一站。这标志着中国自动驾驶开始进入全球化竞争阶段。

可能影响：  
更多中国自动驾驶公司可能跟进中东市场，带动高精地图、传感器、车路协同和海外合规服务需求。国内 Robotaxi 行业从"内卷"转向"出海"，可能缓解价格竞争压力。

来源：新华网 / 百度 Apollo / 文远知行
https://www.news.cn/auto/

## 实战案例

1. 企业 AI 订阅怎么配

适合场景：ChatGPT Business、内部开发团队、数据分析团队、运营策划团队、共享 AI 预算池。

建议打法：先按岗位分层：普通办公保留 Standard，高频写代码、分析数据、做运营方案的员工使用 Premium；每两周复盘用量、节省时间、业务产出和异常成本，避免按组织架构平均分配。

2. 开发者怎么估价国产大模型

适合场景：选择 API 供应商、评估推理成本、海外市场部署、多模型路由。

建议打法：不要在 OpenRouter 上只看价格和调用量；同时测试同模型在官方 API 和聚合平台的延迟、吞吐、错误率、合规交付和长期 SLA；把高价值推理留给自己能控制的部署方式。
`;

export const expectedSignals = [
  { title: 'ChatGPT 广告正式扩张至英、墨、巴、日、韩', sourceProjectionRuleMatches: ['openai-chatgpt-model-picker-2026'], enLabel: 'OpenAI / ChatGPT / ad expansion international rollout', zhEvidence: '来源条目 1：ChatGPT 广告正式扩张至英、墨、巴、日、韩', requiredTokens: ['ChatGPT 广告', '英国', '墨西哥', '巴西', '日本', '韩国', '免费用户', '关闭广告'] },
  { title: 'OpenAI Daybreak 网络安全模型登陆 AWS Bedrock，顶级安全厂商加入生态', sourceProjectionRuleMatches: ['openai-partner-network-enterprise-ecosystem-2026'], enLabel: 'OpenAI / Daybreak / Bedrock cyber partner ecosystem', zhEvidence: '来源条目 2：OpenAI Daybreak 网络安全模型登陆 AWS Bedrock，顶级安全厂商加入生态', requiredTokens: ['Daybreak', 'Bedrock', 'Accenture', 'CrowdStrike', 'Cloudflare', '15+'] },
  { title: '国产大模型改写全球调用版图：OpenRouter 前五全是中国模型', sourceProjectionRuleMatches: ['china-waic-token-cost-optimization-2026'], enLabel: 'Tencent / China / OpenRouter token ranking', zhEvidence: '来源条目 3：国产大模型改写全球调用版图：OpenRouter 前五全是中国模型', requiredTokens: ['OpenRouter', 'DeepSeek V4 Flash', 'MiMo V2.5', '腾讯 Hy3', 'GLM5.2', '前五'] },
  { title: 'ChatGPT Business 推出 Premium 席位：$125/月，无使用限制', sourceProjectionRuleMatches: ['openai-partner-network-enterprise-ecosystem-2026'], enLabel: 'OpenAI / ChatGPT Business / Premium seats', zhEvidence: '来源条目 4：ChatGPT Business 推出 Premium 席位：$125/月，无使用限制', requiredTokens: ['ChatGPT Business', 'Premium 席位', '125 美元', '5 倍的用量', '无使用限制'] },
  { title: '中国自动驾驶出租车集体"出海"阿联酋', sourceProjectionRuleMatches: ['nvidia-drive-hyperion-robotaxi-2026'], enLabel: 'China / Baidu Apollo / WeRide / UAE robotaxi deployment', zhEvidence: '来源条目 5：中国自动驾驶出租车集体"出海"阿联酋', requiredTokens: ['萝卜快跑', '文远知行', '迪拜', '阿联酋', 'Robotaxi', '自动驾驶出租车'] },
];

export const bannedFallbackPhrases = [
  'The source tracks model capability update',
  'The source tracks compute infrastructure',
  'giving the daily brief a named actor and deployment context',
  'buyers must check access control, infrastructure availability, operational risk',
  'today AI / technology daily not generated',
  '今日 AI / 科技日报暂未生成',
  '-…',
  '...',
];

export const requiredEnglishOutputs = [
  '### 1. OpenAI / ChatGPT / ad expansion international rollout',
  '### 2. OpenAI / Daybreak / Bedrock cyber partner ecosystem',
  '### 3. Tencent / China / OpenRouter token ranking',
  '### 4. OpenAI / ChatGPT Business / Premium seats',
  '### 5. China / Baidu Apollo / WeRide / UAE robotaxi deployment',
  'Evidence item 1: OpenAI / ChatGPT / ad expansion international rollout',
  'Evidence item 5: China / Baidu Apollo / WeRide / UAE robotaxi deployment',
  '## Case-Level FAQ',
  '## Today’s Bottom Line',
  '## What to Watch Tomorrow',
  '## Evidence Matrix',
];

export const requiredZhOutputs = [
  'ChatGPT 广告正式扩张至英、墨、巴、日、韩',
  'OpenAI Daybreak 网络安全模型登陆 AWS Bedrock',
  '国产大模型改写全球调用版图',
  'ChatGPT Business 推出 Premium 席位',
  '中国自动驾驶出租车集体"出海"阿联酋',
  '企业 AI 订阅怎么配',
  '开发者怎么估价国产大模型',
  '## 今日结论',
  '## 明日跟踪点',
  '## 证据矩阵',
  '来源条目 1：ChatGPT 广告正式扩张至英、墨、巴、日、韩',
  '来源条目 5：中国自动驾驶出租车集体"出海"阿联酋',
];

export const caseLevelFaqSignals = [
  {
    label: 'ChatGPT ad expansion monetization assessment',
    practicalCaseMatchTerms: ['企业 AI 订阅怎么配', '广告变现'],
    sourceStoryMatchTerms: ['ChatGPT 广告', '免费用户'],
    requiredTerms: ['free tier', 'ad model', 'subscription', 'monetization mix'],
    links: ['/en/blog/what-is-openclaw/', '/en/blog/openclaw-vps-cost-comparison-2026/'],
  },
  {
    label: 'Daybreak Bedrock enterprise security pilot',
    practicalCaseMatchTerms: ['Daybreak', '网络安全团队'],
    sourceStoryMatchTerms: ['Daybreak', 'Bedrock', 'CrowdStrike'],
    requiredTerms: ['identity check', 'scope limit', 'audit log', 'human approval', 'rollback path'],
    links: ['/en/blog/openclaw-security-hardening-2026/', '/en/blog/openclaw-model-fallback-strategy/'],
  },
  {
    label: 'OpenRouter ranking verification workflow',
    sourceStoryMatchTerms: ['OpenRouter', 'DeepSeek V4 Flash'],
    requiredTerms: ['primary ranking', 'price', 'throughput', 'latency', 'compliance delivery'],
    links: ['/en/blog/openclaw-model-fallback-strategy/'],
  },
];

export const parserGuardrails = {
  story1RequiredDetailTokens: ['ChatGPT 广告', '英国', '墨西哥', '巴西', '日本', '韩国', '免费用户', '关闭广告'],
  story1ForbiddenDetailTokens: ['Daybreak', 'Bedrock', 'OpenRouter', 'Premium 席位', '萝卜快跑', '阿联酋'],
  story2RequiredDetailTokens: ['Daybreak', 'Bedrock', 'Accenture', 'CrowdStrike', 'Cloudflare', '15+'],
  story2ForbiddenDetailTokens: ['ChatGPT 广告', 'OpenRouter', 'Premium 席位', '萝卜快跑', '阿联酋'],
  story3RequiredDetailTokens: ['OpenRouter', 'DeepSeek V4 Flash', 'MiMo V2.5', '腾讯 Hy3', 'GLM5.2', '前五'],
  story3ForbiddenDetailTokens: ['ChatGPT 广告', 'Daybreak', 'Bedrock', 'Premium 席位', '萝卜快跑', '阿联酋'],
  story4RequiredDetailTokens: ['ChatGPT Business', 'Premium 席位', '125 美元', '5 倍的用量', '无使用限制'],
  story4ForbiddenDetailTokens: ['ChatGPT 广告', 'Daybreak', 'Bedrock', 'OpenRouter', '萝卜快跑', '阿联酋'],
  story5RequiredDetailTokens: ['萝卜快跑', '文远知行', '迪拜', '阿联酋', 'Robotaxi', '自动驾驶出租车'],
  story5ForbiddenDetailTokens: ['ChatGPT 广告', 'Daybreak', 'Bedrock', 'OpenRouter', 'Premium 席位'],
};
