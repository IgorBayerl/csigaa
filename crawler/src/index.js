const crawler = require('./routes')
const verifyLogin = require('./verifyLogin')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const connection = require('./database/connection')
const crypto = require('crypto')
const { response } = require('express')
const fetch = require('node-fetch');

app.use(express.json())

let dataUpdateQueue = []
let dataGetForNewUsersQueue = []
let isRuningQueue = false
let pauseQueue = false


app.get('/access', async (request, response) => {
    const params = request.query

    const userName = params.userName
    const userPassword = params.userPassword

    let studantData
    await connection.select('*').where({userName: userName}).where({userPassword: userPassword}).table('users').first().then(data => {
        // console.log(data)
        studantData = data
    }).catch(err =>{
        console.log(err)
    })
    if(!studantData){
        response.json(`Error: can not get any data from user ${userName} - ${userPassword}. Please verify your credentials!`)
    }else{
        response.json(studantData)
    }

})

app.get('/queue', (request, response) => {
    response.json({
        dataUpdateQueue: dataUpdateQueue,
        newUsersDeque: dataGetForNewUsersQueue
    })
})

app.get('/verify', async(request,response) => {
    console.log('verificando')
    const { userName , userPassword } = request.query
    const loginSuccess = await verifyLogin( userName , userPassword )
    response.json(loginSuccess)
})

// app.post('/create', async (req, res) => {
//     const body = req.body

//     const name = body.userName
//     const password = body.userPassword

//     const response = await checkingIfUserExistsOnDatabase(name)
//     if(response){
//         res.send({response:'Usuario ja existe'});
//     }else{
//         res.send({response:'Usuario novo'});
//     }

//     await requestingCrawlingServiceAndSavingOnDatabase(name, password, response)
// })


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



function sleep(ms) {return new Promise((resolve) => {setTimeout(resolve, ms)})}


async function createArrayQueue(){
    let arrayDatabase
    await connection.select('userName', 'userPassword', 'degree' , 'expoToken', 'notifications').table('users').then(data => {
        arrayDatabase = data
    }).catch(err =>{
        console.log(err)
    })
    arrayDatabase.forEach(user => {
        dataUpdateQueue.push(user)
    });
    if (dataUpdateQueue.length > 0){
        runDeque()
        isRuningQueue = true
    }else{
        isRuningQueue = false
    }
}


app.get('/users', async (request, response) => {
    try {
        response.json(await connection.select('userName', 'degree').table('users'))
    } catch (error) {
        console.log('error: '+ error)
        response.json(`error : ${error}`)
    }

})

app.post('/create_user', async (req, res) => {
    const body = req.body
    let exists
    
    await connection.select('*').where({userName: body.userName}).table('users').then(data => {
        // data.length > 0 ? : 
        if (data.length > 0){
            exists = true;
        }else{
            exists = false;
        }
    }).catch(err =>{
        console.log(err)
    })

    if(exists){
        console.log('[Usuario ja existe]... ')
        res.send({response:'Usuario ja existe'});
        logInUser(body)
    }else{
        console.log('[Usuario novo]... ')
        res.send({response:'Usuario novo'});
        registerNewUser(body)
    }

    
})


async function logInUser(body){
    const { userName, userPassword , degree , expoToken , notifications} = body

    try {
        await connection('users').where({userName: userName}).update({
            userName: userName,
            userPassword: userPassword,
            degree: degree,
            expoToken: expoToken,
            notifications: notifications,
        })
    } catch (error) {
        console.log('error: '+ error)
    }
}

async function registerNewUser(body){
    const { userName, userPassword , degree , expoToken , notifications} = body
    try {
        await connection('users').insert({
            userName: userName,
            userPassword: userPassword,
            degree: degree,
            expoToken: expoToken,
            notifications: notifications,
            info: "{}"
        })
        const user = {
            userName: userName,
            userPassword: userPassword,
            degree: degree,
            expoToken: expoToken,
            notifications: notifications
        }
        dataGetForNewUsersQueue.push(user)
    } catch (error) {
        console.log('error: '+ error)
    }
    if(!isRuningQueue){
        runDeque()
    }
}

async function runDeque(){
    
    while(dataGetForNewUsersQueue.length > 0 || dataUpdateQueue.length > 0 ){
        if (!pauseQueue) {
            isRuningQueue = true
            if(dataGetForNewUsersQueue.length > 0){
                const user = dataGetForNewUsersQueue[0]
                await orquestradorDeCrawler(user)
                dataUpdateQueue.push(user)
                dataGetForNewUsersQueue.shift()
    
            }else if(dataUpdateQueue.length > 0){
                const user = dataUpdateQueue[0]
                await orquestradorDeCrawler(user)
                dataUpdateQueue.push(user)
                dataUpdateQueue.shift()
            }
        }else{
            await sleep(120000)
        }
    }
}

// async function runOnceADay(){

//     if(dataGetForNewUsersQueue.length > 0){
//         const user = dataGetForNewUsersQueue[0]
//         await orquestradorDeCrawler(user)
//         dataUpdateQueue.push(user)
//         dataGetForNewUsersQueue.shift()

//     }else if(dataUpdateQueue.length > 0){
//         dataUpdateQueue.forEach(user => {
//             await orquestradorDeCrawler(user)
//         })
//     }
    
// }

async function orquestradorDeCrawler(user){
    const {userName, userPassword, degree , expoToken, notifications} = user
    console.log(user.userName)
    const userInfo = await crawler.crawler(userName, userPassword)
    

    if(notifications){
        fetchNotification(expoToken, `Hi ${userName} you are in ${degree} degree`)
    }

    try {
        await connection('users').where({userName: userName}).where({userPassword: userPassword}).update({
            info: JSON.stringify(userInfo)
        })
    } catch (error) {
        console.log('error: '+ error)
    }
    


    await sleep(5000)   
}

async function fetchNotification(expoToken , data){
    // const message = {
    //     to: expoToken,
    //     sound: 'default',
    //     title: 'Original Title',
    //     body: data,
    //     data: { data: 'goes here' },
    // };

    // await fetch('https://exp.host/--/api/v2/push/send', {
    //     method: 'POST',
    //     headers: {
    //     Accept: 'application/json',
    //     'Accept-encoding': 'gzip, deflate',
    //     'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(message),
    // });
}

createArrayQueue()

app.listen(port, () => console.log(`CSIGAA api listening on port ${port}!`))