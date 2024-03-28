"use client"

import AddEditBillboardCard from "@/components/AddEditBillboardCard"
import { useProtectedRoute } from "@/utils/index"

export default function Content() {
  // user must be logged in to access this page
  useProtectedRoute()
  
  return (
    <main className="layout-wrapper">
      <AddEditBillboardCard />
    </main>
  )
}
