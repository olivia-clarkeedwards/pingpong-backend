import connection from './connection'
import * as db from './dbFuncs'

const testDb = connection

beforeAll(async () => {
  await testDb.migrate.latest()
})

beforeAll(async () => {
  await testDb.seed.run()
})
