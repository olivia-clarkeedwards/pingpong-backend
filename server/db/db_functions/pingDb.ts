import connection from '../connection'

import { User } from '../../../common/interface'

//PING DETAILS
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

export function setLocation(
  userId: string,
  location = null,
  db = connection
): Promise<User> {
  return db('users')
    .update({ ping_location: location }, '*')
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
