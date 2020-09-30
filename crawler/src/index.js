const crawler = require('./routes')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(express.json())

let resposta = []

app.get('/aluno', async (req, res) => {
    const creators = ['test','test1','test2']
    res.json(resposta)
})

app.post('/aluno', async (req, res) => {
    const body = req.body
    console.log(body)
    res.send('test ok');
    resposta = await crawler.crawler(body.userName, body.userPassword)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


