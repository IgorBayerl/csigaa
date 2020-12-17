async function montandoObjetoDisciplina(id , notas , presenca , noticias, name){
    console.log['[Montando objeto] ...']
    const info = {
        id: id,
        name: name,
        notas: notas,
        presenca: presenca,
        noticias: noticias
    }
    return info
}

module.exports = montandoObjetoDisciplina