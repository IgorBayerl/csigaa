const crawler = require('./routes')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connection = require('./database/connection')
const crypto = require('crypto')
const { response } = require('express')

app.use(express.json())

let dataUpdateQueue = []

app.post('/access', async (req, res) => {

    const {userName , userPassword} = req.body
    let studantData
    await connection.select('*').where({name: userName}).where({password: userPassword}).table('studants').first().then(data => {
        // console.log(data)
        studantData = data
    }).catch(err =>{
        console.log(err)
    })
    res.json(studantData)
})

app.get('/access', async (request, response) => {
    const params = request.query

    const userName = params.userName
    const userPassword = params.userPassword

    let studantData
    await connection.select('*').where({name: userName}).where({password: userPassword}).table('studants').first().then(data => {
        // console.log(data)
        studantData = data
    }).catch(err =>{
        console.log(err)
    })
    if(!studantData){
        requestingCrawlingServiceAndSavingOnDatabase(userName, userPassword, false)
        response.json('newUser')
    }else{
        response.json(studantData)
    }

})

app.get('/fila', (request, response) => {

    response.json({updateInfoQeue: dataUpdateQueue})
    
})

app.post('/create', async (req, res) => {
    const body = req.body

    const name = body.userName
    const password = body.userPassword

    const response = await checkingIfUserExistsOnDatabase(name)
    if(response){
        res.send({response:'Usuario ja existe'});
    }else{
        res.send({response:'Usuario novo'});
    }

    await requestingCrawlingServiceAndSavingOnDatabase(name, password, response)
})

async function checkingIfUserExistsOnDatabase(name){

    let resposta

    await connection.select('*').where({name: name}).table('studants').then(data => {
        resposta = data
        if (resposta.length != 0){
            console.log('[Usuario ja existe]... ')
            return(true);
        }else{
            console.log('[Usuario novo]... ')
            return(false);
        }
    }).catch(err =>{
        console.log(err)
    })
}

async function requestingCrawlingServiceAndSavingOnDatabase(name, password, exists){
    if(exists){
        console.log('[Usuario ja existe - Atualizando dados]... ')
        const info = JSON.stringify(await crawler.crawler(name, password))
        const accessKey = crypto.randomBytes(6).toString('HEX')
        try {
            console.log('[ updating data ]...')
            await connection('studants').where({name: name}).update({
                accessKey,
                name,
                password,
                info,
            })
        } catch (error) {
            console.log('error: '+ error)
        }
    }else{
        console.log('[Usuario novo - Coletando dados]... ')
        const info = JSON.stringify(await crawler.crawler(name, password))
        const accessKey = crypto.randomBytes(6).toString('HEX')
        try {
            await connection('studants').insert({
                accessKey,
                name,
                password,
                info,
            })
        } catch (error) {
            console.log('error: '+ error)
        }
        addFimDaFila({name: name, password: password})
    }
    
    
}

function addFimDaFila(user){
    
    if(dataUpdateQueue.length == 0){
        dataUpdateQueue.push(user)
        startingRequestsQueue()
    }else{
        dataUpdateQueue.push(user)
    }
    
    console.log(dataUpdateQueue)
}

async function startingRequestsQueue(){
    while (dataUpdateQueue.length > 0) {
        const usuario = dataUpdateQueue[0]
        await sleep(1000)
        await requestingCrawlingServiceAndSavingOnDatabase(usuario.name, usuario.password , true)
        console.log(usuario)
        dataUpdateQueue.push(usuario)
        dataUpdateQueue.shift()
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


async function createArrayQueue(){
    let arrayDatabase
    await connection.select('name', 'password').table('studants').then(data => {
        arrayDatabase = data
    }).catch(err =>{
        console.log(err)
    })
    console.log(arrayDatabase)
    arrayDatabase.forEach(user => {
        addFimDaFila(user)
    });
    startingRequestsQueue()
}
createArrayQueue()

app.listen(port, () => console.log(`CSIGAA api listening on port ${port}!`))