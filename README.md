# Simulador de caixa eletrônico com GraphQL

Exercício de contas, consulta de saldo, depósito e saque. Refatoração da implementação GraphQL/MongoDB de 2022, mantendo o contrato GraphQL de entrada e saída.

[![CI](https://github.com/JeffeMartins/challenge-funcional-health/actions/workflows/ci.yml/badge.svg)](https://github.com/JeffeMartins/challenge-funcional-health/actions/workflows/ci.yml)

## Melhorias de engenharia

- GraphQL Yoga atualizado, sem conexão ou credencial cloud embutida.
- Dinheiro persistido em centavos inteiros; valores negativos, não finitos ou com precisão inválida são rejeitados.
- Saque usa filtro de saldo e `$inc` na mesma operação atômica. Depósito também usa incremento atômico, evitando read-modify-write que perde atualizações.
- Validação de conta, nome/email e tratamento de duplicidade.
- Testes de precisão e da operação atômica; parada graciosa do servidor e banco.

## Executar localmente

Pré-requisitos: Node.js 24 LTS e npm; Docker Compose v2 para os serviços que usam banco.

```sh
npm ci
npm test
docker compose up -d --build
```

GraphiQL: `http://localhost:4000/graphql` (habilitado no Compose local).

```graphql
mutation { createUser(name:"Pessoa Demo",email:"demo@example.com",conta:1001,saldo:100) { conta saldo } }
query { saldo(conta:1001) { name saldo } }
mutation { sacar(conta:1001,saque:10.25) { conta saldo } }
```

O novo schema Mongo usa `saldoCentavos`; bancos antigos com `saldo` em reais precisam de migração explícita, sem conectar automaticamente à antiga instância cloud. A API é um simulador local sem autenticação, contabilidade de partidas, trilha de auditoria ou requisitos de um sistema financeiro real. Não exponha seu banco/demo publicamente. `npm start` pode usar `MONGODB_URI` para um banco local próprio.

## Qualidade e limites da evidência

As mudanças preservam a proposta do exercício e corrigem problemas observados no código. A CI usa Node 24 e `npm ci`, executa o build quando disponível e os testes existentes. O lockfile é versionado; dependências e pastas de build não são. Dependabot acompanha atualizações semanais. Não há promessa de cobertura total, auditoria completa de segurança ou capacidade de produção.

Não publique `.env`, cookies, tokens ou dados reais de clientes. Antes de expor a aplicação à internet, revise autenticação/autorização, TLS, limites de chamadas, logs e backups conforme o domínio. Os exemplos são para execução local. Use `docker compose down` para parar os containers; volumes persistem e `down -v` apaga seus dados.
