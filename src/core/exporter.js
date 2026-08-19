/**
 * Exporta pacote portátil de agentes e skills
 * Formato versionado, sem caminhos absolutos, sem segredos
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONFIG } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

export async function exportPackage(agents, skills, adaptersList, format = 'json') {
  const pkg = {
    format: CONFIG.formatVersion,
    name: 'ventura.million',
    version: CONFIG.version,
    authentication: 'none-for-local-runtime',
    portability: Array.isArray(adaptersList) ? [...adaptersList] : [],
    generatedAt: new Date().toISOString(),
    agents: (agents || []).map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      capabilities: Array.isArray(a.capabilities) ? a.capabilities : [],
      version: a.version,
      author: a.author,
      instructions: a.instructions || ''
    })),
    skills: (skills || []).map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      version: s.version,
      author: s.author,
      instructions: s.instructions || ''
    })),
    adapters: Array.isArray(adaptersList) ? [...adaptersList] : []
  };

  const json = JSON.stringify(pkg, null, 2);
  if (json.includes(PROJECT_ROOT) || /\/home\/|\/Users\/|C:\\/.test(json)) {
    throw new Error('Tentativa de exportar caminho absoluto detectada — abortando');
  }

  const outputDir = path.resolve(PROJECT_ROOT, CONFIG.outputDir);
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, 'ventura-agent-package.json');
  await fs.writeFile(outputPath, json, 'utf-8');

  return { path: outputPath, package: pkg };
}
