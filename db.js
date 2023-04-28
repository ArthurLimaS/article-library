const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./dados.db')

db.serialize(function(){
    db.run(`
        CREATE TABLE IF NOT EXISTS arquivos(
            id_arquivo INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_arquivo VARCHAR(180) NOT NULL,
            dados LONGBLOB NOT NULL,
            ultima_modificacao DATETIME
        );
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios(
            id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
            primeiro_nome_usuario VARCHAR(20) NOT NULL,
            ultimo_nome_usuario VARCHAR(20) NOT NULL,
            email_usuario VARCHAR(60) NOT NULL,
            senha_usuario VARCHAR(30) NOT NULL
        );
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS grupos(
            id_grupo INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_grupo VARCHAR(90) NOT NULL,
            id_adm INTEGER
        );
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios_arquivos(
            id_usuario INTEGER,
            id_arquivo INTEGER,
            PRIMARY KEY(id_usuario, id_arquivo)
        );
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios_grupos(
            id_usuario INTEGER,
            id_grupo INTEGER,
            PRIMARY KEY(id_usuario, id_grupo)
        );
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS grupos_arquivos(
            id_grupo INTEGER,
            id_arquivo INTEGER,
            PRIMARY KEY(id_grupo, id_arquivo)
        );
    `)
    // // Get current date
    // const date = new Date();
    // let currentDay= String(date.getDate()).padStart(2, '0');
    // let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    // let currentYear = date.getFullYear();
    // let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    // db.run(`INSERT INTO arquivos(file_name, file_blob, date) VALUES(?, ?, ?)`,
    //         [file_name, file_blob, currentDate])

    // const query = `INSERT INTO arquivos(
    //     titulo,
    //     ultima_modificacao,
    //     arquivo
    // ) VALUES (
    //     SELECT 'Essay-BR', '2023-04-25', *
    //     FROM OPENROWSET(BULK './artigos/Essay-BR a Brazilian Corpus of Essays.pdf', SINGLE_BLOB) file;
    // );`

    // db.run(query, function(err) {
    //     console.log("INSERT")
    //     if (err) return console.log(err)
        
    //     console.log(this)
    // })

    db.all(`SELECT * FROM arquivos`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })

    db.all(`SELECT * FROM usuarios`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })

    db.all(`SELECT * FROM grupos`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })

    db.all(`SELECT * FROM usuarios_arquivos`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })

    db.all(`SELECT * FROM usuarios_grupos`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })

    db.all(`SELECT * FROM grupos_arquivos`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })
})

module.exports = db