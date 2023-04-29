import connection from '../connection'

import { User } from '../../../common/interface'

//PING

export function setPing(
  userId: string,
  setting: boolean,
  db = connection
): Promise<User[]> {
  return db('users')
    .update({ ping_active: setting })
    .where('auth_id', userId)
    .returning(['auth_id', 'ping_active'])
}

export function setLocation(
  userId: string,
  location: string,
  db = connection
): Promise<User[]> {
  return db('users')
    .update({ ping_location: location }, '*')
    .where('auth_id', userId)
    .returning(['*'])
}

export function nullifyLocation(
  userId: string,
  db = connection
): Promise<User[]> {
  return db('users')
    .update({ ping_location: null }, '*')
    .where('auth_id', userId)
    .returning(['*'])
}
