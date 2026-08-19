export const adapter = {
  id: 'chatgpt',
  name: 'ChatGPT (OpenAI)',
  outputFormat: 'markdown',
  integrationType: 'instructions-export-only',
  apiEnvVar: 'OPENAI_API_KEY',
  limitations: 'A API exige chave. Instruções personalizadas disponíveis em contas compatíveis.',
  steps: 'Configurações → Instruções personalizadas → Colar instruções → Salvar'
};
