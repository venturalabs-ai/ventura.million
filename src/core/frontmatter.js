/**
 * Parser leve de frontmatter — sem dependências externas
 * Formato esperado:
 * ---
 * chave: valor
 * ---
 * corpo
 */

const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

export function parseFrontMatter(content) {
  if (typeof content !== 'string') {
    return { metadata: {}, body: '', error: 'Conteúdo inválido' };
  }

  const match = content.match(FRONT_MATTER_PATTERN);
  if (!match) {
    return { metadata: {}, body: content.trim(), error: null };
  }

  const [, fmText, body] = match;
  const metadata = {};
  const errors = [];

  for (const line of fmText.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonPos = trimmed.indexOf(':');
    if (colonPos === -1) {
      errors.push(`Linha inválida no frontmatter: "${line}"`);
      continue;
    }

    const key = trimmed.slice(0, colonPos).trim();
    let value = trimmed.slice(colonPos + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else if (/^-?\d+$/.test(value)) {
      value = parseInt(value, 10);
    }

    metadata[key] = value;
  }

  return {
    metadata,
    body: body.trim(),
    error: errors.length ? errors.join('; ') : null
  };
}

export function validateRequired(metadata, requiredFields) {
  return requiredFields.filter((field) => {
    const val = metadata[field];
    if (val === undefined || val === null) return true;
    if (typeof val === 'string' && val.trim() === '') return true;
    if (Array.isArray(val) && val.length === 0) return true;
    return false;
  });
}
