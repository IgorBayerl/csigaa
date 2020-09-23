

async function coletaNotas ( page , disciplina ){
    console.log(`[acessando disciplina ${disciplina}]: acessando pagina de notas...`)
    await page.evaluate(() => {
        document.getElementsByClassName('rich-panelbar rich-panelbar-interior ')[1].getElementsByClassName('itemMenu')[2].click()
    });

    await page.waitForNavigation();
    const notas = await page.evaluate(() => {
        const linhaCima = document.getElementById('trAval').querySelectorAll('th')
        const comprimentoArray = linhaCima.length
        const media = document.querySelectorAll('.linhaPar td')[comprimentoArray-5].textContent.trim()
        const situacao = document.querySelectorAll('.linhaPar td')[comprimentoArray-1].textContent.trim()

        let notas = []
        for (let i = 0; i < comprimentoArray - 7; i++) {
            const nota = document.querySelectorAll('.linhaPar td')[2 + i].textContent.trim()
            const name = document.getElementById('trAval').querySelectorAll('th')[ 2 + i ].textContent.trim()
            console.log(` Nota ${i} = ${nota}`)
            const object = { name : name , nota : nota }
            if(nota != null){
                notas.push(object)
            }
        }

        return{
            quantidadeDeNotas: comprimentoArray - 7,
            media: media,
            situacao: situacao,
            notas: notas
        }
    })
    
    
    // console.log(`[ Boletim ] - [ Media ] : ${notas.media}`)
    // console.log(`[ Boletim ] - [ Situacao ] : ${notas.situacao}`)
    // console.log(`[ Boletim ] - [ Notas ] : ${JSON.stringify(notas.notas)}`)

    await page.goBack()
    return notas
}


module.exports = coletaNotas