export interface Billboard {
  currency: string
  description: string
  height: number
  images: Image[]
  id: number
  rate: string
  slug: string
  thumbnailId: number
  status: string
  title: string
  type: string
  updateAt: Date
  width: number
  price: number
  billboardLocation: BillboardLocation
  owner: Owner
  bookmarked: boolean
}

export interface BillboardLocation {
  address: string
  lat: number
  lng: number
}

export interface Image {
  id: number
  createdAt: Date
  updateAt: Date
  name: string
  extension: string
  url: string
  mime: string
  size: number
  width: number
  height: number
  provider: string
  providerMetadata: ProviderMetadata
  billboardId: number
}

export interface ProviderMetadata {
  publicId: string
  resourceType: string
}

export interface Owner {
  firstName: string
  lastName: string
  username: string
  userProfile: UserProfile
}

export interface UserProfile {
  profileImage: null
  userContacts: UserContact[]
}

export interface UserContact {
  id: number
  title: string
  contacts: string[]
  type: string
}
