const { insert } = require('../config/db')
const db = require('../config/db')

async function salvarUsuario(nome, email, senha) {
    //BUSCA NO BANDO SE JÁ EXISTEM UM USUARIO COM ESTE EMAIL
    let usuario = await db('usuarios')
    .where({email}).limit(1).first()
    
    //CASO NÃO EXISTA ELE CRIA ESTE USUÁRIO LÁ
    if(!usuario){
        let [id] = await db('usuarios')
        .insert({nome, email, senha})
        usuario = await db('usuarios')
        .where({id}).first()
    //CASO EXISTA, ELE ALTERA OS DADOS PASSADOS NA FUNÇÃO NO USUARIO EXISTENTE    
    }else{
        await db('usuarios').where({id: usuario.id})
        .update({nome, email, senha})
        usuario = { ...usuario, nome, email, senha }
    }
    return usuario
}

async function salvarPerfil(nome, rotulo) {
    let perfil = await db('perfis')
    .where({nome}).first()

    if(!perfil){
        let [id] = await db('perfis')
        .insert({nome, rotulo})
        perfil = await db('perfis')
        .where({id}).first()
    }else{
        await db('perfis').where({id: perfil.id})
        .update({nome, rotulo})
        perfil = {...perfil, nome, rotulo}
    }

    return perfil;

}

async function adicionarPerfis(usuario, ...perfis) {
    const usuario_id = usuario.id
    await db('usuarios_perfis')
    .where({usuario_id})
    .delete()
    for(perfil of perfis){
        const perfil_id = perfil.id
        await db('usuarios_perfis')
        .insert({  usuario_id, perfil_id})
    }
}

async function executar() {
    const usuario = await salvarUsuario('An2a',
        'ana@empresa.com.br', '123456')
    const perfilA = await salvarPerfil('rh', 'Pessoal')
    const perfilB = await salvarPerfil('fin', 'Financeiro')

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    await adicionarPerfis(usuario, perfilA, perfilB)
}

executar()
    .catch(err => console.log(err))
    .finally(() => db.destroy())