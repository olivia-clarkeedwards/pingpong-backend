import path from 'path'
const envPath = path.join(__dirname, '../.env')
require('dotenv-vault-core').config({ path: envPath })
