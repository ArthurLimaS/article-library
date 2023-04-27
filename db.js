const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./dados.db')

db.serialize(function(){
    db.run(`
        CREATE TABLE IF NOT EXISTS arquivos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            arquivo VARBINARY,
            ultima_modificacao DATE
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
        console.log("Dataset criado e populado")
    })
})

module.exports = db