import connection from '../connection'
import * as db from './pingDb'

const testDb = connection

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeAll(async () => {
  await testDb.seed.run()
})

describe('db.checkUserIdExists', () => {
  it.todo('returns true if the user auth_id exists in the database')
  it.todo('returns false if the user auth_id does not exist in the database')
})

describe('db.checkUsernameExists', () => {
  it.todo('returns the users auth_id if the username exists in the database')
  it.todo('returns false if the user auth_id does not exist in the database')
})

describe('db.getUserById', () => {
  it.todo('returns a user object by auth_id')
})

describe('db.getFriendsByUserIdOne', () => {
  it.todo('returns a list of friends where the auth_id matches a user_one_id')
})

describe('db.getFriendsByUserIdTwo', () => {
  it.todo('returns a list of friends where the auth_id matches a user_two_id')
})

describe('db.setPing', () => {
  it.todo('sets ping status to setting')
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

describe('db.', () => {
  it.todo('returns a user object by auth_id')
})

describe('db.', () => {
  it.todo('returns a user object by auth_id')
})

describe('db.', () => {
  it.todo('returns a user object by auth_id')
})

describe('db.', () => {
  it.todo('returns a user object by auth_id')
})
