/**
 * Configuração central do ventura.million
 * Local-first, sem dependências externas
 */
export const CONFIG = {
  version: '1.0.0',
  formatVersion: 'ventura-agent-package/v1',
  maxPromptSize: 100000,
  agentsDir: 'src/agents',
  skillsDir: 'src/skills',
  adaptersDir: 'src/adapters',
  outputDir: 'dist',
  requiredAgentFields: ['id', 'name', 'description', 'capabilities', 'version', 'author'],
  requiredSkillFields: ['id', 'name', 'description', 'version', 'author']
};
