import {
  addUser,
  getUserById,
  getFriendsByUserIdOne,
  getFriendsByUserIdTwo,
  checkUserExists,
  getUserByUsername,
  addFriendRequest,
  checkStatus,
} from './dbFuncs'
import { User, UserWithFriends } from '../../common/interface'

export async function getUserWithFriendData(
  userData: User
): Promise<UserWithFriends> {
  const userExists = await checkUserExists(userData.auth_id)

  if (userExists) {
    return getExistingUserFriends(userData.auth_id)
  } else {
    return addNewUser(userData)
  }
}

export async function addNewUser(userData: User): Promise<UserWithFriends> {
  const [user] = await addUser(userData)

  return { ...user, friend_data: [] }
}

export async function getExistingUserFriends(
  userId: string
): Promise<UserWithFriends> {
  const user = await getUserById(userId)

  const friendsOne = await getFriendsByUserIdOne(userId)
  const friendsTwo = await getFriendsByUserIdTwo(userId)
  return { ...user, friend_data: friendsOne.concat(friendsTwo) }
}

export async function searchUser(userId: string, searchName: string) {
  const [friend] = await getUserByUsername(searchName)
  console.log(friend)

  if (typeof friend === 'undefined') {
    return 'BAD_SEARCH'
  }

  const friendStatus = await checkStatus(userId, friend.auth_id)

  if (friendStatus.length === 0) {
    return addFriendRequest(userId, friend.auth_id)
  } else {
    return 'PENDING_TRUE'
  }
}
