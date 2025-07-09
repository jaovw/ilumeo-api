# 📦 API de Gestão de Colaboradores e Pontos

Este projeto é uma API RESTful desenvolvida em **Node.js com TypeScript**, estruturada sob a arquitetura **MVC com camadas de domínio**, incluindo **Use Cases**, **Entities** e **DTOs**, promovendo alta organização, desacoplamento e escalabilidade.

A aplicação utiliza o **Sequelize** como ORM com banco de dados **PostgreSQL**, com mapeamento e controle completo via migrations e seeders automatizados. Todo o fluxo de execução está preparado para rodar via **Docker**, com containers isolados para API e banco de dados, garantindo consistência entre os ambientes de desenvolvimento e produção.

Além disso, o projeto conta com uma suíte de **testes unitários e de integração** utilizando **Jest** e **Supertest**, garantindo confiabilidade e cobertura de funcionalidades essenciais.


## 🚀 Tecnologias e Conceitos Utilizados

- **Node.js + TypeScript**
- **Arquitetura MVC**
- **Camadas de Use Case, DTO e Entity**
- **Sequelize ORM**
- **PostgreSQL**
- **Docker e Docker Compose**
- **Jest + Supertest para testes unitários e de integração**
- **Seeders controlados dinamicamente**
- **Scripts CLI para automação de ambiente**


## 🐳 Subindo o ambiente com Docker

Certifique-se de que o Docker esteja instalado em sua máquina.

Suba os containers:

```bash
docker-compose up --build
```

> O script de entrada (`docker-entrypoint.sh`) aguarda o banco iniciar, executa as migrations e só roda os seeders se ainda não houver colaboradores cadastrados.

## 🔧 Rodando o ambiente local (sem Docker)

1. Instale as dependências do projeto:

```bash
yarn install
```

2. Crie o banco de dados configurado no `.env`:

```bash
yarn db:create
```

3. Rode as migrations:

```bash
yarn migrate
```

4. Execute os seeders (opcional, se quiser dados iniciais para testes):

```bash
yarn seed
```

5. Inicie a aplicação em modo de desenvolvimento com recarregamento automático:

```bash
yarn dev
```

## 🧪 Rodando os Testes

Para executar a suíte de testes automatizados:

```bash
yarn test
```

Os testes abrangem tanto a lógica de negócio quanto as integrações HTTP com a API.


## 📁 Estrutura de Pastas (Resumo)

```text
src/
├── config/              # Configurações de banco, enums, etc.
├── controllers/         # Camada de entrada (HTTP)
├── dtos/                # Data Transfer Objects
├── entities/            # Regras de negócio isoladas
├── interfaces/          # Tipagens e contratos
├── models/              # Sequelize models
├── repositories/        # Abstrações e acesso ao banco
├── services/            # Lógica de negócio
├── usecases/            # Casos de uso
├── seeders/             # Dados iniciais
├── migrations/          # Migrations do banco
├── tests/               # Testes automatizados
└── main.ts              # Ponto de entrada da aplicação
```

## 🎯 Escopo do Desafio

Esta aplicação foi desenvolvida para atender ao desafio de criar uma solução completa para **controle de ponto de colaboradores**, com foco em usabilidade e clareza de informações. A arquitetura backend contempla os seguintes pilares:

- **API RESTful** em Node.js + TypeScript
- **Banco de dados relacional** com PostgreSQL
- **ORM Sequelize** para modelagem e persistência
- **Documentação e organização** com foco em extensibilidade

A solução proposta atende aos três pontos-chave do desafio:

1. ✅ **Visualização atualizada das horas trabalhadas no dia atual**  
   - A API disponibiliza um **endpoint específico de resumo por colaborador**, que retorna informações como:
     - Nome, matrícula
     - Total de horas trabalhadas no dia atual
     - Histórico de pontos anteriores
     - Entradas e saídas com base no tipo do ponto (`ENTRADA` ou `SAIDA`)

2. ✅ **Possibilidade de iniciar ou finalizar um turno**  
   - Está disponível o **CRUD completo da entidade `Ponto`**, permitindo registrar novos pontos (início/fim de turno) de forma simples.
   - A lógica de negócio considera o tipo de ponto para controle da jornada diária.

3. ✅ **Acompanhamento do total de horas trabalhadas nos dias anteriores**  
   - O endpoint de resumo também lista o total de horas por dia, com detalhes por data, entrada e saída.
   - Os dados são agrupados por dia, o que facilita a visualização e análise histórica.

A camada de domínio é bem estruturada, com o uso de **DTOs**, **Entities**, **UseCases** e **Repositories**, favorecendo a separação de responsabilidades e facilitando a manutenção futura da aplicação.

A API está preparada para ser consumida por qualquer front-end SPA, com retornos em JSON e organização RESTful.
