<div align="center">
    <a href="https://my-finance-frontend.vercel.app/">
        <img src="https://raw.githubusercontent.com/nathaalves/my-finance-frontend/main/src/assets/images/favicon.ico" width="64" height="64" alt="MyFinance Icon">
    </a>
    <h1>
        <a href="https://my-finance-frontend.vercel.app/">
            MyFinance API
        </a>
    </h1>
</div>

# Sobre este app

MyFinance é uma aplicação web que tem como objetivo prover ao usuário controle sobre as suas financas através do registro dos gastos e rendas do usuário.

Para acessar o deploy da aplicação, [click aqui](https://my-finance-frontend.vercel.app/).

# Rodando a aplicação em ambiente local

## Dependências globais

Você precisará ter instalado em sua máquina:

1. Node.js v16 ou superios;
2. PostgreSQL v13 ou superior.

## Clone no repositório

Faça o clone deste repositório para a sua máquina local, executando o seguinte comando:

```bash
git clone https://github.com/nathaalves/my-finance-backend.git
```

## Dependências locais

Para instalar as dependências locais,execute o comando abaixo:

```bash
npm install
```

## Configuração do ambiente de desenvolvimento

Para criar o ambiente de desenvolvimento, utilize como base o arquivo `.env.example`, renomenando-o ou criando uma cópia como `.env.development`.

- `DATABASE_URL`: URL de conexão com o banco de dados;
- `BCRYPT_SALT_ROUNDS`: salto utilizado para criar o hash do password;
- `JWT_ACCESS_TOKEN_SECRET_KEY`: chave secreta do token de acesso;
- `JWT_ACCESS_TOKEN_EXPIRES_IN`: tempo de expiração do token de acesso;
- `JWT_REFRESH_TOKEN_SECRET_KEY`: chave secreta do refresh token;
- `JWT_REFRESH_TOKEN_EXPIRES_IN`: tempo de expiração do refresh token.

## Rodar a aplicação

Para rodar a aplicação, execute o comando:

```bash
npm run dev
```

Ao final será disponibilizada uma rota de conexão com a API na porta `5000` do seu `localhost`.:

## Documentação da API

Para testar e se informar sobre as rotas e seus parâmetros, acesse:

```bash
http://localhost/5000/api-docs
```

## Features

- [x] Cadastro do usuário;
- [x] Login na aplicação;
- [x] Logout;
- [x] Refresh token;
- [ ] Recuperação de senha;
- [ ] Memorização da senha;
- [x] Visualização das estatísticas de transações;
- [ ] Filtragem das estatísticas de transações por dia, semana, mês e periodo selecionado;
- [x] Criação de transações;
- [x] Edição de transaçoes;
- [x] Deleção de transações;
- [ ] Criação de categorias;
- [ ] Edição de categorias;
- [ ] Deleção de categorias;
