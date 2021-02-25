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
    }
}