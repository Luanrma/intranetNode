// importar dependecias
const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks')
const server = express()

// Configurar nunjucks (template engine)
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
.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

.get('/topics', (req, res) => {
    return res.sendFile(path.join(__dirname, 'views', 'topics.html'))
})

.get('/topic-answers', (req, res) => {
    return res.sendFile(path.join(__dirname, 'views', 'topic-answers.html'))
})

.get('/topic-create', (req, res) => {
    return res.sendFile(path.join(__dirname, 'views', 'topic-create.html'))
})

.post('/topic-create', (req, res) => {
    console.log(req.body)
    const fields = req.body

    //validar se todos os campos estão preenchidos
    if(Object.values(fields).includes('')) {
        return res.send('Todos os campos devem ser preenchidos.')
    }
})

// ligar o servior
server.listen(3000)