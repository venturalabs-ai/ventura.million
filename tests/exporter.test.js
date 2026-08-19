import { describe, it } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs/promises';
import { exportPackage } from '../src/core/exporter.js';

describe('Exportador', () => {
  it('gera pacote JSON válido', async () => {
    const agents = [
      {
        id: 'a',
        name: 'A',
        description: 'D',
        capabilities: ['x'],
        version: '1.0',
        author: 'T',
        instructions: 'Instruções suficientes para o teste.'
      }
    ];
    const { path: p, package: pkg } = await exportPackage(agents, [], ['generic', 'claude']);
    assert.ok(pkg.format);
    assert.ok(pkg.agents);
    assert.ok(pkg.version);
    assert.strictEqual(pkg.name, 'ventura.million');
    assert.strictEqual(pkg.authentication, 'none-for-local-runtime');
    const json = JSON.parse(await fs.readFile(p, 'utf-8'));
    assert.strictEqual(json.name, 'ventura.million');
    assert.ok(!JSON.stringify(json).includes('/home/'));
  });
});
