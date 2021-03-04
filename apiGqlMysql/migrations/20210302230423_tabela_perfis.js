
exports.up = function (knex, Promise) {
  return knex.schema.createTable('perfis', table => {
    table.increments('id').primary()
    table.string('nome').notNull().unique()
    table.string('rotulo').notNull()
  }).then(() => {
    return knex('perfis').insert([
      { nome: "comun", rotulo: "comun" },
      { nome: "asdmin", rotulo: "asdmin" },
      { nome: "master", rotulo: "master" },
    ])
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('perfis')
};
