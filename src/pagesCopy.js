const Database = require('./database/db');
const utils = require('../src/utils/utils')

    function home(req, res) {
        return res.render('home.html')
    }
    
    function topic_answers(req, res) {
        return res.render('topic-answers.html')
    }
    
    function topic_create(req, res) {
        return res.render('topic-create.html')
    }
    
    function topics(req, res) {
        return res.render('topics.html')
    } 

    async function createTopic(req, res) {
        
        console.log(req.body)
        const fields = req.body
        
        //validar se todos os campos estão preenchidos
        if(Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos.')
        }

        try {
            //inserir dados na tabela
            const db = await Database

            const create = require('./database/create')
            await create.insertedTopics(db, {
                topic_id_user: 1, 
                title: fields.inputTopicTitle,
                text: fields.inputTopicText,
                answer_count: 5,
                data_create_topic: utils.getCreateDate()
            });

            return res.redirect('/topics')

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
    createTopic
}