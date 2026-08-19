# Política de Segurança

## Versões Suportadas

Apenas a branch `main` recebe atualizações de segurança. Use versões publicadas para estabilidade.

## Relatar uma Vulnerabilidade

**Não relate vulnerabilidades de segurança em issues públicas.**

Envie relatório detalhado por meio de **Relatório de Segurança Privado** no GitHub em:
https://github.com/venturalabs-ai/ventura.million/security/advisories

Inclua:
- Descrição do problema e impacto
- Arquivo e linha afetados
- Passo a passo de reprodução
- Versão afetada
- Sugestão de correção, se houver

## Processo

- Confirmação em até 48h
- Triagem em até 5 dias úteis
- Correção e divulgação coordenada conforme gravidade
- Agradecimento público após resolução (quando apropriado)

## Práticas de Segurança do Projeto

- Nenhum segredo hardcoded no repositório
- `.env` em `.gitignore` — nunca commitado
- CI verifica presença de tokens e chaves antes de merge
- Validação proíbe caminhos absolutos no pacote exportado
- Nenhuma execução de código arbitrário a partir de prompt
- Limites de tamanho de entrada configurados
- Integrações de API exigem chave opcional de ambiente
- Avisos de segurança **não** bloqueiam uso local

## Limitações

O runtime local não faz chamadas de rede por padrão. Integrações com APIs externas dependem de chaves individuais e políticas de cada plataforma terceira, sobre as quais não temos controle. Recomenda-se sempre revisar instruções antes de enviá-las a serviços externos.
