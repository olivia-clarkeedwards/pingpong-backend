import express from 'express'
import { User, UserWithFriends } from '../../common/interface'
import { confirmFriendRequest, setPing } from '../db/dbFuncs'
import { getFriends } from '../db/dbUtils'
const router = express.Router()

router.use(express.json())

// Takes a userId and returns that user and an array of friends
router.post('/getfriends', (req, res) => {
  const userId = req.body.userId
  return getFriends(userId).then((friends: UserWithFriends) =>
    res.json(friends)
  )
})

// add user
// router.post('/', (req, res) => {
//   const friend = req.body
//   return addFriend(friend).then((addedFriend) => {
//     res.json(addedFriend)
//   })
// })

// Takes a userId and a friendId and returns 1 if they are made friends by setting pending to false in the db
router.post('/confirm', (req, res) => {
  const user = req.body.userId
  const friend = req.body.friendId
  return confirmFriendRequest(user, friend).then((response) =>
    res.json(response)
  )
})

// set ping
// router.post('/toggleping', (req, res) => {
//   const id = req.body.userId
//   return setPing(id).then((response) => res.json(response))
// })

// return user by auth0
// add friend request

export default router
