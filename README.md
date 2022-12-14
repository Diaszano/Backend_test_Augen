# Backend test Augen Engenharia (2022)

- O teste consiste em estruturar uma API REST, um banco de dados para esta API e a documentação de como rodar o projeto.
- O sistema foi realizado em [Node JS](https://nodejs.org/en/) ([express](https://expressjs.com/pt-br/)) e utilizei o banco de dados [MYSQL](https://www.mysql.com/).

## Sistema

- Equipamentos espalhados por cidades do Brasil fazem análises da água de poços, nessas leituras são feitas análises do PH, Cloro, Fluor e Vazão.
- Este sistema deve permitir o armazenamento externo dessas análises lincado para cada equipamento que fizer o envio dessas análises.
- O sistema permite o cadastro de equipamentos com cidades e os relatórios.

## Temos as rotas: 

- Usuários: 
    - Criar Usuários
    - Fazer o Login

- Equipamentos: 
    - Listar todos equipamentos (index)
    - Listar equipamento pelo id (show)
    - Adicionar novo equipamento (store)
    - Editar o equipamento (edit)
    - Excluir o equipamento (delete)

- Análises: 
    - Listar todas análises (index)
    - Listar análise pelo id (show)
    - Listar análises conforme a data solicitada na requisição (get)
    - Adicionar nova análise (store)
    - Excluir a análise (delete)

Para testar e ver melhor as rotas ao rodar o programa acesse: 
-    http://localhost:3000/docs

## Banco de dados foi estruturado assim: 

- Usuários (id,email,senha)
- Equipamentos (id, nome, cidade)
- Cidades (id,nome)
- Análises (PH, Cloro, Fluor, Vazão, equipamento)

## Requisitos

- [MYSQL](https://www.mysql.com/)
- [Node JS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## Como rodar o projeto

- O primeiro passo é baixar o projeto, então em uma pasta de sua escolha execute esse comando a seguir.

```shell
$ git clone https: //github.com/Diaszano/Backend_test_Augen.git

```

- Após a ter baixado o projeto devemos entrar na pasta.

``` shell
$ cd Backend_test_Augen
```

- Agora iremos fazer a instalação dos pacotes necessários.

```shell
$ npm install
```

### Antes de executarmos temos que definir algumas coisas, e elas são: 

- Temos que fazer a criação de variáveis de ambiente como no arquivo '.env.example', para isso faremos assim: 

```shell
$ nano .env
``` 

- Após ter entrado no nano iremos definir essas variáveis.

```nano
MYSQL_USER     = "nome do usuário do banco de dados"
MYSQL_PASSWORD = "senha do usuário do banco de dados"
MYSQL_DATABASE = "nome do database do banco de dados"
MYSQL_HOST     = "IP do banco de dados"
MYSQL_PORT     = "Porta do banco de dados"
MYSQL_DIALECT  = "mysql" # Esse tu deixa assim, pois é o banco que nós usamos.
MYSQL_LOGGING  = false # Se quiver ver os loggings do banco coloca true.
JWT_KEY        = "Alguma senha segura"
```

- Depois de termos definido todas essas variáveis nós salvamos o arquivo.
- Para executarmos o programa fazemos: 

```shell
$ npm start
```

# Minhas conclusões: 

## Como foi fazer?

Para mim, fazer este projeto foi um grande acumulo de conhecimentos e desbravamento de novas coisas.
Com esse projeto conheci novas ferramentas as quais eu ainda não havia utilizado e até mesmo desbravar o node.
Por fim, gostei muito de ter realizado e espero que de frutos bons.

## Quais foram as minhas dificuldades?

Creio que as minhas dificuldades foram mais em como utilizar algumas ferramentas e um pouco de sintaxe, fora isso foi uma experiência ótima.

## Pós entrega(Antes do dia 19/09 ás 23:59)

Eu como ainda estava pensando neste projeto vim ver alguns error que eu achei que poderiam ter e os arrumei.

- Arrumei o erro no Delete
- Arrumei a documentação
- Coloquei o JWT
