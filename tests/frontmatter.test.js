import { describe, it } from 'node:test';
import assert from 'node:assert';
import { parseFrontMatter, validateRequired } from '../src/core/frontmatter.js';

describe('Frontmatter Parser', () => {
  it('parsa frontmatter válido', () => {
    const content = `---
id: teste
name: Teste
version: "1.0.0"
---

Corpo do conteúdo.`;
    const { metadata, body, error } = parseFrontMatter(content);
    assert.strictEqual(error, null);
    assert.strictEqual(metadata.id, 'teste');
    assert.strictEqual(metadata.name, 'Teste');
    assert.strictEqual(metadata.version, '1.0.0');
    assert.strictEqual(body, 'Corpo do conteúdo.');
  });

  it('aceita conteúdo sem frontmatter', () => {
    const content = 'Apenas texto.';
    const { metadata, body } = parseFrontMatter(content);
    assert.deepStrictEqual(metadata, {});
    assert.strictEqual(body, 'Apenas texto.');
  });

  it('detecta campos obrigatórios ausentes', () => {
    const missing = validateRequired({ id: 'x' }, ['id', 'name', 'description']);
    assert.ok(missing.includes('name'));
    assert.ok(missing.includes('description'));
  });
});
