"use client"

import { Billboard } from "@/types/Billboard"
import { defaultBillboardThumbnail } from "@/utils/constants"
import Link from "next/link"
import { useMemo } from "react"
import { BsBookmarkDashFill } from "react-icons/bs"
import { FaAngleRight } from "react-icons/fa6"
import { RiAccountCircleFill } from "react-icons/ri"
import {
  UIAvatar,
  UICard,
  UICardBody,
  UICardFooter,
  UICardHeader,
  UIIconButton,
  UITypography,
} from "ui"

export default function BillboardCard({
  className,
  data,
}: {
  className?: string
  data: Billboard
}) {

  let thumbnail = useMemo(() => {
    // if the image list is empty return the default billboard thumbnail path
    if (data.images.length === 0) return defaultBillboardThumbnail
    // if the thumbnail id exists return the url from the images list
    if (data.thumbnailId) {
      return data.images.filter((image) => image.id === data.thumbnailId)[0]?.url
    }

    // if the thumbnail id is missing return the url of the first image in the image list
    return data.images[0]?.url
  }, [data.images, data.thumbnailId])

  return (
    <Link href={`/billboards/${data.slug}`}>
      <UICard
        className={`cursor-pointer border-gray-200 shadow-none min-w-[200px] w-full ${className}`}
      >
        <UICardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 border-0 rounded-b-none h-[200px]"
        >
          <div
            className={"absolute w-full h-full bg-cover bg-center"}
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
          <div className="w-full h-full flex flex-col justify-between items-start p-2">
            <Link href="#" className="z-[1]">
              <div className="flex flex-row items-center gap-0 bg-slate-700/50 rounded-full px-1 py-1">
                <div className="flex flex-row items-center gap-1">
                  {data.owner.profileImage ? (
                    <UIAvatar src={data.owner.profileImage} alt="avatar" size="xs" />
                  ) : (
                    <RiAccountCircleFill />
                  )}
                  <UITypography className="text-sm font-medium normal-case text-white">
                    {`${data.owner.firstName} ${data.owner.lastName}`}
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
              {data.title}
            </UITypography>
            <UITypography color="teal" className="font-bold text-xl">
              {`GHS ${data.price}`}
            </UITypography>
          </div>
          <div className="flex flex-row gap-1 text-slate-500">
            <UITypography className="font-normal text-xs">
              {data.billboardLocation.address}
            </UITypography>
          </div>
          <div className="flex flex-row gap-1 text-slate-500">
            <UITypography className="font-normal text-xs">
              {`${data.width} ft x ${data.height} ft`}
            </UITypography>
          </div>
        </UICardBody>
        <UICardFooter className="flex justify-end p-3 pt-0">
          {/* <UITypography className="text-xs font-normal italic">Promoted</UITypography> */}
        </UICardFooter>
      </UICard>
    </Link>
  )
}
