# Projeto Node

- Iniciar um projeto node:

```bash
yarn init -y
```

- Será criado um arquivo `package.json`

- Criamos uma pasta `src` onde ficarão os arquivos do projeto

- Adicionamos o framework:

```bash
yarn add express
```

- conseguimos adcionar rotas e middlewares

- Um exemplo de como utilizar o express está em `src/index.js`

- Para executar o projeto execute no terminal o seguinte comando:

```bash
node src/index.js
```

---

## Nodemon

- para monitorar alterações utilizamos o `nodemon`:

```bash
yarn add nodemon -D
```

- Criamos no arquivo `package.json` o seguinte:

```json
"scripts": {
  "dev": "nodemon src/index.js"
},
```

- Ou

- Podemos alterar a chave: `main` e adicionar o arquivo principal da aplicação no caso o `src/index.js` e no `"dev"` adicionar apenas: `nodemon`

---

## Metodos HTTP

- GET: Quando queremos buscar alguma informação do back-end
- POST: Quando queremos criar algo no back-end
- PUT/PATH: Quando queremos alterar algo no back-end
- DELETE: Quando queremos remover algo no back-end


---

## Instalar tema dracula no insomnia:

- Seguir as instruções de [draculatheme](https://draculatheme.com/insomnia/)

---

## Tipos de parametros

- Query Params: Filtros e paginação
  `req.query`
- Route Params: Identificar recursos (Atualizar/Deletar)
  `req.params`
- Request Body: Conteudo, o corpo da requisição que pode ser por exemplo um JSON, ou um form data por exemplo
  `req.body`
  **Detalhe para obter formato JSON no express é necessário adicionar o seguinte antes das rotas: `app.use(express.json());`**


---

## Adicionar um id para um array static

- Instale a lib:

```bash
yarn add uuidv4
```

- Para utilizar:

```js
const { uuid } = require('uuidv4');

// ...

uuid();

```

---

## Exemplo de filtro com js

```js
const projects = [];

app.get('/projects', (req, res) => {

  const { title } = req.query;

  const result = title ? projects.filter((p) => p.title.includes(title)) : projects;

  return res.json(result);
});
```

---

## Middleware (Interceptador)

- Intercepta as requisições, pode interromper, ou mudar dados

- O middleware é uma function que recebe 3 parametros:

- req: Requisição
- res: Resposta para requisição
- next: caso chamado dentro do middleware dar continuidade a requisição

- Forma de aplicar o middleware:

- Na chamada da requisição
```js
app.put('/projects/:id', validateProjectId, (req, res) => {
  //...
}
```
- Para varias rotas de uma vez só para rotas abaixo dele:

```js
app.use(logRequests);
// ...
// rotas...
```

- Para rotas especificas:

```js
app.use('/rota/:id', middleware1);
```