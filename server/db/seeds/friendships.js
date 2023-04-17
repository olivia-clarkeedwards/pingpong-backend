/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('friendships').del()
  await knex('friendships').insert([
    {
      id: 1,
      user_one_id: 'google-oauth|123456789101',
      user_two_id: 'google-oauth|123456789102',
      pending: true,
    },
    {
      id: 2,
      user_one_id: 'google-oauth|123456789101',
      user_two_id: 'google-oauth|123456789103',
      pending: false,
    },
    {
      id: 3,
      user_one_id: 'google-oauth|123456789101',
      user_two_id: 'google-oauth|123456789104',
      pending: true,
    },
    {
      id: 4,
      user_one_id: 'google-oauth|123456789102',
      user_two_id: 'google-oauth|123456789103',
      pending: false,
    },
  ])
}
