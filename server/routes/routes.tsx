import express from 'express'
import { getAllFriends, addFriend } from '../db/dbfuncs'
const router = express.Router()

router.use(express.json())

router.get('/:id', (req, res) => {
  const id = req.params.id
  return getAllFriends(id).then((friends) => res.json(friends))
})

router.post('/', (req, res) => {
  const friend = req.body
  return addFriend(friend).then((addedFriend) => {
    res.json(addedFriend)
  })
})

export default router
