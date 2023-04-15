export interface UserData {
  auth_id: string
  name: string
  surname: string
  username: string
  birthday: string
  ping_active: boolean | number
}

export interface User extends UserData {
  id: number
}

export interface UserWithFriends extends UserData {
  friend_data: (User | Friendships)[]
}

export interface Friendships {
  id: number
  user_one_id: string
  user_two_id: string
  pending: boolean
}
