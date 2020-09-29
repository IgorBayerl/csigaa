

async function coletaPresenca ( page , disciplina ){
    console.log(`[acessando disciplina ${disciplina}]: acessando pagina de presença...`)
    await page.evaluate(() => {
        document.getElementsByClassName('rich-panelbar rich-panelbar-interior ')[1].getElementsByClassName('itemMenu')[0].click()
    });

    await page.waitForNavigation();

    const presencas = await page.evaluate(() => {
        

        const allBottonText = document.querySelector('.botoes-show').innerText.match( /\d+/g )

        const linhas = document.querySelectorAll('.listing tbody tr')

        let arrayDePresencas = []

        for (let i = 0; i < linhas.length; i++) {
            const data = linhas[i].textContent.trim()
            let temp = data
            temp = temp.replace(/([^\d]*)(\d*)([^\w]*)/, '')
            temp = temp.replace(/([^\d]*)(\d*)([^\w]*)/, '')
            temp = temp.replace(/([^\d]*)(\d*)([^\w]*)/, '')
            arrayDePresencas.push({
                dia: linhas[i].querySelector('.first').textContent.trim(),
                situacao: temp
            })
        }
        return{
            quantidadeDeLinhas: linhas.length,
            allBottonText: allBottonText,
            presencasRegistradas : allBottonText[0],
            numAulasComRegistroDeFrequencia : allBottonText[1],
            frequenciaRelacaoAulasRegistradas : allBottonText[2],
            numeroDeAulasDaCH : allBottonText[3],
            presencaDaCH : allBottonText[4],
            arrayDePresencas : arrayDePresencas
        }
    })
    console.log('array de presencas : '+ presencas.arrayDePresencas)
    return presencas
}


module.exports = coletaPresenca