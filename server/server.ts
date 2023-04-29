import express from 'express'
import path from 'path'
import routes from '../server/routes/routes'
import placeRoutes from '../server/routes/googleApiRoutes'
import cors from 'cors'

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
server.use('/api/v1/', routes)
server.use('/google/', placeRoutes)

export default server
