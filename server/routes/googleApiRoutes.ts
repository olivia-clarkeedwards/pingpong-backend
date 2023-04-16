import express from 'express'
import request from 'superagent'

const GOOGLE_API_KEY = 'AIzaSyBxY5MSXvEFGxD-HBKHVdCl1Xb4x8HABY0'

const router = express.Router()
router.use(express.json())

router.get('/place/autocomplete/json?', (req, res) => {
  const { input } = req.query
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_API_KEY}&language=en`
  return request
    .get(url)
    .then((response) => {
      return res.json(response.body)
    })
    .catch((err) => console.log(err.message))
})

export default router
