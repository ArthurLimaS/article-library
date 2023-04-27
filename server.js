const db = require("./db")

const express = require("express")
const server = express()
// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))
// habilitar uso do req.body
server.use(express.urlencoded({extended: true}))

// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})



// CONTROLE DAS ROTAS
server.get("/", function(req, res) {
    return res.render("index.html")
})

server.get("/cadastro", function(req, res) {
    return res.render("cadastro.html")
})

server.post("/", function(req, res) {
    return res.render("index.html")
})

server.post("/principal", function(req, res) {
    const entradas = [
        {titulo: "Documento genérico 1", ultima_modificacao: "25/04/2023"},
        {titulo: "Documento genérico 2", ultima_modificacao: "17/02/2023"},
        {titulo: "Documento genérico 3", ultima_modificacao: "01/01/2023"}
    ]

    return res.render("principal.html", {entradas})
})

server.get("/esqueceu_senha", function(req, res) {
    return res.render("esqueceu_senha.html")
})

server.post("/upload-single-file", function(req, res) {
    console.log(req.file)
})

// Iniciar o servidor
server.listen(3000)