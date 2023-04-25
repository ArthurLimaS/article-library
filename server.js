const express = require("express")
const server = express()

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// configuração do nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Controle das páginas
server.get("/", function(req, res) {
    return res.render("index.html")
})

server.get("/principal", function(req, res) {
    const entradas = [
        {titulo: "Documento genérico 1", ultima_modificacao: "25/04/2023"},
        {titulo: "Documento genérico 2", ultima_modificacao: "17/02/2023"},
        {titulo: "Documento genérico 3", ultima_modificacao: "01/01/2023"},
    ]

    return res.render("principal.html", {entradas})
})

server.get("/cadastro", function(req, res) {
    return res.render("cadastro.html")
})

server.get("/esqueceu_senha", function(req, res) {
    return res.render("esqueceu_senha.html")
})

server.listen(3000)