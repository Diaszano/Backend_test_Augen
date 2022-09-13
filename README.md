# Backend test Augen Engenharia (2022)

O teste consiste em estruturar uma API REST, um banco de dados para esta API e a documentação de como rodar o projeto.
O sistema poderá ser realizado em PHP (Laravel) ou Node JS (express) e utilizar banco de dados MYSQL.

## Sistema

Equipamentos espalhados por cidades do Brasil fazem análises da água de poços, nessas leituras são feitas análises do PH, Cloro, Fluor e Vazão. Este sistema deve permitir o armazenamento externo dessas análises linkado para cada equipamento que fizer o envio dessas análises. Caso uma análise possua vazão 0 (zero) não deverá ser feito o armazenamento desta análise, valores de cloro e fluor maiores que 100 devem ser desconsiderados.
O sistema deve permitir cadastro de equipamentos e cidades.
O cadastro de funcionários é opcional para caso o(a) candidato(a) queira utilizar autenticação (opcional).  

## Requisitos

  - Estruturar o sistema observando o MVC mas sem as views
  - Utilizar MYSQL no banco de dados
  - As respostas devem ser em JSON
  - Se o(a) candidato(a) optar por implementar sistema de login (opcional), deverá ser obrigatoriamente utilizar JWT Token
  - Documentação de como rodar o projeto em um README (requisitos, como rodar, detalhamento de rotas)

## Rotas

- Equipamentos:
    - Listar todos equipamentos (index)
    - Listar equipamento pelo id (show)
    - Adicionar novo equipamento (store)
    - Editar o equipamento (edit)
    - Excluir o equipamento (soft delete)
- Análises:
    - Listar todas análises (index)
    - Listar análise pelo id (show)
    - Listar análises conforme a data solicitada na requisição
    - Adicionar nova análise (store)
    - Excluir a análise (delete)

## Banco de dados

Pode ser estruturado conforme escolha do(a) candidato(a), mas minimamente deverá conter o seguinte:

- Equipamentos (id, nome, cidade)
- Cidades
- Análises (PH, Cloro, Fluor, Vazão, equipamento)
- Funcionários (Email e senha - opcional para caso queira utilizar login)

## Critérios de avaliação

- Lógica de programação
- Organização do projeto
- Estruturação do banco de dados
- Clareza na documentação
