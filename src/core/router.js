/**
 * Roteamento determinístico por pontuação — sem chamada a modelo externo
 */

function normalizeText(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreMatch(promptText, item) {
  const prompt = normalizeText(promptText);
  const name = normalizeText(item.name || '');
  const desc = normalizeText(item.description || '');
  const caps = Array.isArray(item.capabilities)
    ? item.capabilities.map((c) => normalizeText(c)).join(' ')
    : normalizeText(String(item.capabilities || ''));

  let score = 0;
  const promptWords = prompt.split(/\s+/).filter((w) => w.length > 2);

  const nameWords = name.split(/\s+/).filter((w) => w.length > 2);
  for (const nw of nameWords) {
    if (prompt.includes(nw)) score += 40;
    else if (promptWords.some((pw) => pw.includes(nw) || nw.includes(pw))) score += 20;
  }

  const descWords = desc.split(/\s+/).filter((w) => w.length > 3);
  const descMatches = promptWords.filter((w) => descWords.includes(w)).length;
  score += descMatches * 6;

  const capWords = caps.split(/\s+/).filter((w) => w.length > 2);
  const capMatches = promptWords.filter((w) => capWords.some((c) => c.includes(w) || w.includes(c))).length;
  score += capMatches * 12;

  if (prompt.includes('planej') && caps.includes('planej')) score += 25;
  if (prompt.includes('pesquis') && (caps.includes('pesquis') || caps.includes('research'))) score += 25;
  if (prompt.includes('revis') && (caps.includes('revis') || caps.includes('review'))) score += 25;
  if ((prompt.includes('ferrament') || prompt.includes('codigo') || prompt.includes('comando')) && caps.includes('ferrament')) score += 20;

  return score;
}

export function route(prompt, agents, skills = []) {
  if (!Array.isArray(agents) || agents.length === 0) {
    return {
      agent: null,
      skills: [],
      scores: [],
      reason: 'Nenhum agente registrado'
    };
  }

  const scored = agents
    .map((agent) => ({
      agent,
      score: scoreMatch(prompt, agent)
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.agent.id === 'orchestrator') return -1;
      if (b.agent.id === 'orchestrator') return 1;
      return String(a.agent.id).localeCompare(String(b.agent.id));
    });

  const best = scored[0];

  const selectedSkills = skills
    .map((skill) => ({ skill, score: scoreMatch(prompt, skill) }))
    .filter((s) => s.score >= 12)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.skill);

  return {
    agent: best.agent,
    skills: selectedSkills,
    scores: scored.map((s) => ({ id: s.agent.id, score: s.score })),
    reason:
      best.score > 0
        ? `Melhor correspondência com pontuação ${best.score}`
        : 'Nenhuma correspondência forte — usando agente padrão (maior prioridade disponível)'
  };
}
