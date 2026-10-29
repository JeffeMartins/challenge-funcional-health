# Contexto da modernização

Repositório: `challenge-funcional-health`. Revisão em 28/10/2026. O objetivo é tornar o clone reproduzível e o comportamento compreensível em uma entrevista técnica, preservando o contexto histórico de exercício/protótipo.

## Decisões e validação

- GraphQL Yoga atualizado, sem conexão ou credencial cloud embutida.
- Dinheiro persistido em centavos inteiros; valores negativos, não finitos ou com precisão inválida são rejeitados.
- Saque usa filtro de saldo e `$inc` na mesma operação atômica. Depósito também usa incremento atômico, evitando read-modify-write que perde atualizações.
- Validação de conta, nome/email e tratamento de duplicidade.
- Testes de precisão e da operação atômica; parada graciosa do servidor e banco.


Consulte os scripts reais em `package.json` (ou nos módulos do monorepo). Build, teste unitário e teste com serviços externos são evidências diferentes. A CI não valida credenciais de terceiros nem garante comportamento em produção. O README informa dependências externas e funcionalidades ainda não implementadas.

## Segurança de configurações antigas

Configurações locais e segredos foram retirados da versão atual quando presentes. Isso não remove conteúdo de commits antigos. Se algum segredo histórico ainda estiver ativo, revogue-o no provedor e gere outro; não reutilize credenciais publicadas. A revisão preserva o histórico Git e não faz force push.
