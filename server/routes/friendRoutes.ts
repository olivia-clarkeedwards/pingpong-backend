//REMOVE CONSOLE LOGS AND CHANGE TO THROWING ERRORS!!!!!
//GIVE USERS SOME FEEDBACK WHEN THINGS DON'T WORK

import express from 'express'

import { searchUser } from '../db/db_functions/dbUtils'
import {
  confirmFriendRequest,
  deleteFriendRequest,
} from '../db/db_functions/friendsDb'

const router = express.Router()

router.use(express.json())

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

export default router
