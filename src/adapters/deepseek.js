export const adapter = {
  id: 'deepseek',
  name: 'DeepSeek',
  outputFormat: 'markdown',
  integrationType: 'instructions-export-only',
  apiEnvVar: 'DEEPSEEK_API_KEY',
  limitations: 'A API exige chave. Instrução de sistema manual na interface.',
  steps: 'Campo de instrução de sistema → Colar → Salvar'
};
