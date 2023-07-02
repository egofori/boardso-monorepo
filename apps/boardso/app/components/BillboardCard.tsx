"use client"

import { billboard } from "@/(main)/billboards/[slug]/page"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BiArea, BiSlideshow } from "react-icons/bi"
import { BsBookmarkDashFill } from "react-icons/bs"
import { FaAngleRight } from "react-icons/fa6"
import { IoLocationSharp } from "react-icons/io5"
import {
  UIAvatar,
  UICard,
  UICardBody,
  UICardFooter,
  UICardHeader,
  UIIconButton,
  UITypography,
} from "ui"

export default function BillboardCard({ className }: { className?: string }) {
  const router = useRouter()

  return (
    <UICard
      onClick={(e) => router.push("/billboards")}
      className={`cursor-pointer border-gray-200 shadow-none min-w-[200px] w-full ${className}`}
    >
      <UICardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 border-0 rounded-b-none h-[200px]"
      >
        <div className="absolute w-full h-full bg-cover bg-center bg-[url('/assets/images/erik-mclean-wj_Tjw7oV-g-unsplash.jpg')]" />
        <div className="w-full h-full flex flex-col justify-between items-start p-2">
          <Link href="#" className="z-[1]">
            <div className="flex flex-row items-center gap-0">
              <div className="flex flex-row items-center gap-1">
                <UIAvatar
                  src={billboard.owner.profile_image}
                  alt="avatar"
                  size="xs"
                />
                <UITypography className="text-sm font-medium normal-case text-white">
                  {billboard.owner.full_name}
                </UITypography>
              </div>
              <FaAngleRight className="text-xl font-light text-white" />
            </div>
          </Link>
          <div className="w-full flex flex-row justify-end">
            <UIIconButton color="amber" variant="text" className="rounded-full">
              <BsBookmarkDashFill className="text-xl" />
            </UIIconButton>
          </div>
        </div>
      </UICardHeader>
      <UICardBody className="p-3 pb-0">
        <div className="flex items-center justify-between">
          <UITypography color="blue-gray" className="font-medium">
            Apple AirPods
          </UITypography>
          {/* <div className="p-1 bg-teal-300"> */}
          <UITypography color="teal" className="font-bold text-xl">
            $95.00
          </UITypography>
          {/* </div> */}
        </div>
        <div className="flex flex-row gap-1 text-slate-500">
          <IoLocationSharp />
          <UITypography className="font-normal text-xs">
            Ablekuma, Accra
          </UITypography>
        </div>
        <div className="flex flex-row gap-1 text-slate-500">
          <BiSlideshow />
          <UITypography className="font-normal text-xs">
            Static billboard
          </UITypography>
        </div>
        <div className="flex flex-row gap-1 text-slate-500">
          <BiArea />
          <UITypography className="font-normal text-xs">
            {`${billboard.dimension.width} ${billboard.dimension.unit.abbrev} x ${billboard.dimension.height} ${billboard.dimension.unit.abbrev}`}
          </UITypography>
        </div>
      </UICardBody>
      <UICardFooter className="flex justify-end p-3 pt-0">
        <UITypography className="text-xs font-normal italic">
          Promoted
        </UITypography>
      </UICardFooter>
    </UICard>
  )
}
