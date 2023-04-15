/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('friendships', (table) => {
    table.increments('id').primary()
    table.string('user_one_id')
    table.string('user_two_id')
    table.boolean('pending')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('friendships')
}
