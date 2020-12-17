const crawler = require('./routes')
const express = require('express')
const app = express()
const port = 3000
const connection = require('./database/connection')
const crypto = require('crypto')
const { response } = require('express')

app.use(express.json())



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

app.post('/create', async (req, res) => {
    const body = req.body
    // console.log(body)
    // res.send({response:'test ok'});

    const name = body.userName
    const password = body.userPassword

    

    let resposta

    await connection.select('*').where({name: name}).table('studants').then(data => {
        resposta = data
        if (resposta.length != 0){
            console.log('[Atualizando dados do usuario]... ')
            res.send({response:'Usuario ja existe'});
            async function cawlerDB(){
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
            }
            cawlerDB()
            
        }else{
            res.send({response:'[ Criando usuario ] ... '});
            async function cawlerDB(){
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
            }
            cawlerDB()
            
        }
    }).catch(err =>{
        console.log(err)
    })

})


// function antiLogOffHeroku(){
//     var intervalID = window.setInterval(checkWeatherAPI, 240000);

//     function checkWeatherAPI() {
//     console.log("[ Anti logoff ...]");
//     }
// }

// antiLogOffHeroku()

app.listen(port, () => console.log(`CSIGAA api listening on port ${port}!`))



