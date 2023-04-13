import express from 'express'
import path from 'path'
import routes from '../server/routes/routes'

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

export default server

server.use('/api/v1/routes', routes)
