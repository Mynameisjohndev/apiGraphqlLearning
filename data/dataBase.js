const perfis = [
    { id: 1, nome: 'joao' },
    { id: 2, nome: 'leo' }
]

const usuarios = [{
        id: 1,
        nome: "João",
        email: "joao@gmail.com",
        idade: 21,
        perfil_id: 1,
        status: "ATIVO"
    },
    {
        id: 2,
        nome: "João",
        email: "juyo@gmail.com",
        idade: 61,
        perfil_id: 1,
        status: "INATIVO"
    },
    {
        id: 3,
        nome: "João Atônio",
        email: "jo@gmail.com",
        idade: 31,
        perfil_id: 2,
        status: "DESATIVADO"
    },

]

module.exports = { usuarios, perfis }