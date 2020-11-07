const Database = require('./database/db');
const utils = require('../src/utils/utils');
const create = require('./database/create')

function home(req, res) {
    return res.render('home.html')
}

async function topic_answers(req, res) {

    const idTopic = req.query.idTopic
    const idUser  = req.query.idUser

    const db = await Database;
    const topicSelected = await db.all(`
        SELECT * FROM topics 
        WHERE id_topic = ${idTopic} 
    `)

    topicSelected.map((topic) => {
        topic = topicSelected; 
     })

    const limitOfPages = 10
    const numberOfPages = 10

    let prepareMoveTo = {
        move: req.query.move,
        page: req.query.pagination,
        numberOfPages
    }

    let moveTo = utils.pagination({prepareMoveTo})
    let offset = moveTo.offset
    let page   = moveTo.page

    const answerSelected = await db.all(`
        SELECT * FROM answers 
        WHERE fk_id_topic = ${idTopic} 
        LIMIT ${limitOfPages}
        OFFSET ${offset}
    `)

    answerSelected.map((answers) => {
        answers = answerSelected; 
    })

    return res.render('topic-answers.html', {topicSelected, answerSelected, idTopic, page})
} 

function topic_create(req, res) {
    return res.render('topic-create.html')
}

async function topics(req, res) {

    const limitOfPages = 5
    const numberOfPages = 5

    let prepareMoveTo = {
        move: req.query.move,
        page: req.query.pagination,
        numberOfPages
    }

    let moveTo = utils.pagination({prepareMoveTo})
    let offset = moveTo.offset
    let page   = moveTo.page

    const db = await Database;
    const selecteds = await db.all(`SELECT * FROM topics LIMIT ${limitOfPages} OFFSET ${offset}`)

    await selecteds.map((selected) => {
       
        selected = selecteds; 
     })

    return res.render(`topics.html`, {selecteds, page})
} 

async function search_topics(req, res) {

    let search = req.query.search

    const db = await Database;
    const selecteds = await db.all(`
        SELECT * FROM topics
        WHERE title
        LIKE '%${search}%'
    `)

    await selecteds.map((selected) => {
       
        selected = selecteds; 
     })

    return res.render(`topics.html`, {selecteds})

}

async function createTopic(req, res) {
    
    const fields = req.body

    //validar se todos os campos estão preenchidos
    if(Object.values(fields).includes('')) {
        return res.send('Todos os campos devem ser preenchidos.')
    }

    try {
        const createTopics = {
            id: 1,
            title: fields.title,
            text: fields.text,
            answers_count: 5,
            dataCreate: utils.getCreateDate()
        }

        //inserir dados na tabela
        const db = await Database
        await create.topic(db, {createTopics});
    
        return res.redirect('/topics')

    } catch (error) {
        console.log(error)
        return res.send('Erro no banco de Dados!')
    }
    
}

async function createAnswer(req, res) {

   // console.log(req.body)
    const fields = req.body

    const idTopic = fields.idTopic
    const idUser = 1

    //validar se todos os campos estão preenchidos
    if(Object.values(fields).includes('')) {
        return res.send('Todos os campos devem ser preenchidos.')
    }

    try {
        const createAnswers = {
            idUser: 1,
            idTopic: fields.idTopic,
            text: fields.answer,
            likes_count: 0,
            dataCreate: utils.getCreateDate()
        }

        //inserir dados na tabela
        const db = await Database
        await create.answer(db, {createAnswers});
        
        return res.redirect(`/topic-answers?idTopic=${idTopic}&idUser=${idUser}`)

    } catch (error) {
        console.log(error)
        return res.send('Erro no banco de Dados!')
    }

}

module.exports = {
    home,
    topic_answers,
    topic_create,
    topics,
    search_topics,
    createTopic,
    createAnswer
}