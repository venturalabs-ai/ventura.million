export const adapter = {
  id: 'mistral',
  name: 'Mistral',
  outputFormat: 'markdown',
  integrationType: 'instructions-export-only',
  apiEnvVar: 'MISTRAL_API_KEY',
  limitations: 'A API exige chave. Instrução de sistema manual na interface web.',
  steps: 'Campo de instrução de sistema → Colar → Enviar'
};
