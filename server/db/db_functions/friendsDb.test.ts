import connection from '../connection'
import * as db from './friendsDb'

const testDb = connection

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

describe('db.getFriendsByUserIdOne', () => {
  it('returns a list of friends where the auth_id matches a user_one_id', async () => {
    const friends = await db.getFriendsByUserIdOne('google-oauth|123456789101')

    expect(friends).toHaveLength(3)

    const firstFriend = friends[0]

    expect(typeof firstFriend).toBe('object')
    expect(firstFriend.id).toBe(2)
    expect(firstFriend.username).toBe('kerrehaynes')
  })
})

describe('db.getFriendsByUserIdTwo', () => {
  it('returns a list of friends where the auth_id matches a user_two_id', async () => {
    const friends = await db.getFriendsByUserIdTwo('google-oauth|123456789103')

    expect(friends).toHaveLength(2)

    const firstFriend = friends[0]

    expect(typeof firstFriend).toBe('object')
    expect(firstFriend.id).toBe(1)
    expect(firstFriend.username).toBe('jackhaynes')
  })
})

describe('db.addFriendRequest', () => {
  it('returns a single friendship object in an array with id of friendship and pending as true', async () => {
    const userId = 'google-oauth|123456789102'
    const friendId = 'google-oauth|123456789104'

    const requestAdded = await db.addFriendRequest(userId, friendId)

    expect(typeof requestAdded).toBe('object')
    expect(requestAdded[0].id).toBe(5)
    expect(Boolean(requestAdded[0].pending)).toBe(true)
  })
})

describe('db.confirmFriendRequest', () => {
  it('returns a single friendship object in an array with id of friendship and pending as false', async () => {
    const userId = 'google-oauth|123456789101'
    const friendId = 'google-oauth|123456789102'

    const requestConfirmed = await db.confirmFriendRequest(userId, friendId)

    expect(typeof requestConfirmed).toBe('object')
    expect(requestConfirmed[0].id).toBe(1)
    expect(Boolean(requestConfirmed[0].pending)).toBe(false)
  })
})

describe('db.deleteFriendRequest', () => {
  it('returns an array containing id of deleted friendship', async () => {
    const userId = 'google-oauth|123456789101'
    const friendId = 'google-oauth|123456789102'

    const requestDeleted = await db.deleteFriendRequest(userId, friendId)

    expect(typeof requestDeleted).toBe('number')
    expect(requestDeleted).toBe(1)
  })
})

describe('db.checkStatus', () => {
  it('returns true if friendship/friend request already exists', async () => {
    const userId = 'google-oauth|123456789101'
    const friendId = 'google-oauth|123456789102'

    const userExists = await db.checkStatus(userId, friendId)

    expect(typeof userExists).toBe('boolean')
    expect(userExists).toBeTruthy()
  })
  it('returns false if friendship does not exist', async () => {
    const userId = 'google-oauth|123456789104'
    const friendId = 'google-oauth|123456789102'

    const userExists = await db.checkStatus(userId, friendId)

    expect(typeof userExists).toBe('boolean')
    expect(userExists).toBeFalsy()
  })
})
