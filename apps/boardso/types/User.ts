export interface User {
  email: string
  firstName: string
  lastName: string
  phone: string | null
  username: string | null
  zipCode: string | null
  createdAt: Date
  userProfile: UserProfile | null
}

export interface UserProfile {
  contacts: Contact[]
  about: string | null
  profileImage: string | null
}

export interface Contact {
  contact: string[]
  title: string
  type: string
}
