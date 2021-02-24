const { usuarios, proximoID } = require('../data/dataBase')

module.exports = {
    novoUsuario(_, { nome, email, idade }) {
        const novo = {
            id: proximoID(),
            nome,
            email,
            idade,
            perfil_id: 1,
            status: 'ATIVO'
        }
        usuarios.push(novo);
        return novo;
    }
}