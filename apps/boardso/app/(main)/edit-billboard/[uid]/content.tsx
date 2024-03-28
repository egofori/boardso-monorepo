"use client"

import { useGetBillboard } from "@/services/hooks"
import { useProtectedRoute } from "../../../../utils"
import { useParams } from "next/navigation"
import { Billboard } from "@/types/Billboard"
import { PageStatus } from "@/components/PageStatus"
import AddEditBillboardCard from "@/components/AddEditBillboardCard"

export default function Content() {
  // user must be logged in to access this page
  useProtectedRoute()

  const { uid } = useParams<{ uid: string }>()

  const {
    data: billboard,
    isLoading: getBillboardLoading,
    error,
  }: { data: Billboard | null; [x: string]: any } = useGetBillboard({ uid })

  return (
    <PageStatus
      isLoading={getBillboardLoading}
      data={billboard}
      error={(error || !billboard?.isActive) && "Billboard not available"}
    >
      <main className="layout-wrapper">
        <AddEditBillboardCard />
      </main>
    </PageStatus>
  )
}
