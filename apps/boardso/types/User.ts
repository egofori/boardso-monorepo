import { UserContact } from "./Billboard"

export interface User {
  email: string
  firstName: string
  lastName: string
  phone: string | null
  username: string
  zipCode: string | null
  createdAt: Date
  userProfile: UserProfile | null
}

export interface UserProfile {
  userContacts: UserContact[]
  about: string | null
  profileImage: string | null
}
