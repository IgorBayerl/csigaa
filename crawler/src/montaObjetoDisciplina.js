

async function montandoObjetoDisciplina(id , notas , presenca , noticias){
    console.log['[Montando objeto] ...']
    const info = {
        id: id,
        notas: notas,
        presenca: presenca,
        noticias: noticias
    }
    return info
}

module.exports = montandoObjetoDisciplina