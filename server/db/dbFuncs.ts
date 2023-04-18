const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

import { User, UserData, Friendships } from '../../common/interface'

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

export function checkUsernameExists(username: string, db = connection): string {
  return db('users')
    .select('auth_id')
    .where('username', username)
    .first()
    .then((user: User) => (user ? user.auth_id : false))
}

export function getUserById(userId: string, db = connection): Promise<User> {
  return db('users').select().where('auth_id', userId).first()
}

export function getFriendsByUserIdOne(
  userId: string,
  db = connection
): Promise<User[]> {
  return db('friendships')
    .select(
      'users.id',
      'auth_id',
      'name',
      'surname',
      'username',
      'birthday',
      'ping_active',
      'ping_location',
      'pending'
    )
    .where('user_one_id', userId)
    .join('users', 'auth_id', 'user_two_id')
}

export function getFriendsByUserIdTwo(
  userId: string,
  db = connection
): Promise<User[]> {
  return db('friendships')
    .select(
      'users.id',
      'auth_id',
      'name',
      'surname',
      'username',
      'birthday',
      'ping_active',
      'ping_location',
      'pending'
    )
    .where('user_two_id', userId)
    .join('users', 'auth_id', 'user_one_id')
}

// Need to set a timeout
export function setPing(
  userId: string,
  status: boolean,
  db = connection
): Promise<User> {
  return db('users')
    .update({ ping_active: status }, '*')
    .where('auth_id', userId)
}

export function nullifyLocation(
  userId: string,
  db = connection
): Promise<User> {
  return db('users')
    .update({ ping_location: null }, '*')
    .where('auth_id', userId)
}

export function setLocation(
  userId: string,
  location = null,
  db = connection
): Promise<User> {
  return db('users')
    .update({ ping_location: location }, '*')
    .where('auth_id', userId)
}

export function addUser(userData: UserData, db = connection): Promise<User[]> {
  return db('users').insert({ ...userData }, '*')
}

export function addFriendRequest(
  userId: string,
  friendId: string,
  db = connection
): Promise<Friendships> {
  // No duplicate checking
  return db('friendships').insert({
    user_one_id: userId,
    pending: true,
    user_two_id: friendId,
  })
}

export function confirmFriendRequest(
  userId: string,
  friendId: string,
  db = connection
): Promise<Friendships> {
  return db('friendships')
    .update({ pending: false })
    .where('user_one_id', userId)
    .andWhere('user_two_id', friendId)
    .orWhere('user_one_id', friendId)
    .andWhere('user_two_id', userId)
}

export function deleteFriendRequest(
  userId: string,
  friendId: string,
  db = connection
): Promise<Friendships> {
  return db('friendships')
    .del()
    .where('user_one_id', userId)
    .andWhere('user_two_id', friendId)
    .orWhere('user_one_id', friendId)
    .andWhere('user_two_id', userId)
}

export function checkStatus(userId: string, friendId: string, db = connection) {
  return db('friendships')
    .where('user_one_id', userId)
    .andWhere('user_two_id', friendId)
    .orWhere('user_one_id', friendId)
    .andWhere('user_two_id', userId)
    .then((friendship: Friendships[]) => Boolean(friendship))
}

export function getAllUsers(db = connection) {
  return db('users').select('*')
}
