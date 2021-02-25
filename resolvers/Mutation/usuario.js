const { usuarios, proximoID } = require('../../data/dataBase')


function indiceUsuario(filtro) {
    if (!filtro) return -1;
    const { email, id } = filtro
    if (id) {
        return usuarios
            .findIndex(u => u.id === id)
    } else if (email) {
        return usuarios
            .findIndex(u => u.email === email)
    } else {
        return -1
    }
}

module.exports = {
    novoUsuario(_, { dados }) {

        const emailExistentes = usuarios
            .some(u => u.email === dados.email)

        if (emailExistentes) {
            throw new Error("E-mail já cadastrado :(!")
        }

        const novo = {
            id: proximoID(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }
        usuarios.push(novo);
        return novo;
    },

    excluirUsuario(_, { filtro }) {
        const i = indiceUsuario(filtro);
        if (i < 0) return null
        const excluidos =
            usuarios.splice(i, 1)
        return excluidos ?
            excluidos[0] : null
    },

    editarUsuario(_, { filtro, dados }) {
        const i = indiceUsuario(filtro);
        if (i < 0) return null

        usuarios[i].nome = dados.nome;
        usuarios[i].email = dados.email;
        if (dados.idade) {
            usuarios[i].idade = dados.idade
        }
        return usuarios[i];

        // const i = usuarios
        //     .findIndex(u => u.id === args.id)
        // if (i < 0) return null

        // const usuario = {
        //     ...usuarios[i],
        //     ...args,
        // }

        // usuarios.splice(i, 1, usuario);
    }
}