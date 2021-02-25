const { perfis, proximoID } = require('../../data/dataBase')


function indicePerfil(filtro) {
    if (!filtro) return -1;
    const { id, nome } = filtro
    if (id) {
        return perfis
            .findIndex(u => u.id === id)
    } else if (nome) {
        return perfis
            .findIndex(u => u.nome === nome)
    } else {
        return -1
    }
}

module.exports = {
    novoPerfil(_, { dados }) {
        const nomeExistente = perfis
            .some(u => u.nome === dados.nome)
        if (nomeExistente) {
            throw new Error("Perfil já cadastrado :(!")
        }
        const novo = {
            id: proximoID(),
            ...dados
        }
        perfis.push(novo);
        return novo;
    },

    excluirPerfil(_, { filtro }) {
        const i = indicePerfil(filtro);
        if (i < 0) return null
        const excluidos =
            perfis.splice(i, 1)
        return excluidos ?
            excluidos[0] : null
    },

    editarPerfil(_, { filtro, dados }) {
        const i = indicePerfil(filtro);
        if (i < 0) return null
        perfis[i].nome = dados.nome;
        return perfis[i];
    }
}