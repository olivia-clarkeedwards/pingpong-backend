//REMOVE CONSOLE LOGS AND CHANGE TO THROWING ERRORS!!!!!
//GIVE USERS SOME FEEDBACK WHEN THINGS DON'T WORK

import express from 'express'

import { getUserWithFriendData } from '../db/db_functions/dbUtils'
import { addUser, getUserById } from '../db/db_functions/userDb'
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

export default router
