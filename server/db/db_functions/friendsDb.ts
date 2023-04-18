import connection from '../connection'

import { User, Friendships } from '../../../common/interface'

//FRIENDS

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

//FRIEND REQUESTS

export function addFriendRequest(
  userId: string,
  friendId: string,
  db = connection
): Promise<number> {
  // No duplicate checking
  return db('friendships')
    .insert({
      user_one_id: userId,
      pending: true,
      user_two_id: friendId,
    })
    .select('id')
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

export function checkStatus(
  userId: string,
  friendId: string,
  db = connection
): Promise<boolean> {
  return db('friendships')
    .where('user_one_id', userId)
    .andWhere('user_two_id', friendId)
    .orWhere('user_one_id', friendId)
    .andWhere('user_two_id', userId)
    .then((friendship: Friendships[]) =>
      friendship.length !== 0 ? true : false
    )
}
