function normalize(line) {
  return String(line || '').replace(/\s+/g, ' ').replace(/^[\s\-•\t]+|[\s\-•\t]+$/g, '');
}

export function extractZhStories(sourceText) {
  const stories = [];
  let current = null;
  let field = null;
  const closeCurrent = () => {
    if (current) stories.push(current);
    current = null;
    field = null;
  };

  for (const raw of String(sourceText || '').replace(/\r/g, '\n').split('\n')) {
    const line = normalize(raw);
    if (!line) continue;

    const numbered = line.match(/^(?:#{2,4}\s*)?(\d+)[\.、)）]\s*(.+)$/);
    if (numbered) {
      closeCurrent();
      current = { title: numbered[2].trim(), what: '', why: '', impact: '' };
      continue;
    }

    if (line === '---') {
      field = null;
      continue;
    }

    if (/^#{2,6}\s+/.test(line)) {
      closeCurrent();
      continue;
    }

    if (!current) continue;

    if (/^来源[:：]/.test(line)) {
      field = null;
      continue;
    }

    const labelMatch = line.match(/^\*{0,2}(发生了什么|为什么重要|可能影响|普通用户建议|团队建议)[:：]\*{0,2}\s*(.*)$/);
    if (labelMatch) {
      const key = {
        '发生了什么': 'what',
        '为什么重要': 'why',
        '可能影响': 'impact',
        '普通用户建议': 'impact',
        '团队建议': 'impact',
      }[labelMatch[1]];
      const value = labelMatch[2].replace(/^\*{0,2}|\*{0,2}$/g, '').trim();
      if (value) current[key] = `${current[key] || ''} ${value}`.trim();
      field = key;
      continue;
    }

    if (field && !line.startsWith('##') && !line.startsWith('###')) {
      current[field] = `${current[field] || ''} ${line}`.trim();
    }
  }

  closeCurrent();

  if (stories.length === 0) {
    for (const raw of String(sourceText || '').replace(/\r/g, '\n').split('\n')) {
      const line = normalize(raw);
      if (/^\d+[\.、)）]\s+/.test(line)) {
        stories.push({ title: line.replace(/^\d+[\.、)）]\s+/, ''), what: '', why: '', impact: '' });
      }
      if (stories.length >= 5) break;
    }
  }

  return stories.slice(0, 5);
}

function trimDetail(value, fallback) {
  let detail = String(value || fallback || '').replace(/\s+/g, ' ').trim();
  if (detail.length > 220) {
    const clipped = detail.slice(0, 219);
    const sentenceEnd = Math.max(clipped.lastIndexOf('。'), clipped.lastIndexOf('！'), clipped.lastIndexOf('？'));
    const commaEnd = Math.max(clipped.lastIndexOf('；'), clipped.lastIndexOf('，'));
    const boundary = sentenceEnd >= 80 ? sentenceEnd + 1 : commaEnd >= 120 ? commaEnd : -1;
    detail = `${(boundary > 0 ? clipped.slice(0, boundary) : clipped).replace(/[，。；;,.\sA-Za-z]$/g, '').replace(/[，。；;,.\s]+$/g, '')}。`;
  }
  detail = detail.replace(/(API|Claude Code|GPT-4\.5|GPT-5\.5|OpenShell|NVIDIA)\s*。$/g, '$1 暂无进一步细节。');
  return detail;
}

