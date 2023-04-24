export interface UserData {
  auth_id: string
  name: string
  surname: string
  username: string
  birthday: string
  ping_active: boolean | number
  pending?: boolean | number
}

export interface User extends UserData {
  id: number
}

export interface UserWithFriends extends UserData {
  friend_data: User[]
}

export interface FriendRequest {
  id: number
  pending: boolean
}

export interface Friendship extends FriendRequest {
  user_one_id: string
  user_two_id: string
}
