module.exports = async function(db, {data}) {

    // const createUser = await db.run(`
    //     INSERT INTO user (
    //         name,
    //         email,
    //         password,
    //         bio
    //     ) VALUES (
    //         "${data.name}",
    //         "${data.email}",
    //         "${data.password}",
    //         "${data.bio}"
    //     );
    // `);
    console.log(data)
    const insertedTopics = await db.run(`
        INSERT INTO topics (
            fk_id_user,
            title,
            text,
            answer_count,
            data_create
        ) VALUES (
            "${data.fk_id_user}",
            "${data.title}",
            "${data.text}",
            "${data.answer_count}",
            "${data.data_create}",
            "${data.data_update}"
        );
    `);

//     const createAnswer = await db.run(`
//         INSERT INTO answers (
//             fk_id_user,
//             fk_id_topic,
//             title,
//             text,
//             likes_count,
//             data_create,
//             data_update
//         ) VALUES (
//             "${data.fk_id_user}",
//             "${data.fk_id_topic}",
//             "${data.title}",
//             "${data.text}",
//             "${data.likes_count}",
//             "${data.data_create}",
//             "${data.data_update}"
//         );
//     `);
}