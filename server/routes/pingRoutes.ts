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
