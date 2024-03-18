"use client"

import { useEditBillboard, useGetBillboard, useGetImages } from "@/services/hooks"
import { useEffect, useMemo, useState } from "react"
import { BiPlus } from "react-icons/bi"
import { IoCloseSharp, IoLocationSharp } from "react-icons/io5"
import {
  hasError,
  notification,
  UIButton,
  UICard,
  UIDropdownButton,
  UIFieldError,
  UIForm,
  UIInput,
  UIMenuItem,
  UIMenuList,
  UIOption,
  UISelect,
  UITextarea,
  UITooltip,
  UITypography,
  useZodForm,
} from "ui"
import { object, number, string } from "zod"
import AddLocationModal from "../../../components/AddLocationModal"
import { ModalHandler } from "@/types/Modal"
import { MarkerF } from "@react-google-maps/api"
import GoogleMapWrapper from "../../../components/GoogleMapWrapper"
import {
  billboardTypes,
  currencies,
  periods,
  unitsOfMeasurement,
  useProtectedRoute,
} from "../../../../utils"
import { useParams } from "next/navigation"
import { Billboard } from "@/types/Billboard"
import { PageStatus } from "@/components/PageStatus"
import Loader from "@/components/Loader"
import { ImageCard } from "@/components/ImageCard"
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
