const { ApolloServer, gql } = require("apollo-server");

const { importSchema } = require("graphql-import");

const perfis = [
    { id: 1, nome: 'joao' },
    { id: 2, nome: 'leo' }
]

const usuarios = [{
        id: 1,
        nome: "João",
        email: "joao@gmail.com",
        idade: 21,
        perfil_id: 1
    },
    {
        id: 2,
        nome: "João",
        email: "juyo@gmail.com",
        idade: 61,
        perfil_id: 1
    },
    {
        id: 3,
        nome: "João Atônio",
        email: "jo@gmail.com",
        idade: 31,
        perfil_id: 2
    },

]

const resolvers = {


    Usuario: {
        saldo(usuario) {
            return usuario.salario_real
        },

        perfil(usuario) {
            const sels = perfis
                .filter(p => p.id === usuario.perfil_id)
            return sels ? sels[0] : null;
        },
    },

    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco * (1 - produto.desconto);
            } else {
                return produto.preco
            }
        }
    },

    Query: {
        ola() {
            return 'João'
        },
        horaAtual() {
            return new Date
        },
        usuarioLogado() {
            return {
                id: 15,
                nome: "João",
                email: "joao@gmail.com",
                idade: 21,
                salario_real: 5505.90,
                vip: true
            }
        },
        produtoEmDestaque() {
            return {
                nome: "Carne",
                preco: 7.50,
                desconto: 0.15,
            }
        },

        numerosMegaSena() {
            //return [2,4,98,7,8,5,4]
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
        },

        usuarios() {
            return usuarios
        },

        usuario(_, args) {
            const seledcionados = usuarios.filter(u => u.id == args.id)
            return seledcionados ? seledcionados[0] : null
        },

        perfis() {
            return perfis
        },
        perfil(_, { id }) {
            const seledcionados = perfis.filter(p => p.id == id)
            return seledcionados ? seledcionados[0] : null
        }

    }
}

const server = new ApolloServer({
    typeDefs: importSchema('./schema/index.graphql'),
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
    console.log(new Date.prototype.getDate());
})