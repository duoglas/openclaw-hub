export const KEYWORD_MAP = [
  ['算力', 'compute infrastructure'], ['芯片', 'AI chip supply'], ['硬件', 'AI hardware'], ['服务器', 'AI server capacity'],
  ['机器人', 'robotics deployment'], ['具身', 'embodied AI'], ['Agent', 'agent platform'], ['智能体', 'agent platform'],
  ['开源', 'open-source model ecosystem'], ['模型', 'model capability update'], ['多模态', 'multimodal AI'],
  ['办公', 'workplace AI'], ['企业', 'enterprise AI rollout'], ['联盟', 'enterprise alliance'], ['合作', 'strategic partnership'],
  ['政策', 'AI policy signal'], ['监管', 'AI governance requirement'], ['版权', 'copyright and provenance risk'], ['安全', 'AI security control'],
  ['财务', 'personal finance AI'], ['播客', 'generative audio product'], ['电商', 'AI commerce workflow'], ['购物', 'AI commerce workflow'],
  ['版本', 'model release management'], ['退役', 'model retirement planning'], ['编码', 'coding agent workflow'], ['代码', 'coding agent workflow'],
  ['融资', 'AI capital expenditure'], ['估值', 'AI capital expenditure'], ['法院', 'AI legal precedent'], ['司法', 'AI legal precedent'], ['权属', 'data rights governance'],
  ['支付', 'agent payment workflow'], ['5G', 'compute infrastructure'], ['网络', 'compute infrastructure'], ['基站', 'compute infrastructure'],
  ['教育', 'AI education deployment'], ['医疗', 'healthcare AI deployment'], ['制造', 'industrial AI deployment'], ['终端', 'AI device adoption'], ['数据', 'data infrastructure'],
  ['计量', 'AI metrology and evaluation'], ['测试数据集', 'AI test dataset infrastructure'], ['标准', 'AI standards infrastructure'],
  ['可靠', 'reliable agent execution'], ['合规', 'compliance automation'], ['仿真', 'simulation training'], ['抓取', 'robot grasping'], ['装配', 'robot assembly'],
];

export const ZH_ENTITY_MAP = [
  ['腾讯', 'Tencent'], ['阿里', 'Alibaba'], ['百度', 'Baidu'], ['中国移动', 'China Mobile'], ['华为', 'Huawei'],
  ['最高法', 'China Supreme People’s Court'], ['人民法院', 'China courts'], ['司法部', 'China Ministry of Justice'],
  ['市场监管总局', 'SAMR'], ['国家发改委', 'NDRC'], ['科技日报', 'Science and Technology Daily'],
  ['支付宝', 'Alipay'], ['微信支付', 'WeChat Pay'], ['京东', 'JD.com'], ['银联', 'UnionPay'], ['新华社', 'Xinhua'], ['工信部', 'MIIT'],
  ['Marvis', 'Tencent'], ['百炼', 'Alibaba'], ['DuMate', 'Baidu'], ['MoMA', 'China Mobile'], ['韬', 'Huawei'],
  ['韩国', 'Korea'], ['法国', 'France'], ['中国', 'China'], ['美国', 'US'], ['欧洲', 'Europe'], ['芬兰', 'Europe'], ['阿尔托大学', 'Europe'],
];

export function dailySignalMapNames() {
  return ['KEYWORD_MAP', 'ZH_ENTITY_MAP'];
}
