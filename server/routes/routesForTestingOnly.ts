//REMOVE CONSOLE LOGS AND CHANGE TO THROWING ERRORS!!!!!
//GIVE USERS SOME FEEDBACK WHEN THINGS DON'T WORK

import express from 'express'

import { getAllUsers } from '../db/db_functions/userDb'
const router = express.Router()

router.use(express.json())

router.get('/getallusers', (req, res) => {
  return getAllUsers()
    .then((response) => res.json(response))
    .catch((err) => console.log(err.message))
})

export default router
