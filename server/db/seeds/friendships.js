/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('friendships').del()
  await knex('friendships').insert([
    { user_one_id: '1', user_two_id: '2' },
    { user_one_id: '1', user_two_id: '3' },
    { user_one_id: '1', user_two_id: '4' },
    { user_one_id: '2', user_two_id: '1' },
    { user_one_id: '2', user_two_id: '3' },
    { user_one_id: '2', user_two_id: '4' },
    { user_one_id: '3', user_two_id: '1' },
    { user_one_id: '3', user_two_id: '2' },
    { user_one_id: '3', user_two_id: '4' },
    { user_one_id: '4', user_two_id: '1' },
    { user_one_id: '4', user_two_id: '3' },
  ])
}
