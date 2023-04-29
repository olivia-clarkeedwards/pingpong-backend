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

  it('sets ping status to false if setting equals false', async () => {
    const userId = 'google-oauth|123456789101'

    const pingSetStatus = await db.setPing(userId, false)

    expect(typeof pingSetStatus).toBe('object')
    expect(pingSetStatus[0].auth_id).toBe('google-oauth|123456789101')
    expect(Boolean(pingSetStatus[0].ping_active)).toBeFalsy()
  })
})

describe('db.setLocation', () => {
  it('updates user location to specified location', async () => {
    const userId = 'google-oauth|123456789101'

    const pingSetLocation = await db.setLocation(userId, 'Wellington')

    expect(typeof pingSetLocation).toBe('object')
    expect(pingSetLocation[0].auth_id).toBe('google-oauth|123456789101')
    expect(pingSetLocation[0].ping_location).toBe('Wellington')
  })
})

describe('db.nullifyLocation', () => {
  it('updates user location to null', async () => {
    const userId = 'google-oauth|123456789101'

    const pingNullLocation = await db.nullifyLocation(userId)

    expect(typeof pingNullLocation).toBe('object')
    expect(pingNullLocation[0].auth_id).toBe('google-oauth|123456789101')
    expect(pingNullLocation[0].ping_location).toBeFalsy()
  })
})
