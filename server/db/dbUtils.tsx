import {
  getUserById,
  getFriendsByUserIdOne,
  getFriendsByUserIdTwo,
} from './dbFuncs'
import { UserWithFriends } from '../../common/interface'

export async function getFriends(userId: string): Promise<UserWithFriends> {
  const user = await getUserById(userId)

  const friendsOne = await getFriendsByUserIdOne(userId)
  const friendsTwo = await getFriendsByUserIdTwo(userId)
  return { ...user, friend_data: friendsOne.concat(friendsTwo) }
}
