# ventura.million

**Framework local-first para criar, testar, executar, validar e exportar agentes e skills de IA.**

[![CI](https://github.com/venturalabs-ai/ventura.million/actions/workflows/ci.yml/badge.svg)](https://github.com/venturalabs-ai/ventura.million/actions/workflows/ci.yml)
[![Qualidade](https://github.com/venturalabs-ai/ventura.million/actions/workflows/quality.yml/badge.svg)](https://github.com/venturalabs-ai/ventura.million/actions/workflows/quality.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js >= 20](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org)

✅ Funciona sem cadastro, sem senha, sem banco de dados, sem servidor externo  
✅ Exporta instruções prontas para 10 plataformas de IA  
✅ Roteamento inteligente determinístico — sem chamada a modelo externa  
✅ Validação completa do projeto  
✅ Testes determinísticos  
✅ Apenas Node.js 20+ — sem dependências externas de runtime

---

## Instalação

```bash
git clone https://github.com/venturalabs-ai/ventura.million.git
cd ventura.million
npm install
```

Nenhuma chave ou conta é exigida para uso local.

## Comandos

```bash
# Executar agente localmente (monta plano e instruções)
npm start -- --prompt "planejar e revisar uma pesquisa"

# Listar agentes e skills disponíveis
npm run list

# Diagnóstico do ambiente
npm run doctor

# Validar todo o projeto
npm run validate

# Gerar pacote portátil
npm run export

# Executar testes
npm test
```

## Como funciona

1. Escreva agentes e skills em arquivos Markdown com frontmatter simples
2. O sistema carrega automaticamente todos os arquivos `.md`
3. Roteamento inteligente seleciona o agente e skills mais adequados
4. Plano montado localmente — sem chamada de API
5. Instruções prontas para copiar e colar em qualquer IA
6. Exportação gera pacote JSON portátil (`dist/ventura-agent-package.json`)

## Agentes inclusos

| ID | Nome | Foco |
|----|------|------|
| `orchestrator` | Orquestrador Universal | Coordenação e planejamento geral |
| `marketing` | Especialista em Marketing | Campanhas, funil, conteúdo |
| `vendas` | Especialista em Vendas | Oferta, página de vendas, conversão |
| `suporte` | Especialista em Suporte | FAQ, onboarding, retenção |
| `infoproduto` | Especialista em Info-Produtos | Empacotamento, entrega, lançamento digital |

## Skills inclusas

| ID | Nome |
|----|------|
| `planning` | Planejamento e Estruturação |
| `research` | Pesquisa e Sistematização |
| `review` | Revisão e Aprimoramento |
| `tool-use` | Uso de Ferramentas e Código |
| `infoproduto-pack` | Empacotamento e Entrega de Info-Produtos |

## Plataformas suportadas (adaptadores)

| Adaptador | Tipo | Autenticação |
|-----------|------|--------------|
| Claude | Instruções manuais | Opcional (API) |
| ChatGPT | Instruções manuais | Opcional (API) |
| Grok | Instruções manuais | Opcional (API) |
| Copilot | Instruções manuais | Por assinatura |
| Gemini | Instruções manuais | Opcional (API) |
| Mistral | Instruções manuais | Opcional (API) |
| Perplexity | Instruções no prompt | Opcional (API) |
| DeepSeek | Instruções manuais | Opcional (API) |
| Qwen | Instruções manuais | Opcional (API) |
| Genérico | Copiar e colar | Nenhuma |

## Limitações e honestidade

- O runtime local **monta um plano e instruções** — **não** chama nem gera resposta de modelo de IA.
- Adaptadores geram instruções para cópia manual — não publicam automaticamente em contas de terceiros.
- Chaves de API são opcionais e nunca são salvas no repositório.
- Não burla autenticação de terceiros.

## Documentação

- [Instalação](docs/INSTALLATION.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Portabilidade](docs/PORTABILITY.md)
- [Segurança](docs/SECURITY.md) · [Política de Segurança](.github/SECURITY.md)
- [Adaptadores](docs/ADAPTERS.md)
- [Compliance](docs/COMPLIANCE.md)
- [Changelog](docs/CHANGELOG.md)
- [Contribuindo](CONTRIBUTING.md)
- [Código de Conduta](CODE_OF_CONDUCT.md)
- [Suporte](docs/SUPPORT.md)

## Licença

MIT © Ventura Labs AI / venturalabs-ai
