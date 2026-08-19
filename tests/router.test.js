import { describe, it } from 'node:test';
import assert from 'node:assert';
import { route } from '../src/core/router.js';

describe('Roteamento', () => {
  const agents = [
    {
      id: 'planejador',
      name: 'Planejador',
      description: 'Ajuda a planejar tarefas e projetos',
      capabilities: ['planejamento', 'organização']
    },
    {
      id: 'pesquisador',
      name: 'Pesquisador',
      description: 'Levanta informações e referências',
      capabilities: ['pesquisa', 'referências']
    }
  ];

  it('seleciona agente por correspondência de nome', () => {
    const result = route('planeje uma tarefa', agents);
    assert.strictEqual(result.agent.id, 'planejador');
    assert.ok(result.scores[0].score > 0);
  });

  it('retorna agente com maior pontuação', () => {
    const result = route('pesquise fontes confiáveis', agents);
    assert.strictEqual(result.agent.id, 'pesquisador');
  });

  it('retorna fallback quando não há agentes', () => {
    const result = route('qualquer coisa', []);
    assert.strictEqual(result.agent, null);
    assert.ok(result.reason.includes('Nenhum'));
  });
});
