import connection from '../connection'
import * as db from './friendsDb'
import { User } from '../../../common/interface'

const testDb = connection

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeAll(async () => {
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
  it.todo('returns an array containing id of pending friendship')
})

describe('db.confirmFriendRequest', () => {
  it.todo('returns an array containing id of confirmed friendship')
})

describe('db.deleteFriendRequest', () => {
  it.todo('returns an array containing id of deleted friendship')
})

describe('db.checkStatus', () => {
  it.todo('returns true if friendship/friend request already exists')
  it.todo('returns false if friendship does not exist')
})
