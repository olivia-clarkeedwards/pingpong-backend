export interface UserData {
  auth_id: string
  name: string
  surname: string
  username: string
  birthday: string
  ping_active: boolean
}

export interface User extends UserData {
  id: number
}

export interface UserWithFriends extends UserData {
  friend_data: User[]
}

export interface Friendships {
  id: number
  user_id_one: string
  user_id_two: string
  pending: boolean
}
