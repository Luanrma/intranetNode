async function topic(db, {createTopics}) {
    //console.log(title)
    await db.run(`
        INSERT INTO topics (
            topic_id_user,
            title,
            text,
            answers_count,
            data_create_topic
        ) VALUES (
            ${createTopics.id},
            "${createTopics.title}",
            "${createTopics.text}",
            ${createTopics.answers_count},
            "${createTopics.dataCreate}"
        );
    `);
}

async function answer(db, {createAnswers}) {
            await db.run(`
            INSERT INTO answers (
                answer_id_user,
                fk_id_topic,
                answer,
                likes_count,
                data_create_answer
            ) VALUES (
                ${createAnswers.idUser},
                ${createAnswers.idTopic},
                "${createAnswers.text}",
                ${createAnswers.likes_count},
                "${createAnswers.dataCreate},"
            );
        `);
    }
module.exports = {
    topic,
    answer
}
