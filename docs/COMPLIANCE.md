# Qualidade, Confiabilidade e Compliance

Este documento estabelece os padrões pelos quais o projeto é mantido, testado e validado.

## Critérios de Qualidade de Código

| Critério | Regra | Verificação |
|---|---|---|
| Sem segredos commitados | Proibido tokens, chaves, senhas em código | CI + Validação local |
| Sem referências proibidas | Nomes de projetos externos bloqueados | Validador integrado |
| Sem caminhos absolutos | Manifesto não pode conter caminhos do sistema | Validador integrado |
| IDs únicos | Agentes e Skills não podem ter ID duplicado | Validador integrado |
| Campos obrigatórios | Frontmatter completo em todos os arquivos | Validador integrado |
| Sem código sem teste | Alterações devem manter cobertura | CI |

## Confiabilidade — Garantias do Sistema

### Funcionamento local
- **Nenhuma conta obrigatória** — núcleo funciona sem login, senha ou cadastro
- **Nenhuma chave obrigatória** — variáveis de API são opcionais
- **Sem banco de dados** — opera em memória e arquivos locais
- **Sem servidor externo** — não abre conexões de rede por padrão
- **Determinístico** — mesma entrada produz mesmo roteamento
- **Resiliência a falhas** — arquivos inválidos são ignorados com aviso, não quebram o sistema

### Comportamento previsível
- O runtime **monta plano**, não gera resposta de modelo
- `providerResponse` sempre nulo em modo local
- Limites de proteção contra entradas excessivas
- Mensagens de erro úteis e sem exposição de caminhos internos

## Segurança e Proteção de Dados

| Controle | Status | Detalhe |
|---|---|---|
| Arquivos de ambiente ignorados | ✅ | `.env` nunca commitado |
| Valores de exemplo fictícios | ✅ | `.env.example` sem chaves reais |
| Sanitização de caminhos | ✅ | Apenas caminhos relativos no manifesto |
| Limite de tamanho de entrada | ✅ | 100.000 caracteres |
| Sem execução de shell | ✅ | Nenhuma chamada a `eval()` ou processo externo |
| Sem coleta de dados | ✅ | Sem telemetria, sem analytics |
| Avisos não bloqueantes | ✅ | Riscos são comunicados, uso não impedido |
| Validação de integridade | ✅ | `npm run validate` verifica todos os arquivos |

## Compliance com Padrões do GitHub

- Estrutura de pastas recomendada
- Arquivos de comunidade (`CODE_OF_CONDUCT`, `CONTRIBUTING`, `SECURITY`)
- Modelos de Issues e Pull Request
- CI com verificação automática
- Licença declarada e reconhecida (MIT)
- Citação acadêmica (`CITATION.cff`)
- Versão semântica e changelog

## Matriz de Verificação por Versão

Toda versão publicada deve passar por:

- [ ] `npm install` sem erros
- [ ] `npm test` todos passando
- [ ] `npm run validate` sem erros
- [ ] `npm run doctor` sem avisos críticos
- [ ] `npm run export` JSON válido gerado
- [ ] grep de segredos limpo
- [ ] grep de referências proibidas limpo
- [ ] verificação de caminhos absolutos limpa
- [ ] changelog atualizado
- [ ] documentação sincronizada

## Declaração de Transparência

O sistema **não burla autenticação, paywalls ou limites de terceiros**. Integrações com APIs externas exigem chave própria do usuário e respeitam as políticas de cada plataforma. Adaptadores geram apenas instruções — não publicam, não enviam dados e não agem em nome do usuário em serviços de terceiros sem ação explícita.

Este projeto segue princípios de transparência, honestidade e independência. Nenhuma funcionalidade é oculta e nenhuma limitação é omitida da documentação.
