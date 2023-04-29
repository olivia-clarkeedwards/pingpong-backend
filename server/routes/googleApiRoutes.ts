import express from 'express'
import request from 'superagent'

const apiKey = process.env.GOOGLE_API_KEY
const router = express.Router()
router.use(express.json())

//gets locations from google places for autofill component
router.get('/place/autocomplete/json?', (req, res) => {
  const { input, country } = req.query
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}&language=en&components=country:${country}`
  return request
    .get(url)
    .then((response) => {
      return res.json(response.body)
    })
    .catch((err) => console.log(err.message))
})

//gets details by place id to select option for autofill component
router.get('/place/details/json?', (req, res) => {
  const { placeid } = req.query
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${apiKey}&language=en`
  return request
    .get(url)
    .then((response) => {
      return res.json(response.body)
    })
    .catch((err) => console.log(err.message))
})

export default router
