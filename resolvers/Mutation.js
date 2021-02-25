const { usuarios, proximoID } = require('../data/dataBase')


module.exports = {
    novoUsuario(_, args) {

        const emailExistentes = usuarios
            .some(u => u.email === args.email)

        if (emailExistentes) {
            throw new Error("E-mail já cadastrado :(!")
        }

        const novo = {
            id: proximoID(),
            ...args,
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