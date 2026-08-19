# AGENTS.md — ventura.million

Canonical instructions for AI coding agents and human contributors working on this repository.

## Project

**ventura.million** is a local-first, portable framework to create, test, run, validate and export AI agents and skills. The runtime builds plans and instruction packages; it does **not** call external models by default.

- Stack: Node.js >= 20, ESM only, zero runtime dependencies
- License: MIT
- Default branch: `main`

## Commands (run these)

```bash
npm install
npm test
npm run validate
npm run doctor
npm run export
npm start -- --prompt "your request"
npm run list
```

All of the above must pass before finishing a task. Prefer `npm test` and `npm run validate` as the final gate.

## Repository map

```
src/agents/     # Agent definitions (Markdown + frontmatter)
src/skills/     # Skill definitions (Markdown + frontmatter)
src/adapters/   # Platform adapters (export-only instructions)
src/core/       # Parser, registry, router, runtime, exporter, validator
src/cli/        # CLI entrypoint
tests/          # Deterministic unit tests (no network)
docs/           # Human documentation
.github/        # CI, community health, security policy
```

## Golden rules

1. **Local-first** — no required login, password, DB or network for core commands.
2. **No secrets** — never commit `.env`, tokens, API keys or absolute machine paths.
3. **Honest runtime** — `providerResponse` stays `null` in local mode; do not pretend a model replied.
4. **Frontmatter required** — agents/skills need `id`, `name`, `description`, `version`, `author` (+ `capabilities` for agents).
5. **Adapters are export-only** — they generate copy-paste instructions; they do not auto-publish to third-party platforms.
6. **Deterministic tests** — no network during `npm test`.
7. **Portuguese or English** — product agents default to PT-BR unless the user asks otherwise; code/docs may be bilingual.

## Boundaries

- Do not invent API endpoints, SDKs or “one-click install” for Claude/ChatGPT/Grok/etc.
- Do not add heavy dependencies without strong justification.
- Do not bypass authentication or policies of external platforms.
- Do not reference forbidden external project names in agents/skills/manifest.

## How to add an agent or skill

1. Create `src/agents/<id>.md` or `src/skills/<id>.md` with YAML-like frontmatter + body.
2. Run `npm run validate` and `npm test`.
3. Update README tables if the agent/skill is user-facing.
4. Prefer small, testable changes and conventional commits (`feat:`, `fix:`, `docs:`).

## Verification checklist

Before considering work done:

- [ ] `npm test` green
- [ ] `npm run validate` green
- [ ] `npm run doctor` shows expected agents/skills/adapters
- [ ] `npm run export` produces valid JSON without absolute paths
- [ ] No secrets or forbidden references in the diff

## Further reading

- [Architecture](docs/ARCHITECTURE.md)
- [Compliance](docs/COMPLIANCE.md)
- [Security](.github/SECURITY.md)
- [Contributing](CONTRIBUTING.md)
