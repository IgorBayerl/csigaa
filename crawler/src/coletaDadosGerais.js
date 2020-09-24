
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

        return {
            name : document.querySelector('.usuario span').title.trim(),
            matricula : document.querySelector('#agenda-docente table tbody tr').innerText.trim(),
            unidade : document.querySelector('.unidade').textContent.trim(),
            quantidadeDeMaterias : quantidadeDeMaterias ,
            array_materias: array_materias,
        }
    });

    return dados
}

module.exports = coletaDadosGerais