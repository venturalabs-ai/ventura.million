/**
 * Runtime local — monta plano sem chamar modelo externo
 * Diferencia claramente plan / instructions / adapter / providerResponse
 */
import { route } from './router.js';
import { CONFIG } from './config.js';

export async function run(prompt, agents, skills) {
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    throw new Error('Prompt vazio. Forneça uma solicitação com --prompt "texto".');
  }
  if (prompt.length > CONFIG.maxPromptSize) {
    throw new Error(`Prompt excedeu o limite de ${CONFIG.maxPromptSize} caracteres`);
  }

  const routing = route(prompt, agents, skills);

  const assembledInstructions = assembleInstructions(routing.agent, routing.skills, prompt);

  const plan = {
    prompt: prompt.trim(),
    selectedAgent: routing.agent
      ? {
          id: routing.agent.id,
          name: routing.agent.name,
          version: routing.agent.version
        }
      : null,
    selectedSkills: routing.skills.map((s) => ({
      id: s.id,
      name: s.name
    })),
    routingScores: routing.scores,
    routingReason: routing.reason,
    assembledAt: new Date().toISOString(),
    mode: 'local-simulated'
  };

  return {
    plan,
    instructions: assembledInstructions,
    adapter: routing.agent?.id || 'none',
    providerResponse: null
  };
}

function assembleInstructions(agent, skills, prompt) {
  const parts = [];

  if (agent?.instructions) {
    parts.push(`# Agente: ${agent.name}\n\n${agent.instructions}`);
  }

  for (const skill of skills) {
    if (skill.instructions) {
      parts.push(`---\n# Skill: ${skill.name}\n\n${skill.instructions}`);
    }
  }

  parts.push(`---\n# Solicitação do usuário\n\n${prompt}`);

  return parts.join('\n\n');
}
