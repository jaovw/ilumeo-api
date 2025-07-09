# 📦 API de Gestão de Colaboradores e Pontos

Este projeto é uma API RESTful desenvolvida em **Node.js com TypeScript**, estruturada sob a arquitetura **MVC com camadas de domínio**, incluindo **Use Cases**, **Entities** e **DTOs**, promovendo alta organização, desacoplamento e escalabilidade.

A aplicação utiliza o **Sequelize** como ORM com banco de dados **PostgreSQL**, com mapeamento e controle completo via migrations e seeders automatizados. Todo o fluxo de execução está preparado para rodar via **Docker**, com containers isolados para API e banco de dados, garantindo consistência entre os ambientes de desenvolvimento e produção.

Além disso, o projeto conta com uma suíte de **testes unitários e de integração** utilizando **Jest** e **Supertest**, garantindo confiabilidade e cobertura de funcionalidades essenciais.

---

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

---

## 🐳 Subindo o ambiente com Docker

Certifique-se de que o Docker esteja instalado em sua máquina.

Suba os containers:

```bash
docker-compose up --build
```

> O script de entrada (`docker-entrypoint.sh`) aguarda o banco iniciar, executa as migrations e só roda os seeders se ainda não houver colaboradores cadastrados.

---

## 🧪 Rodando os Testes

Para executar a suíte de testes automatizados:

```bash
yarn test
```

Os testes abrangem tanto a lógica de negócio quanto as integrações HTTP com a API.

---

## 📁 Estrutura de Pastas (Resumo)

