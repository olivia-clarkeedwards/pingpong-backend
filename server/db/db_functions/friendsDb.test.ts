import connection from '../connection'
import * as db from './friendsDb'

const testDb = connection

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeAll(async () => {
  await testDb.seed.run()
})

describe('db.getFriendsByUserIdOne', () => {
  it.todo('returns a list of friends where the auth_id matches a user_one_id')
})

describe('db.getFriendsByUserIdTwo', () => {
  it.todo('returns a list of friends where the auth_id matches a user_two_id')
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
