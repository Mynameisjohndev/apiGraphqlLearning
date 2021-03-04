const db = require('../config/db')

// const novoPerfil = {
//     nome: "Cadastradow",
//     rotulo: "Cadastrar",
// }

// db('perfis').insert(novoPerfil)
// .then((res)=>console.log(res))
// .catch((err)=>console.log(err.sqlMessage))
// .finally(()=>db.destroy())

const novoPerfil = {
    nome: 'root' + Math.random(),
    rotulo: 'superUser'
}

db.insert(novoPerfil).into('perfis')
.then((res)=>console.log(res))
.catch((err)=>console.log(err.sqlMessage))
.finally(()=>db.destroy())