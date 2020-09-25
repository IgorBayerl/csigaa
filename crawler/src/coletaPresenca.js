

async function coletaPresenca ( page , disciplina ){
    console.log(`[acessando disciplina ${disciplina}]: acessando pagina de presença...`)
    await page.evaluate(() => {
        document.getElementsByClassName('rich-panelbar rich-panelbar-interior ')[1].getElementsByClassName('itemMenu')[0].click()
    });

    await page.waitForNavigation();

    const presencas = await page.evaluate(() => {
        

        const linhasPar = document.getElementsByClassName('linhaPar').length
        const linhasImpar = document.getElementsByClassName('linhaImpar').length
        const allBottonText = document.querySelector('.botoes-show').innerText.match( /\d+/g )

        return{
            quantidadeDeLinhas: linhasImpar + linhasPar,
            allBottonText: allBottonText,
            presencasRegistradas : allBottonText[0],
            numAulasComRegistroDeFrequencia : allBottonText[1],
            frequenciaRelacaoAulasRegistradas : allBottonText[2],
            numeroDeAulasDaCH : allBottonText[3],
            presencaDaCH : allBottonText[4],
        }
    })

    return presencas
}


module.exports = coletaPresenca