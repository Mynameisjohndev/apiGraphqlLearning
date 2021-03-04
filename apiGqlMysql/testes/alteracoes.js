const db = require('../config/db')

const usuario = {
    nome: 'teste',
    email: 'joao@teste',
    senha: "testesteste"
}

//count
async function exercicos() {
    
        //count
    const { qtde } = await db('usuarios')
        .count('* as qtde').first()
    if (qtde === 0) {
        await db('usuarios').insert(usuario)
        //console.log("Cadastrado!")
    }

    //consultar
    let { id } = await db('usuarios')
    .select('id').limit(1).first()
    console.log(id)
    //alterar

    await db('usuarios').where({ id })
        .update({
             nome: 'Pedro Garcia', 
             email: 'pedro@gmail.com'
            })
    return await db('usuarios').where({ id })


}

exercicos()
    .then(usuario =>console.log(usuario))
    .catch(() => db.destroy())