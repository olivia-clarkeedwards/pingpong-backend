import express from 'express'
import path from 'path'
import cors from 'cors'

import testingRoutes from '../server/routes/routesForTestingOnly'

import friendRoutes from '../server/routes/friendRoutes'
import pingRoutes from '../server/routes/friendRoutes'
import userRoutes from '../server/routes/friendRoutes'

import googlePlacesRoutes from '../server/routes/googleApiRoutes'

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
server.use(cors())

//Routers
server.use('/api/v1/', friendRoutes)
server.use('/api/v1/', pingRoutes)
server.use('/api/v1/', userRoutes)

//to be deleted
server.use('/api/testing/', testingRoutes)

server.use('/google/', googlePlacesRoutes)

export default server
