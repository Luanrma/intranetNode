// importar dependecias
const express = require('express');
const server = express()

const {
    home,
    topic_answers,
    topic_create,
    search_topics,
    topics,
    createTopic,
    createAnswer
} = require('./pages')

// Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// iniciando o express
server
// utilizar body da requisição
.use(express.urlencoded({ extended: true }))
// utilizando arquivos estáticos
.use(express.static('public'))
// criar rotas
.get('/', home)
.get('/topics', topics)
.get('/topic-answers', topic_answers)
.get('/topic-create', topic_create)
.get('/search-topics', search_topics)
//.post('/createTopic', createTopic)
.post('/topic-create', createTopic)
.post('/createAnswer', createAnswer)

// ligar o servior
.listen(3000)