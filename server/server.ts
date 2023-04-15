import express from 'express'
import path from 'path'
import routes from '../server/routes/routes'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))
// Add Access Control Allow Origin headers
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

export default server

server.use('/api/v1/', routes)
