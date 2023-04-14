import express from 'express'
import { User, UserWithFriends } from '../../common/interface'
import { confirmFriendRequest } from '../db/dbFuncs'
import { getFriends, addFriend } from '../db/dbUtils'
const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  const id = 'google-oauth|123456789101'
  return getFriends(id).then((friends: UserWithFriends) => res.json(friends))
})

router.post('/', (req, res) => {
  const friend = req.body
  return addFriend(friend).then((addedFriend) => {
    res.json(addedFriend)
  })
})

router.post('/confirm', (req, res) => {
  const user = req.body.user
  const friend = req.body.friend
  return confirmFriendRequest(user, friend).then((response) => {
    res.json(response)
  })
})

export default router
