const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./dados.db')

db.serialize(function(){
    db.run(`
        CREATE TABLE IF NOT EXISTS arquivos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            arquivo VARBINARY
        );
    `)

    // db.all(`SELECT * FROM arquivos`, function(err, rows){
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })
})

module.exports = db