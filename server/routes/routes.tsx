import express from 'express'
import {
  addFriendRequest,
  addUser,
  confirmFriendRequest,
  getUserById,
  nullifyLocation,
  setLocation,
  setPing,
} from '../db/dbFuncs'
import { getFriends, checkDbForUser } from '../db/dbUtils'
const router = express.Router()

router.use(express.json())

// TEST USER EXISTS ROUTE
router.post('/dothey', (req, res) => {
  const userId = req.body
  return checkDbForUser(userId)
    .then((object) => res.json(object))
    .catch((err: Error) => console.log(err.message))
})

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
  const userId = req.body.userId
  const friend = req.body.friendId
  return confirmFriendRequest(userId, friend)
    .then((response) => res.json(response))
    .catch((err: Error) => console.log(err.message))
})

// Takes a userId and a setting boolean and sets that users ping_active to the value of setting
// If ping is false sets user's ping_location to null, else add location data to db
// Returns the result of setPing, NOT the result of the entire promise chain - it works, just trust me
router.post('/setping', (req, res) => {
  const userId = req.body.userId
  const setting = req.body.setting
  const location = req.body?.location
  return setPing(userId, setting)
    .then(() => {
      if (setting === false) {
        return nullifyLocation(userId)
      }
      return setLocation(userId, location)
    })
    .catch((err: Error) => console.log(err.message))
    .then((response) => res.json(response))
    .catch((err: Error) => console.log(err.message))
})

export default router
