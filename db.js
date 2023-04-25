const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./dados.db')

db.serialize(function(){
    db.run(`
        CREATE TABLE IF NOT EXISTS arquivos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            ultima_modificacao DATE,
            arquivo VARBINARY
        );
    `)

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
})

module.exports = db