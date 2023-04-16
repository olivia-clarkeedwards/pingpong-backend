/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      auth_id: 'google-oauth|123456789101',
      name: 'jack',
      surname: 'haynes',
      username: 'jackhaynes',
      birthday: '826545600000',
      ping_active: false,
      ping_location: 'Heyday',
    },
    {
      id: 2,
      auth_id: 'google-oauth|123456789102',
      name: 'kerre ',
      surname: 'haynes',
      username: 'kerrehaynes',
      birthday: '847281600000',
      ping_active: false,
    },
    {
      id: 3,
      auth_id: 'google-oauth|123456789103',
      name: 'matt',
      surname: 'marano',
      username: 'mattmarano',
      birthday: '770904000000',
      ping_active: false,
    },
    {
      id: 4,
      auth_id: 'google-oauth|123456789104',
      name: 'ryan',
      surname: 'kendrick',
      username: 'ryankendrick',
      birthday: '740491200000',
      ping_active: false,
    },
  ])
}