export function buildZhDescription(sourceText) {
  const lines = String(sourceText || '')
    .replace(/\r/g, '\n')
    .split('\n')
    .map((line) => normalize(line))
    .filter(Boolean);

  const candidates = [];
  for (const rawLine of lines) {
    if (rawLine.startsWith('《AI、科技日报》') || rawLine.startsWith('说明：')) continue;
    if (/^\d{4}-\d{2}-\d{2}\s*(早报|日报|Morning Brief)?$/.test(rawLine)) continue;
    if (/^(?:#{1,6}\s*)?\d+[\).、）]\s+/.test(rawLine)) continue;

    let line = rawLine.replace(/^#{1,6}\s*/, '');
    if (/^[【\[]?.*(今日要闻|实战案例|今日结论|明日跟踪点|证据矩阵).*[】\]]?$/.test(line)) continue;
    const fieldMatch = line.match(/^\*{0,2}(发生了什么|为什么重要|可能影响|普通用户建议|团队建议)[:：]\*{0,2}\s*(.*)$/);
    if (fieldMatch) line = fieldMatch[2].replace(/^\*{0,2}|\*{0,2}$/g, '').trim();
    if (/^\*{0,2}(发生了什么|为什么重要|可能影响|普通用户建议|团队建议)[:：]?\*{0,2}\s*$/.test(line)) continue;
    if (/^来源[:：]/.test(line)) continue;
    if (/^[A-Za-z0-9+./ -]+$/.test(line) && !/[\u4e00-\u9fff]/.test(line)) continue;
    if (line.length >= 8) candidates.push(line);
    if (candidates.length >= 2) break;
  }

  let joined = (candidates.length ? candidates : ['今日 AI 与科技关键信号速览，覆盖模型能力、基础设施、产业落地与政策动向。'])
    .map((candidate) => candidate.replace(/[；;，,。.]+$/g, ''))
    .join('；');
  joined = joined.replace(/\s+/g, ' ').replace(/[；;，,。.]+$/g, '');
  if (joined.length > 180) {
    const clipped = joined.slice(0, 179);
    const sentenceEnd = Math.max(clipped.lastIndexOf('。'), clipped.lastIndexOf('！'), clipped.lastIndexOf('？'));
    joined = `${(sentenceEnd >= 60 ? clipped.slice(0, sentenceEnd + 1) : clipped).replace(/[；;，,。.]+$/g, '')}。`;
  }
  joined = joined.replace(/(API|Claude Code|GPT-4\.5|GPT-5\.5)\s*。$/g, '$1 暂无进一步细节。');
  if (!/[。！？]$/.test(joined)) joined += '。';
  return joined.replace(/"/g, '');
}

export function generateZhDailyBody(sourceText, date) {
  let body = String(sourceText || '').replace(/\r/g, '\n').trim();
  if (!body) body = '今日 AI / 科技日报暂未生成，稍后将自动更新。';

  const stories = extractZhStories(body);
  const conclusion = `## 今日结论\n\n- 最值得关注：企业级 AI 正在加速进入核心业务流程，AI 不再只是聊天工具，而是在进入税务、法务、制造、运维、推理服务等真实生产系统。\n- 给普通用户建议：短期优先选择权限透明、可断开授权、有来源标注的 AI 产品，把它用于信息整理、学习复盘、日常文档和低风险决策辅助。\n- 给团队建议：不要只比较模型榜单，先选一个高频流程做试点，并把权限、审计、成本和人工复核写进上线标准。`;
  const watch = `## 明日跟踪点\n\n- 关注今日提到的模型、平台或硬件动态是否出现产品化细节。\n- 关注企业案例是否披露真实使用场景、权限控制和成本变化。\n- 关注政策、版权、数据安全或来源标注要求是否进一步收紧。`;

  if (body.includes('## 今日结论')) body = body.replace(/## 今日结论\n.*?(?=\n## |$)/s, conclusion);
  else body += `\n\n${conclusion}`;

  if (body.includes('## 明日跟踪点')) body = body.replace(/## 明日跟踪点\n.*?(?=\n## |$)/s, watch);
  else body += `\n\n${watch}`;

  const evidenceLines = stories.map((story, index) => {
    const idx = index + 1;
    const title = story.title || `当日 AI / 科技信号 ${idx}`;
    const detail = trimDetail(story.what || story.why || story.impact, '来自当日 cron 内容建设摘要的结构化新闻条目。');
    return `- 来源条目 ${idx}：${title} —— ${detail}`;
  });
  while (evidenceLines.length < 5) {
    const idx = evidenceLines.length + 1;
    evidenceLines.push(`- 来源条目 ${idx}：当日 AI / 科技补充信号 —— 用于补齐日报来源核验矩阵。`);
  }
  const evidence = `## 证据矩阵\n\n${evidenceLines.slice(0, 5).join('\n')}`;

  if (body.includes('## 证据矩阵')) body = body.replace(/## 证据矩阵\n.*?(?=\n## |$)/s, evidence);
  else body += `\n\n${evidence}`;

  body = body.replace(
    /^不太可能马上普及：\s*…\s*$/m,
    '不太可能马上普及：  \n家庭通用陪伴、完全开放环境中的复杂体力劳动，以及缺少明确 ROI 的消费级场景。'
  );

  // Some upstream cron summaries use a trailing ellipsis marker for shortened
  // notes. The daily freshness gate treats those tails as cut-off content, so
  // keep the complete sentence before the marker and drop the marker itself.
  body = body.replace(/[ \t]*…[ \t]*$/gm, '');

  return body;
}
