async function coletaDadosGerais(page){
    const dados = await page.evaluate(() => {
        const quantidadeDeMaterias = document.getElementsByClassName('descricao').length
        
        let array_materias = []
        for (let i = 0; i < quantidadeDeMaterias; i++) {
            console.log(`- Disciplina ${i}`)
            if (i != 0) {
                array_materias.push(document.querySelector(`#form_acessarTurmaVirtualj_id_${i} a`).text)
            } else {
                array_materias.push(document.querySelector(`#form_acessarTurmaVirtual a`).text)
            }
        }
        const matricula = document.querySelector('#agenda-docente table tbody tr').innerText.match( /\d+/g )
        
        const atividades = listaDeAtividades = document.querySelectorAll('#avaliacao-portal table tbody tr')
        
        let array_atividades = []

        for (let i = 1; i < atividades.length; i++) {
            const atividade = atividades[i]

            let situacaoDaAtividade
            if (atividade.querySelectorAll('td')[0].querySelector('img') == null){
                situacaoDaAtividade = "expirado"
            }else{
                situacaoDaAtividade = String(atividade.querySelectorAll('td')[0].querySelector('img').src)
            }

            let prasoObj = {}
            // let prasoArray = atividade.querySelectorAll('td')[1].textContent.trim().split("								")
            
            prasoObj.data = String(atividade.querySelectorAll('td')[1].textContent.trim().split("								")[0].trim())
            prasoObj.hora = String(atividade.querySelectorAll('td')[1].textContent.trim().split("								")[1].trim())
                
            
            array_atividades.push({
                situacao: situacaoDaAtividade,
                disciplina: atividade.querySelectorAll('td')[2].textContent.trim().split("	")[0].trim(),
                dataDeEntrega: prasoObj.data,
                horaDeEntrega: prasoObj.hora
            })
        }
        console.log('array_atividades --> ')
        console.log(array_atividades)

        return {
            name : document.querySelector('.usuario span').title.trim(),
            matricula : String(matricula[0]),
            unidade : document.querySelector('.unidade').textContent.replace(/(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '').trim(),
            quantidadeDeMaterias : quantidadeDeMaterias ,
            array_materias: array_materias,
            array_atividades: array_atividades,
        }
    });

    return dados
}

module.exports = coletaDadosGerais