const Database = require('./database/db');
const utils = require('../src/utils/utils');
const create = require('./database/create')

function home(req, res) {
    return res.render('home.html')
}

async function topic_answers(req, res) {

    const idTopic = req.query.idTopic
    const idUser = req.query.idUser

    //console.log(idTopic, idUser)

    const db = await Database;
    const topicSelected = await db.all(`
        SELECT * FROM topics 
        WHERE id_topic = ${idTopic} 
    `)

    //onsole.log(topicSelected)

    topicSelected.map((topic) => {
        //console.log(topic)
        topic = topicSelected; 
     })

    const answerSelected = await db.all(`
        SELECT * FROM answers WHERE fk_id_topic = ${idTopic}
    `)

    //console.log(answerSelected)

    answerSelected.map((answers) => {
        //console.log(answers)
        answers = answerSelected; 
    })

    return res.render('topic-answers.html', {topicSelected, answerSelected, idTopic})
} 

function topic_create(req, res) {
    return res.render('topic-create.html')
}

async function topics(req, res) {

    let offSet = req.query.pagination
    
    if (typeof offSet === 'undefined') {  
        offSet = 0     
    }

    const db = await Database;
    const selecteds = await db.all(`SELECT * FROM topics LIMIT 5 OFFSET ${offSet}`)

    //console.log(selecteds)

    selecteds.map((selected) => {
       // console.log(selected)
        selected = selecteds; 
     })

    return res.render('topics.html', {selecteds})
} 

async function createTopic(req, res) {
    
    const fields = req.body

    //validar se todos os campos estão preenchidos
    if(Object.values(fields).includes('')) {
        return res.send('Todos os campos devem ser preenchidos.')
    }

    try {
        //inserir dados na tabela
        const db = await Database
        const createTopics = {
            id: 1,
            title: fields.inputTopicTitle,
            text: fields.inputTopicText,
            answers_count: 5,
            dataCreate: utils.getCreateDate()
        }

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

    const idTopic = fields.inputIdTopic
    const idUser = 1

    //validar se todos os campos estão preenchidos
    if(Object.values(fields).includes('')) {
        return res.send('Todos os campos devem ser preenchidos.')
    }

    try {
        //inserir dados na tabela
        const db = await Database

        const createAnswers = {
            idUser: 1,
            idTopic: fields.inputIdTopic,
            text: fields.inputAnswer,
            likes_count: 0,
            dataCreate: utils.getCreateDate()
        }

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
    createTopic,
    createAnswer
}