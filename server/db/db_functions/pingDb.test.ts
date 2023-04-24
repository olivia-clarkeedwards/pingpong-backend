import connection from '../connection'
import * as db from './friendsDb'

const testDb = connection

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

describe('db.setPing', () => {
  it('sets ping status to true if setting equals true', async () => {})
})

describe('db.nullifyLocation', () => {
  it.todo.skip('updates user location to null')
})

describe('db.setLocation', () => {
  it.todo.skip('updates user location')
})

describe('db.', () => {
  it.todo.skip('returns a user object by auth_id')
})

describe('db.', () => {
  it.todo.skip('returns a user object by auth_id')
})

describe('db.', () => {
  it.todo.skip('returns a user object by auth_id')
})

describe('db.', () => {
  it.todo.skip('returns a user object by auth_id')
})

describe('db.', () => {
  it.todo.skip('returns a user object by auth_id')
})
