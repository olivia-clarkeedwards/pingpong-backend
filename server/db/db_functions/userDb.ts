import connection from '../connection'

import { User, UserData } from '../../../common/interface'

//USERS

export function addUser(userData: UserData, db = connection): Promise<User[]> {
  return db('users').insert({ ...userData }, '*')
}

export function getAllUsers(db = connection): Promise<User[]> {
  return db('users').select('*')
}

export function getUserById(userId: string, db = connection): Promise<User> {
  return db('users').select().where('auth_id', userId).first()
}

export function checkUserIdExists(
  userId: string,
  db = connection
): Promise<boolean> {
  return db('users')
    .select()
    .where('auth_id', userId)
    .first()
    .then((user: User) => (user ? true : false))
}

export function checkUsernameExists(
  username: string,
  db = connection
): Promise<string | boolean> {
  return db('users')
    .select('auth_id')
    .where('username', username)
    .first()
    .then((user: User) => (user ? user.auth_id : false))
}
