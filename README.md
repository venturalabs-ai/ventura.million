# ventura.million

[![CI](https://github.com/venturalabs-ai/ventura.million/actions/workflows/ci.yml/badge.svg)](https://github.com/venturalabs-ai/ventura.million/actions/workflows/ci.yml)
[![Qualidade](https://github.com/venturalabs-ai/ventura.million/actions/workflows/quality.yml/badge.svg)](https://github.com/venturalabs-ai/ventura.million/actions/workflows/quality.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js >= 20](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Framework local-first para criar, testar, executar, validar e exportar agentes e skills de IA.**

> ✅ **Funciona sem cadastro, sem senha, sem banco de dados, sem servidor externo.**  
> Runtime 100% local — zero dependências de rede obrigatórias.

---

## Table of contents

- [Features](#features)
- [Quick start](#quick-start)
- [Commands](#commands)
- [How it works](#how-it-works)
- [Agents & skills](#agents--skills)
- [Adapters](#adapters)
- [Project structure](#project-structure)
- [Limitations](#limitations)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

---

## Features

| | |
|---|---|
| 🏠 **Local-first** | Sem cadastro, sem senha, sem banco, sem servidor externo |
| 🧠 **Roteamento determinístico** | Seleciona agente/skill por pontuação — sem chamada a LLM |
| 📦 **Export portátil** | Pacote JSON `ventura-agent-package/v1` |
| 🔌 **10 adaptadores** | Claude, ChatGPT, Grok, Copilot, Gemini, Mistral, Perplexity, DeepSeek, Qwen, Genérico |
| ✅ **Validação + testes** | CI multi-Node, scan de segredos e referências proibidas |
| 🧩 **Markdown + frontmatter** | Agentes e skills como arquivos `.md` legíveis |

---

## Quick start

**Requisito:** Node.js ≥ 20

```bash
git clone https://github.com/venturalabs-ai/ventura.million.git
cd ventura.million
npm install
npm start -- --prompt "planejar e revisar uma pesquisa"
```

Nenhuma chave de API ou conta é necessária para uso local.

---

## Commands

```bash
npm start -- --prompt "sua solicitação"   # Monta plano + instruções
npm run list                              # Lista agentes, skills e adaptadores
npm run doctor                            # Diagnóstico do ambiente
npm run validate                          # Valida o projeto
npm run export                            # Gera dist/ventura-agent-package.json
npm test                                  # Suite de testes determinísticos
```

---

## How it works

1. Defina agentes e skills em `src/agents/` e `src/skills/` (Markdown + frontmatter)
2. O registry carrega todos os `.md` automaticamente
3. O router escolhe o melhor match pelo texto do prompt
4. O runtime monta o **plano e as instruções** localmente (sem chamar modelo)
5. Você copia o texto gerado para a IA de sua escolha
6. `npm run export` gera um pacote JSON portátil

---

## Agents & skills

### Agents

| ID | Nome | Foco |
|----|------|------|
| `orchestrator` | Orquestrador Universal | Coordenação e planejamento geral |
| `marketing` | Especialista em Marketing | Campanhas, funil, conteúdo |
| `vendas` | Especialista em Vendas | Oferta, página de vendas, conversão |
| `suporte` | Especialista em Suporte | FAQ, onboarding, retenção |
| `infoproduto` | Especialista em Info-Produtos | Empacotamento, entrega, lançamento digital |

### Skills

| ID | Nome |
|----|------|
| `planning` | Planejamento e Estruturação |
| `research` | Pesquisa e Sistematização |
| `review` | Revisão e Aprimoramento |
| `tool-use` | Uso de Ferramentas e Código |
| `infoproduto-pack` | Empacotamento e Entrega de Info-Produtos |

---

## Adapters

| Adapter | Tipo | Auth |
|---------|------|------|
| Claude | Instruções manuais | API opcional |
| ChatGPT | Instruções manuais | API opcional |
| Grok | Instruções manuais | API opcional |
| Copilot | Instruções manuais | Assinatura |
| Gemini | Instruções manuais | API opcional |
| Mistral | Instruções manuais | API opcional |
| Perplexity | No prompt | API opcional |
| DeepSeek | Instruções manuais | API opcional |
| Qwen | Instruções manuais | API opcional |
| Genérico | Copiar e colar | Nenhuma |

---

## Project structure

```text
ventura.million/
├── AGENTS.md                 # Instruções canônicas para agentes de código
├── README.md
├── LICENSE
├── package.json
├── src/
│   ├── agents/               # Personas (Markdown + frontmatter)
│   ├── skills/               # Capacidades reutilizáveis
│   ├── adapters/             # Export por plataforma
│   ├── core/                 # Registry, router, runtime, exporter, validator
│   └── cli/                  # CLI
├── tests/
├── docs/
└── .github/                  # CI, security, community health
```

---

## Limitations

- O runtime **monta plano e instruções** — **não** chama nem gera resposta de modelo de IA.
- Adaptadores exportam texto para cópia manual — **não** publicam em contas de terceiros.
- Chaves de API são **opcionais** e nunca vão para o repositório.
- Não há bypass de autenticação, paywall ou políticas de plataformas externas.

---

## Documentation

| Doc | Descrição |
|-----|-----------|
| [INSTALLATION](docs/INSTALLATION.md) | Instalação e ambiente |
| [ARCHITECTURE](docs/ARCHITECTURE.md) | Arquitetura do sistema |
| [PORTABILITY](docs/PORTABILITY.md) | Pacote portátil |
| [ADAPTERS](docs/ADAPTERS.md) | Detalhe dos adaptadores |
| [COMPLIANCE](docs/COMPLIANCE.md) | Qualidade e compliance |
| [SECURITY](docs/SECURITY.md) | Segurança local |
| [CHANGELOG](docs/CHANGELOG.md) | Histórico de versões |
| [SUPPORT](docs/SUPPORT.md) | Canais de suporte |
| [AUDIT](docs/AUDIT-ENGINEERING.md) | Auditoria de engenharia |

---

## Contributing

Contribuições são bem-vindas. Leia:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [AGENTS.md](AGENTS.md) — regras para agentes de código e PRs

Abra uma issue antes de mudanças grandes. PRs devem passar em `npm test` e `npm run validate`.

---

## Security

Vulnerabilidades: reporte de forma privada via [Security Advisories](https://github.com/venturalabs-ai/ventura.million/security/advisories/new) ou veja [.github/SECURITY.md](.github/SECURITY.md).

---

## License

[MIT](LICENSE) © Ventura Labs AI / [venturalabs-ai](https://github.com/venturalabs-ai)
