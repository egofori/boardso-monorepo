"use client"

import { useAddBillboard } from "@/services/hooks"
import { useEffect, useState } from "react"
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
  UISwitch,
  UITextarea,
  UITooltip,
  UITypography,
  useZodForm,
} from "ui"
import { object, number, string } from "zod"
import AddLocationModal from "../../components/AddLocationModal"
import { ModalHandler } from "@/types/Modal"
import { MarkerF } from "@react-google-maps/api"
import GoogleMapWrapper from "../../components/GoogleMapWrapper"
import {
  billboardTypes,
  currencies,
  periods,
  unitsOfMeasurement,
  useProtectedRoute,
} from "../../../utils"
import { ImageCard } from "@/components/ImageCard"
import { useDisableAddBillboard } from "@/utils/hooks"
import { useRouter } from "next/navigation"
import { UserStatus } from "@/types/User"
import { AxiosError } from "axios"
import { useGetUserStatus } from "@/services/hooks/users"
import InfoPopover from "@/components/InfoPopover"
import { twMerge } from "tailwind-merge"
import AddEditBillboardCard from "@/components/AddEditBillboardCard"

export default function Content() {
  // user must be logged in to access this page
  useProtectedRoute()
  
  return (
    <main className="layout-wrapper">
      <AddEditBillboardCard />
    </main>
  )
}
