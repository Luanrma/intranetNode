const Database = require('sqlite-async');

function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS user (
            id_user INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS topics (
            id_topic INTEGER PRIMARY KEY AUTOINCREMENT,
            topic_id_user INTEGER,
            title TEXT,
            text TEXT,
            answers_count INTEGER,
            data_create_topic TEXT
        );

        CREATE TABLE IF NOT EXISTS answers (
            id_answer INTEGER PRIMARY KEY AUTOINCREMENT,
            answer_id_user INTEGER,
            fk_id_topic INTEGER,
            answer TEXT,
            likes_count INTEGER,
            data_create_answer TEXT
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute)