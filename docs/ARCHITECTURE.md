# Arquitetura do Sistema

## Princípios de design

- **Local-first:** tudo que pode rodar localmente, roda localmente
- **Sem bloqueio por padrão:** avisos não interrompem funcionamento
- **Determinístico:** mesma entrada = mesmo roteamento
- **Extensível:** basta adicionar arquivos `.md` para criar agentes e skills
- **Sem dependências pesadas:** usar APIs nativas do Node.js

## Fluxo de execução

```
Entrada do Usuário
 │
 ▼
 Carregar Registro ── ler arquivos .md
 │
 ▼
 Roteamento ─────── pontuar correspondências
 │
 ▼
 Montar Plano ───── agrupar instruções
 │
 ▼
 Gerar Saída ────── JSON + instruções
 │
 ▼
 Adaptador ───────── formatar por plataforma (opcional)
```

## Módulos principais

- **frontmatter.js** — Parser leve de metadados sem dependências externas
- **registry.js** — Descoberta automática de agentes e skills
- **router.js** — Pontuação e seleção determinística
- **runtime.js** — Montagem de plano sem chamada externa
- **exporter.js** — Geração de pacote portátil
- **validator.js** — Validação de integridade e segurança
- **cli/index.js** — Interface de linha de comando
