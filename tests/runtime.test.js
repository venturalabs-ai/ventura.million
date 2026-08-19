import { describe, it } from 'node:test';
import assert from 'node:assert';
import { run } from '../src/core/runtime.js';

describe('Runtime', () => {
  const agents = [
    {
      id: 'teste',
      name: 'Teste',
      description: 'Agente de teste',
      capabilities: ['teste'],
      instructions: 'Instruções base do agente de teste.'
    }
  ];

  it('rejeita prompt vazio', async () => {
    await assert.rejects(() => run('', agents, []), /vazio/);
  });

  it('monta plano sem chamar modelo', async () => {
    const result = await run('Olá mundo', agents, []);
    assert.ok(result.plan);
    assert.ok(result.instructions);
    assert.strictEqual(result.providerResponse, null);
    assert.ok(result.instructions.includes('Olá mundo'));
    assert.strictEqual(result.plan.mode, 'local-simulated');
  });
});
