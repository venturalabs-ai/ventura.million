# Changelog — ventura.million

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

O formato segue **Versionamento Semântico** (`MAJOR.MINOR.PATCH`).

---

## [1.0.0] — 2026-08-19

### Adicionado
- Framework inicial completo — núcleo, CLI, agentes e skills
- 5 agentes: orchestrator, marketing, vendas, suporte, infoproduto
- 5 skills: planning, research, review, tool-use, infoproduto-pack
- 10 adaptadores para plataformas de IA
- Roteamento determinístico por pontuação
- Runtime local sem chamada de modelo externo
- Sistema de validação integrado
- Exportação de pacote portátil (`ventura-agent-package/v1`)
- Suíte de testes determinísticos
- CI com Node.js 20 e 22 + workflow de qualidade/segurança
- Documentação completa (instalação, arquitetura, portabilidade, segurança, adaptadores, compliance)
- Diagnóstico de ambiente (`npm run doctor`)
- Arquivos de comunidade: CODE_OF_CONDUCT, CONTRIBUTING, SECURITY, PR/Issue templates
- CITATION.cff e CHANGELOG

### Segurança
- Sem segredos hardcoded
- `.env` ignorado pelo Git
- Validação de caminhos absolutos e referências proibidas
- Limite de tamanho de entrada
- Sem execução de código arbitrário
- CI com scan de segredos e referências proibidas

### Documentação
- README com instruções e limitações honestas
- Guia de instalação, arquitetura, portabilidade, adaptadores
- Modelo de ameaça e práticas de segurança
- Política de contribuição e Código de Conduta
- Documento de Qualidade, Confiabilidade e Compliance

---

## Versão atual: `1.0.0`
