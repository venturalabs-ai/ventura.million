# Guia de Contribuição — ventura.million

Primeiramente: **obrigado por seu interesse em contribuir!**

Este projeto segue padrões de código aberto. Toda contribuição é valorizada, desde relatos de bugs até código e documentação.

## Antes de começar

- Verifique se já não existe issue ou pull request aberto sobre o tema
- Discuta grandes mudanças antes de implementar — abra uma issue primeiro
- Respeite o [Código de Conduta](CODE_OF_CONDUCT.md) em todas as interações

## Configuração do ambiente

```bash
# Pré-requisito: Node.js 20+
git clone https://github.com/venturalabs-ai/ventura.million.git
cd ventura.million
npm install
npm test
npm run validate
```

Todos os testes e validações devem passar antes de enviar sua alteração.

## Fluxo de trabalho

1. Crie uma branch com nome descritivo: `feature/nova-funcionalidade` ou `fix/descricao-do-bug`
2. Faça alterações seguindo o estilo de código existente
3. Adicione testes — correções e funcionalidades sem teste não serão aceitas
4. Atualize a documentação — se alterar comportamento, atualize README e docs
5. Valide tudo localmente:

```bash
npm test
npm run validate
npm run doctor
npm run export
```

6. Faça commit com mensagens descritivas (ex.: `feat: adiciona suporte a X`)
7. Envie a Pull Request preenchendo o modelo fornecido

## Requisitos de aceitação

Uma Pull Request só será mergeada se:

- Todos os testes passarem (`npm test`)
- Validação passar sem erros (`npm run validate`)
- Sem segredos, senhas ou tokens commitados acidentalmente
- Sem referências a projetos externos proibidos
- Documentação atualizada
- Código segue estilo e padrões existentes
- Descrição clara do que foi alterado e por quê

## Convenção de commits

```
tipo: descrição curta

[corpo opcional com detalhes]
```

Tipos: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma Licença MIT do projeto, sem termos ou restrições adicionais.
