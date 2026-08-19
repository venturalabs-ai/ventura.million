export const adapter = {
  id: 'claude',
  name: 'Claude (Anthropic)',
  outputFormat: 'markdown',
  integrationType: 'instructions-export-only',
  apiEnvVar: 'CLAUDE_API_KEY',
  limitations: 'A API exige chave e conta. O modo de instruções personalizadas funciona sem chave.',
  steps: 'Configurações → Instruções personalizadas → Colar instruções geradas → Salvar'
};
