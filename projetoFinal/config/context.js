const jwt = require('jwt-simple')

module.exports = async ({req}) => {

  await require('./simularUsuarioLogado')(req)

  const auth = req.headers.authorization

  const token = auth && auth.substring(7)
  let usuario = null
  let admin = null

  if(token) {
    try {
        let conteudoToken = jwt.decode(token,
            process.env.APP_AUTH_SECRET)
        if(new Date(conteudoToken.exp * 1000) > new Date()) {
            usuario = conteudoToken
        }
    } catch(e) {
        // token inválido
    }
}


  //console.log(auth)
}