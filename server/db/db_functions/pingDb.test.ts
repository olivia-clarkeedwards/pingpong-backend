import connection from '../connection'
import * as db from './pingDb'

const testDb = connection

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

describe('db.setPing', () => {
  it('sets ping status to true if setting equals true', async () => {
    const userId = 'google-oauth|123456789101'

    const pingSet = await db.setPing(userId, true)

    expect(typeof pingSet).toBe('object')
    expect(pingSet[0].auth_id).toBe('google-oauth|123456789101')
    expect(Boolean(pingSet[0].ping_active)).toBeTruthy()
  })
})

describe('db.nullifyLocation', () => {
  it.todo('updates user location to null')
})

describe('db.setLocation', () => {
  it.todo('updates user location')
})

describe('db.', () => {
  it.todo('returns a user object by auth_id')
})
