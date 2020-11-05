const Database = require('./db');
const create = require('./create');

Database.then(async (db) => {
    // inserir dados na tabela
    // await create(db, {
    //         name: "Luan Aquino",
    //         email: "luanrma@hotmail.com",
    //         password: "54321",
    //         bio: "Desenvolvedor nodeJS"
    //     });

    // consultar dados da tabela
    const selectedAll = await db.all("SELECT * FROM user")
    console.log(selectedAll)

    // consultar somenete um dado da tabela
    const selected = await db.all('SELECT * FROM user WHERE id_user = "1"')
    console.log(selected)

    // deletar dado da tabela
    //const remove = await db.run('DELETE FROM user WHERE id_user = "1"')
})