//REMOVE CONSOLE LOGS AND CHANGE TO THROWING ERRORS!!!!!
//GIVE USERS SOME FEEDBACK WHEN THINGS DON'T WORK

import express from 'express'

import { getUserWithFriendData, searchUser } from '../db/db_functions/dbUtils'
import {
  confirmFriendRequest,
  deleteFriendRequest,
} from '../db/db_functions/friendsDb'
import {
  nullifyLocation,
  setLocation,
  setPing,
} from '../db/db_functions/pingDb'
import { addUser, getAllUsers, getUserById } from '../db/db_functions/userDb'
const router = express.Router()

router.use(express.json())

//add user if not signed up and return user with friend_data array
router.post('/userwithfriends', (req, res) => {
  const userData = req.body
  return getUserWithFriendData(userData)
    .then((object) => res.json(object))
    .catch((err: Error) => console.log(err.message))
})

// Takes a userId and returns a user object
router.post('/getuser', (req, res) => {
  const userId = req.body.userId
  return getUserById(userId) //
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

// Checks if friend exists by username
//If user exists, and not yet friends:
// Inserts a new entry into the friendships table with pending set to true with the userId for user_one_id and friendId for user_two_id. Returns id of new entry
router.post('/addfriend', (req, res) => {
  const { userId, searchName } = req.body
  return searchUser(userId, searchName)
    .then((response) => {
      res.json(response)
    })
    .catch((err) => res.status(400).send('DB ERROR: ' + err.message))
})

// Takes a userId and a friendId and returns 1 if they are made friends by setting pending to false in the db
router.post('/confirm', (req, res) => {
  const userId = req.body.userId
  const friend = req.body.friendId
  return confirmFriendRequest(userId, friend)
    .then((response) => res.json(response))
    .catch((err: Error) => console.log(err.message))
})

// Takes a userId and a friendId and returns 1 if the friendship is deleted
router.post('/deny', (req, res) => {
  const userId = req.body.userId
  const friend = req.body.friendId
  return deleteFriendRequest(userId, friend)
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

router.get('/getallusers', (req, res) => {
  return getAllUsers()
    .then((response) => res.json(response))
    .catch((err) => console.log(err.message))
})

export default router
