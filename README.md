# Hackachat

Este é um projeto full stack que utiliza o framework FastAPI no backend e o framework Next.js no frontend. A aplicação é construída com Docker para facilitar o gerenciamento de dependências e a implantação em diferentes ambientes.

O projeto foi desenvolvido e idealizado por um grupo para um Hackathon organizado pela EdTech Quero Educação.

Equipe:

  __Produto__
    - [Alexandra Dias](https://www.linkedin.com/in/dias-alexandra/)
    - [Isabel Mattos](https://www.linkedin.com/in/isabel-csmattos/)

  __Desenvolvedores__
    - [João Vitor Barbosa](https://www.linkedin.com/in/dev-jv-barbosa/)
    - [Lucas Duarte](https://www.linkedin.com/in/dev-lucasduarte/)

## Requisitos
É possível fazer o setup localmente facilmente utilizando Docker.
Certifique-se de ter os seguintes requisitos instalados em sua máquina:

- Docker: [Instalação do Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Instalação do Docker Compose](https://docs.docker.com/compose/install/)

## Configuração

Clone o repositório do projeto:

```
$ git clone https://github.com/lucsduartee/hackachat
$ cd hackachat
```

## Ambiente de Desenvolvimento

Para executar a aplicação localmente em um ambiente de desenvolvimento, siga as etapas abaixo.

### Backend (FastAPI)

1. Navegue até o diretório `hackaback`:

```
$ cd hackaback
```

2. Crie um arquivo `.env` com base no arquivo `.env.example` e defina as variáveis de ambiente necessárias.

3. Inicie o Docker Compose na pasta raíz do projeto para construir e executar o contêiner do backend:

```
$ docker-compose up --build
```

O serviço backend estará disponível em `http://localhost:8000`.

### Frontend (Next.js)

1. Navegue até o diretório `frontend`:

```
$ cd frontend
```

2. Crie um arquivo `.env.local` com base no arquivo `.env.example` e defina as variáveis de ambiente necessárias.

3. Inicie o Docker Compose para construir e executar o contêiner do frontend:

```
$ docker-compose up --build
```

O serviço frontend estará disponível em `http://localhost:3000/chat`.

## Estrutura do projeto
```
├── docker-compose.yml
├── hackaback
│   ├── app
│   │   ├── configs
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── resources
│   │   ├── routers
│   │   ├── schemas
│   │   ├── services
│   │   └── utils
│   ├── Dockerfile
│   ├── requirements.txt
│   └── scripts
│       └── scrapping.py
├── hackafront
│   ├── Dockerfile
│   ├── jsconfig.json
│   ├── next.config.js
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── next.svg
│   │   └── vercel.svg
│   ├── README.md
│   └── src
│       ├── app
│       ├── components
│       └── providers
└── README.md
```
## Contribuição

Se você quiser contribuir com este projeto, sinta-se à vontade para fazer um fork e enviar suas pull requests. Ficarei feliz em revisar e mesclar suas alterações!
