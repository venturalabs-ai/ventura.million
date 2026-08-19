/**
 * Validação completa do projeto
 */
import { CONFIG } from './config.js';

const FORBIDDEN_PATTERNS = [
  /viralium/i,
  /BrandingViraliumGroup/i,
  /viralium-airdrop/i,
  /sk-[a-zA-Z0-9]{20,}/,
  /xai-[a-zA-Z0-9]{20,}/,
  /ghp_[a-zA-Z0-9]{20,}/,
  /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/i
];

export function validateAll(agents, skills, adapterNames) {
  const errors = [];
  const warnings = [];
  const agentIds = new Set();
  const skillIds = new Set();

  for (const a of agents || []) {
    if (agentIds.has(a.id)) errors.push(`Agente ID duplicado: ${a.id}`);
    agentIds.add(a.id);

    if (!a.instructions || a.instructions.length < 10) {
      warnings.push(`Agente ${a.id}: instruções curtas ou ausentes`);
    }
    if (!a.capabilities || (Array.isArray(a.capabilities) && a.capabilities.length === 0)) {
      errors.push(`Agente ${a.id}: capabilities vazias`);
    }

    const blob = `${a.name || ''} ${a.description || ''} ${a.instructions || ''}`;
    for (const p of FORBIDDEN_PATTERNS) {
      if (p.test(blob)) {
        errors.push(`Agente ${a.id}: referência proibida ou possível segredo detectado`);
      }
    }
  }

  for (const s of skills || []) {
    if (skillIds.has(s.id)) errors.push(`Skill ID duplicada: ${s.id}`);
    skillIds.add(s.id);

    if (!s.instructions || s.instructions.length < 10) {
      errors.push(`Skill ${s.id}: sem instruções suficientes`);
    }

    const blob = `${s.name || ''} ${s.description || ''} ${s.instructions || ''}`;
    for (const p of FORBIDDEN_PATTERNS) {
      if (p.test(blob)) {
        errors.push(`Skill ${s.id}: referência proibida ou possível segredo detectado`);
      }
    }
  }

  const expectedAdapters = [
    'claude', 'chatgpt', 'grok', 'copilot', 'gemini',
    'mistral', 'perplexity', 'deepseek', 'qwen', 'generic'
  ];
  const missingAdapters = expectedAdapters.filter((e) => !(adapterNames || []).includes(e));
  if (missingAdapters.length) {
    warnings.push(`Adaptadores ausentes: ${missingAdapters.join(', ')}`);
  }
  if ((adapterNames || []).length < 10) {
    warnings.push(`Esperados 10 adaptadores, encontrados ${(adapterNames || []).length}`);
  }

  return {
    errors,
    warnings,
    ok: errors.length === 0
  };
}
