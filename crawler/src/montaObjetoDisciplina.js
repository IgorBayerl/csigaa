

async function montandoObjetoDisciplina(id , notas , presenca , noticias){
    const info = {
        id: id,
        notas: notas,
        presenca: presenca,
        noticias: noticias
    }
    console.log(JSON.stringify(info))
    return info
}

module.exports = montandoObjetoDisciplina