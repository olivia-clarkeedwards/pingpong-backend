/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('friendships').del()
  await knex('friendships').insert([
    { id: 1, user_one_id: '1', user_two_id: '2', pending: true },
    { id: 2, user_one_id: '1', user_two_id: '3', pending: false },
    { id: 3, user_one_id: '1', user_two_id: '4', pending: true },
    { id: 4, user_one_id: '2', user_two_id: '3', pending: false },
    { id: 5, user_one_id: '2', user_two_id: '4', pending: true },
    { id: 6, user_one_id: '3', user_two_id: '4', pending: false },
    { id: 7, user_one_id: '4', user_two_id: '1', pending: true },
  ])
}
