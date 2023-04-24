import {
  addUser,
  getUserById,
  checkUserIdExists,
  checkUsernameExists,
} from './userDb'
import {
  getFriendsByUserIdOne,
  getFriendsByUserIdTwo,
  addFriendRequest,
  checkStatus,
} from './friendsDb'
import { User, UserWithFriends } from '../../../common/interface'

export async function searchUser(userId: string, searchName: string) {
  const auth_id = await checkUsernameExists(searchName)

  if (auth_id) {
    const friendStatus = await checkStatus(userId, auth_id as string)
    if (friendStatus) {
      throw Error('Friend request already exists')
    } else {
      return await addFriendRequest(userId, auth_id as string)
    }
  } else {
    throw Error('User not found')
  }
}

export async function getUserWithFriendData(
  userData: User
): Promise<UserWithFriends> {
  const userExists = await checkUserIdExists(userData.auth_id)

  if (userExists) {
    return getExistingUserFriends(userData.auth_id)
  } else {
    return addNewUser(userData) //convert to try catch block to catch error from user doesn't exist
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

  let friendsOne = await getFriendsByUserIdOne(userId)
  const friendsTwo = await getFriendsByUserIdTwo(userId)

  // If the user sent the friend request and the friendship is still pending, do not return the friendship
  // Prevents users confirming friend requests they themselves sent
  friendsOne = friendsOne.filter((friend) => friend.pending != true)

  return { ...user, friend_data: friendsOne.concat(friendsTwo) }
}
