const { usuarios, proximoID } = require('../data/dataBase')


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

    excluirUsuario(_, { id }) {
        const i = usuarios
            .findIndex(u => u.id === id)
        if (i < 0) return null
        const excluidos =
            usuarios.splice(i, 1)
        return excluidos ?
            excluidos[0] : null
    },

    editarUsuario(_, args) {
        const i = usuarios
            .findIndex(u => u.id === args.id)
        if (i < 0) return null

        const usuario = {
            ...usuarios[i],
            ...args,
        }

        usuarios.splice(i, 1, usuario);
        return usuario;
    }
}