const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const connection = require('knex')(config)

import { User } from '../../common/interface'

export function getUserById(userId: string, db = connection) {
  return db('users').select().where('auth_id', userId).first()
}

export function getFriendsByUserIdOne(
  userId: string,
  db = connection
): Promise<User[]> {
  return db('friendships')
    .select('*')
    .where('user_one_id', userId)
    .join('users', 'auth_id', 'user_two_id')
}

export function getFriendsByUserIdTwo(
  userId: string,
  db = connection
): Promise<User[]> {
  return db('friendships')
    .select('*')
    .where('user_two_id', userId)
    .join('users', 'auth_id', 'user_one_id')
}

export function setPing(userId: string, status: boolean, db = connection) {
  return db('users').update({ ping_active: status }).where('auth_id', userId)
}

export function addUser(userData: User, db = connection) {
  return db('users').insert({ ...userData })
}

export function addFriendRequest(
  userId: string,
  friendId: string,
  db = connection
) {
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
) {
  return db('friendships')
    .update({ pending: false }, '*')
    .where(() => {
      this.where('user_one_id', userId).andWhere('user_two_id', friendId)
    })
    .orWhere(() => {
      this.where('user_one_id', friendId).andWhere('user_two_id', userId)
    })
}

// export function setPing(userId: string, db = connection): Promise<number> {
  return db('users').update({
    ping_active: db.raw('NOT ??',  ['ping_active])
  }).returning('ping_active');
}
