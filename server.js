const path = require('path');
const db = require("./db")
const formidable = require("formidable");
const fs = require('fs');

const express = require("express")
const server = express()
// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))
// habilitar uso do req.body
server.use(express.json({ limit: "50mb" }));
server.use(express.urlencoded({extended: true}))

// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// configuração do bodyparser
const bodyParser = require("body-parser")
server.use(
    bodyParser.urlencoded({
        extended:true
    })
)



// FUNÇÕES AUXILIARES
function isFileValid(file) {
    const type = file.mimetype.split("/").pop();
    const validTypes = ["jpg", "jpeg", "png", "pdf"];
    if (validTypes.indexOf(type) === -1) {
      return false;
    }
    return true;
};

function fileHandling(req, res) {
    const form = new formidable.IncomingForm();
    const uploadFolder = path.join(__dirname, "public", "files");
    form.multiples = true;
    form.maxFileSize = 50 * 1024 * 1024; // 50MB
    form.uploadDir = uploadFolder;

    form.parse(req, async function (err, fields, files) {
        if (err) {
          console.log("Error parsing the files");
          return res.status(400).json({
            status: "Fail",
            message: "There was an error parsing the files",
            error: err,
          });
        }
        
        // Check if multiple files or a single file
        if (!files.file.length) {
            //Single file
            const file = files.file;
            //console.log(file)

            // checks if the file is valid
            const isValid = isFileValid(file);
            
            if (!isValid) {
                // throes error if file isn't valid
                return res.status(400).json({
                    status: "Fail",
                    message: "The file type is not a valid type",
                });
            }

            // creates a valid name by removing spaces
            const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g, "-"));
            
            try {
                // renames the file in the directory
                fs.renameSync(file.filepath, [uploadFolder, fileName].join("/"));
            } catch (error) {
                console.log(error);
            }

            try {
                // stores the fileName in the database
                const newFile = await File.create({
                    name: `files/${fileName}`,
                });
                return res.status(200).json({
                    status: "success",
                    message: "File created successfully!!",
                });
            } catch (error) {
                res.json({error,});
            }
        } else {
        // Multiple files
        }
    });
}



// CONTROLE DAS ROTAS
server.get("/", function(req, res) {
    return res.render("index.html")
})

server.get("/cadastro", function(req, res) {
    return res.render("cadastro.html")
})

server.get("/esqueceu_senha", function(req, res) {
    return res.render("esqueceu_senha.html")
})

server.post("/", function(req, res) {
    return res.render("index.html")
})

server.post("/principal", function(req, res) {
    // console.log(req.body)
    // console.log(req.body.email)
    // console.log(req.body.senha)

    db.all(`SELECT * FROM arquivos`, function(err, rows){
        if (err) return console.log(err)

        const entradas = []
        for (let row of rows) {
            entradas.push({
                nome_arquivo: row.nome_arquivo,
                ultima_modificacao: row.ultima_modificacao
            })
        }

        return res.render("principal.html", {entradas})
    })
})

server.post("/store", function (req, res) {
    const {dados, fileName} = req.body;

    const query = `
        INSERT INTO arquivos (nome_arquivo, dados, ultima_modificacao)
        VALUES(?, ?, CURRENT_TIMESTAMP)
    `;
    db.run(query, [fileName, dados], (err) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                msg:"Erro no banco de dados!",
                inserido: false,
            })
        }
        res.status(200).send({inserido:true});
    })
});

// Iniciar o servidor
server.listen(3000)