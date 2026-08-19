# Instalação e Configuração

## Requisitos

- Node.js 20.0 ou superior
- npm (incluso na instalação do Node.js)

## Passo a passo

```bash
# 1. Obter o código
git clone https://github.com/venturalabs-ai/ventura.million.git
cd ventura.million

# 2. Instalar dependências (nenhuma dependência de runtime externa)
npm install

# 3. Verificar instalação
npm run doctor

# ✅ Pronto para uso local — sem chave, sem cadastro
```

## Integrações opcionais (API)

Renomeie `.env.example` para `.env` e preencha as chaves que deseja usar.  
**Nenhuma é obrigatória.** O arquivo `.env` nunca deve ser enviado ao repositório.

## Publicação segura

- Nunca faça commit de `.env`, tokens ou chaves.
- Use `npm run validate` antes de qualquer push.
- A CI verifica ausência de segredos óbvios.
