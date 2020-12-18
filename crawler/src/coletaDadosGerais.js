async function coletaDadosGerais(page){
    let dadosGerais = {}
    try {
        dadosGerais = await page.evaluate(() => {
            const quantidadeDeMaterias = document.getElementsByClassName('descricao').length
            const matricula = document.querySelector('#agenda-docente table tbody tr').innerText.match( /\d+/g )
            const name = document.querySelector('.usuario span').title.trim()
            const unidade = document.querySelector('.unidade').textContent.replace(/(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '').trim()
            return {
                name : name,
                matricula : String(matricula[0]),
                unidade : unidade,
                quantidadeDeMaterias : quantidadeDeMaterias ,
            }
        });
    } catch (error) {
        console.log(`[ Coletando dados do header ] : ${error}`)
    }
    

    let array_materias = []
    try {
        array_materias = await page.evaluate((dadosGerais) => {
            let array_materias = []
            for (let i = 0; i < dadosGerais.quantidadeDeMaterias; i++) {
                console.log(`- Disciplina ${i}`)
                if (i != 0) {
                    array_materias.push(document.querySelector(`#form_acessarTurmaVirtualj_id_${i} a`).text)
                } else {
                    array_materias.push(document.querySelector(`#form_acessarTurmaVirtual a`).text)
                }
            }
            return {
                array_materias
            }
        }, dadosGerais);
    } catch (error) {
        console.log(`[ Coletando array de materias ]: ${error}`)
    }

    let array_atividades = []
    try {
        array_atividades = await page.evaluate(() => {
            const atividades = listaDeAtividades = document.querySelectorAll('#avaliacao-portal table tbody tr')
            let array_atividades_temp = []

            for (let i = 1; i < atividades.length; i++) {
                const atividade = atividades[i]

                let situacaoDaAtividade

                if (atividade.querySelectorAll('td')[0].querySelector('img') == null){
                    situacaoDaAtividade = "Expirado"
                }else{
                    // situacaoDaAtividade = String(atividade.querySelectorAll('td')[0].querySelector('img').src)
                    switch (String(atividade.querySelectorAll('td')[0].querySelector('img').src)) {
                        case "/sigaa/img/check.png":
                            situacaoDaAtividade = "checkcircle"
                            break;
                    
                        default:
                            situacaoDaAtividade = "NA"
                            break;
                    }
                    
                }

                let prasoObj = {}
                // let prasoArray = atividade.querySelectorAll('td')[1].textContent.trim().split("								")
                
                prasoObj.data = String(atividade.querySelectorAll('td')[1].textContent.trim().split("								")[0].trim())
                prasoObj.hora = String(atividade.querySelectorAll('td')[1].textContent.trim().split("								")[1].trim())
                
                const descriptionLength = atividade.querySelectorAll('td')[2].textContent.trim().split(":").length
                const description = atividade.querySelectorAll('td')[2].textContent.trim().split(":")[descriptionLength - 1].replace(":","").trim()
                
                array_atividades_temp.push({
                    situacao: situacaoDaAtividade,
                    disciplina: atividade.querySelectorAll('td')[2].textContent.trim().split("	")[0].trim(),
                    dataDeEntrega: prasoObj.data,
                    horaDeEntrega: prasoObj.hora,
                    index: i,
                    activated: false,
                    description: description
                })
            }
            return {
                array_atividades_temp
            }
        });
    } catch (error) {
        console.log(`[ Coletando array de atividades ]: ${error}`)
    }
    // console.log(array_atividades)


    
    const dados = {
        name : dadosGerais.name,
        matricula : dadosGerais.matricula,
        unidade: dadosGerais.unidade,
        quantidadeDeMaterias: dadosGerais.quantidadeDeMaterias,
        array_materias: array_materias,
        array_atividades: array_atividades.array_atividades_temp
    }

    return dados
}

module.exports = coletaDadosGerais