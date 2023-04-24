import connection from '../connection'
import * as db from './friendsDb'

const testDb = connection

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeEach(async () => {
  await testDb.seed.run()
})

// describe('db.setPing', () => {
//   it.todo('sets ping status to setting')
// })

// describe('db.nullifyLocation', () => {
//   it.todo('updates user location to null')
// })

// describe('db.setLocation', () => {
//   it.todo('updates user location')
// })

// describe('db.', () => {
//   it.todo('returns a user object by auth_id')
// })

// describe('db.', () => {
//   it.todo('returns a user object by auth_id')
// })

// describe('db.', () => {
//   it.todo('returns a user object by auth_id')
// })

// describe('db.', () => {
//   it.todo('returns a user object by auth_id')
// })

// describe('db.', () => {
//   it.todo('returns a user object by auth_id')
// })
