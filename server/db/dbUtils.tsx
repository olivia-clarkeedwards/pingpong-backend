import {
  addUser,
  getUserById,
  getFriendsByUserIdOne,
  getFriendsByUserIdTwo,
  checkUserExists,
} from './dbFuncs'
import { User, UserWithFriends } from '../../common/interface'

export async function checkDbForUser(userData: User): Promise<UserWithFriends> {
  const userExists = await checkUserExists(userData.auth_id)

  if (userExists) {
    return getFriends(userData.auth_id)
  } else {
    return addNewUser(userData)
  }
}

export async function addNewUser(userData: User): Promise<UserWithFriends> {
  const user = await addUser(userData)

  return { ...user, friend_data: [] as User[] }
}

export async function getFriends(userId: string): Promise<UserWithFriends> {
  const user = await getUserById(userId)

  const friendsOne = await getFriendsByUserIdOne(userId)
  const friendsTwo = await getFriendsByUserIdTwo(userId)
  return { ...user, friend_data: friendsOne.concat(friendsTwo) }
}
