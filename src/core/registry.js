/**
 * Registro automático de agentes e skills a partir de arquivos .md
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontMatter, validateRequired } from './frontmatter.js';
import { CONFIG } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

export async function discover(type) {
  const dirName = type === 'agents' ? CONFIG.agentsDir : CONFIG.skillsDir;
  const baseDir = path.resolve(PROJECT_ROOT, dirName);
  const requiredFields = type === 'agents' ? CONFIG.requiredAgentFields : CONFIG.requiredSkillFields;

  const entries = [];
  const errors = [];

  let files;
  try {
    files = await fs.readdir(baseDir);
  } catch {
    return { items: [], errors: [`Diretório não encontrado: ${dirName}`] };
  }

  const mdFiles = files.filter((f) => f.endsWith('.md') && !f.startsWith('.'));

  for (const file of mdFiles) {
    const filePath = path.join(baseDir, file);
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const { metadata, body, error } = parseFrontMatter(content);

      if (error) {
        errors.push(`${file}: ${error}`);
        continue;
      }

      if (typeof metadata.capabilities === 'string') {
        metadata.capabilities = metadata.capabilities
          .split(/[,;|]/)
          .map((c) => c.trim())
          .filter(Boolean);
      }

      const missing = validateRequired(metadata, requiredFields);
      if (missing.length > 0) {
        errors.push(`${file}: Campos obrigatórios ausentes: ${missing.join(', ')}`);
        continue;
      }

      if (type === 'skills' && (!body || body.length < 10)) {
        errors.push(`${file}: Skill sem instruções suficientes no corpo`);
        continue;
      }

      entries.push({
        ...metadata,
        instructions: body,
        sourceFile: file
      });
    } catch (err) {
      errors.push(`${file}: ${err.message}`);
    }
  }

  return { items: entries, errors };
}

export async function listAdapters() {
  const adaptersDir = path.resolve(PROJECT_ROOT, CONFIG.adaptersDir);
  try {
    const files = await fs.readdir(adaptersDir);
    return files
      .filter((f) => f.endsWith('.js') && !f.startsWith('.'))
      .map((f) => f.slice(0, -3))
      .sort();
  } catch {
    return [];
  }
}
