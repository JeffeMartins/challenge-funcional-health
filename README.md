**Esta é uma API para Caixa eletronico Feita em GraphQL**

**Pre requisitos:**

*NodeJS v12.1.0 ou compatível.

*Yarn v1.21.1 ou compatível.

**Banco de dados utilizado**

*MongoDB

**Instalação das dependências**

*Yarn install<br>
*Npm install

**Startando servidor**

*yarn start

Abrir browser Localhost:4000

**Contas correntes cadastradas no banco de dados**

Conta: 54571<br>
Nome: João Vitor<br>
Saldo: 25000<br>

Conta: 63451<br>
Nome: Maria Eduarda<br>
Saldo: 7500

Conta: 13346<br>
Nome: Roberto Figueira<br>
Saldo: 500<br>

**É possível criar novas contas corrente utilizando
a Mutation<br>**

createUser(name: String!, email: String!, conta: Int!, saldo: Float!): User

**OBS:**

A API não permite a criação de contas com o mesmo número.

**link da API pra teste:** https://challenge-funcional-health.herokuapp.com/

**Para mais informações é possível acessar a aba DOCS e SCHIMA do Apollo server
no localhost:4000 após startar o server**




