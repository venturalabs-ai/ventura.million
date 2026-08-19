import { describe, it } from 'node:test';
import assert from 'node:assert';
import { validateAll } from '../src/core/validator.js';

describe('Validador', () => {
  it('detecta ID duplicado', () => {
    const agents = [
      { id: 'x', name: 'A', description: 'D', capabilities: ['a'], instructions: 'texto longo o suficiente' },
      { id: 'x', name: 'B', description: 'D', capabilities: ['b'], instructions: 'texto longo o suficiente' }
    ];
    const { errors } = validateAll(agents, [], []);
    assert.ok(errors.some((e) => /duplicado/.test(e)));
  });

  it('detecta capabilities vazias', () => {
    const agents = [
      { id: 'y', name: 'A', description: 'D', capabilities: [], instructions: 'texto longo o suficiente' }
    ];
    const { errors } = validateAll(agents, [], []);
    assert.ok(errors.some((e) => /capabilities vazias/.test(e)));
  });

  it('aprova configuração válida', () => {
    const agents = [
      {
        id: 'ok',
        name: 'Ok',
        description: 'Desc',
        capabilities: ['cap'],
        instructions: 'Instruções longas o suficiente para passar'
      }
    ];
    const { ok, errors } = validateAll(agents, [], [
      'claude', 'chatgpt', 'grok', 'copilot', 'gemini',
      'mistral', 'perplexity', 'deepseek', 'qwen', 'generic'
    ]);
    assert.strictEqual(errors.length, 0);
    assert.strictEqual(ok, true);
  });
});
