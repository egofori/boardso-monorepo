export interface Transaction {
  id: number
  paidAt: Date
  reference: string
  status: string
  subscription?: Subscription
  plan: Plan
}

export interface Plan {
  amount: number
  id: number
  name: string
  currency: string
  description: string
  period: string
  number: number
  discount: any[]
}

export interface Subscription {
  expiresAt: Date
}

export interface VerifyTransaction {
  status: string
  message: string
}
