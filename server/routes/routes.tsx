import express from 'express'
import {
  addFriendRequest,
  addUser,
  confirmFriendRequest,
  getUserById,
  setPing,
} from '../db/dbFuncs'
import { getFriends } from '../db/dbUtils'
const router = express.Router()

router.use(express.json())

// Takes a userId and returns that user object and an array of friends
router.post('/getfriends', (req, res) => {
  const userId = req.body.userId
  return getFriends(userId)
    .then((friends) => res.json(friends))
    .catch((err: Error) => console.log(err.message))
})

// Takes a userId and returns a user object
router.post('/getuser', (req, res) => {
  const userId = req.body.userId
  return getUserById(userId)
    .then((user) => res.json(user))
    .catch((err: Error) => console.log(err.message))
})

// add user
router.post('/add', (req, res) => {
  const userData = req.body
  return addUser(userData)
    .then((addedUser) => res.json(addedUser))
    .catch((err: Error) => console.log(err.message))
})

// Inserts a new entry into the friendships table with pending set to true with the userId for user_one_id and friendId for user_two_id. Returns id of new entry
router.post('/addfriend', (req, res) => {
  const userId = req.body.userId
  const friendId = req.body.friendId
  return addFriendRequest(userId, friendId)
    .then((response) => res.json(response))
    .catch((err: Error) => console.log(err.message))
})

// Takes a userId and a friendId and returns 1 if they are made friends by setting pending to false in the db
router.post('/confirm', (req, res) => {
  const user = req.body.userId
  const friend = req.body.friendId
  return confirmFriendRequest(user, friend)
    .then((response) => res.json(response))
    .catch((err: Error) => console.log(err.message))
})

// Takes a userId and a setting boolean and sets that users ping_active to the value of setting
router.post('/setping', (req, res) => {
  const id = req.body.userId
  const setting = req.body.setting
  return setPing(id, setting)
    .then((response) => res.json(response))
    .catch((err: Error) => console.log(err.message))
})

export default router
