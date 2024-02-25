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
  profileImage: { url: string | null } | null
}

export interface UserStatus {
  billboardCount: number
  maxFreeListings: number
  isSubscriptionActive: boolean
  subscriptionExpiresAt: Date
  subscribedAt: Date
  currentPlan: string
  daysLeft: number
}
