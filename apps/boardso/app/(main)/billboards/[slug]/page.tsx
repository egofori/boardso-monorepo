"use client"

import { BsBookmarkDashFill, BsCircleFill } from "react-icons/bs"
import { IoLocationOutline } from "react-icons/io5"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import {
  UIAvatar,
  UIButton,
  UICard,
  UICarousel,
  UIDropdownButton,
  UIIconButton,
  UIMenuItem,
  UIMenuList,
  UITypography,
} from "ui"
import { useState } from "react"
import Link from "next/link"
import { useGetBillboard } from "@/services/hooks"
import { useParams } from "next/navigation"
import { Billboard } from "@/types/Billboard"
import { RiAccountCircleFill } from "react-icons/ri"
import GoogleMapWrapper from "@/components/GoogleMapWrapper"
import { MarkerF } from "@react-google-maps/api"
import { periods } from "@/utils/constants"
import { PageStatus } from "@/components/PageStatus"

export default function Page() {
  const params = useParams()
  const {
    data: billboard,
    isLoading,
    error,
  }: { data: Billboard | null; [x: string]: any } = useGetBillboard(params["slug"])

  const [selectedContact, setSelectedContact] = useState<number | null>(null)

  return (
    <PageStatus isLoading={isLoading} data={billboard} error={error && "Billboard does not exist"}>
      <main className="layout-wrapper flex lg:flex-row flex-col items-start justify-center gap-4 py-5">
        <UICard className="w-full p-8 bg-white flex flex-col gap-4">
          <div className="flex flex-col">
            <UITypography variant="h4">{billboard?.title}</UITypography>
            <div className="flex flex-row gap-1 text-slate-500">
              <IoLocationOutline className="text-sm" />
              <UITypography className="text-sm">
                {billboard?.billboardLocation?.address}
              </UITypography>
            </div>
          </div>
          <UICarousel
            className="rounded-lg h-[400px]"
            loop
            prevArrow={({ handlePrev, firstIndex }) => (
              <UIIconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-2/4 -translate-y-2/4 left-4 rounded-full !bg-black/50"
                disabled={firstIndex}
              >
                <FaAngleLeft strokeWidth={2} className="w-6 h-6" />
              </UIIconButton>
            )}
            nextArrow={({ handleNext, lastIndex }) => (
              <UIIconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute top-2/4 -translate-y-2/4 !right-4 rounded-full !bg-black/50"
                disabled={lastIndex}
              >
                <FaAngleRight strokeWidth={2} className="w-6 h-6" />
              </UIIconButton>
            )}
          >
            {billboard?.images.map((image) => {
              if (image.id !== billboard.thumbnailId) {
                return (
                  <div
                    key={image.name}
                    className="h-full w-full bg-contain"
                    style={{
                      background: `url('${image.url}') no-repeat`,
                      backgroundSize: "cover",
                      backgroundPosition: "center center",
                    }}
                  />
                )
              }
            })}
          </UICarousel>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <UITypography className="text-md font-bold">Description</UITypography>
              <UITypography>{billboard?.description}</UITypography>
            </div>
            <div>
              <table className="w-full min-w-max table-auto text-center border border-slate-200 [&>thead>tr>th]:bg-transparent [&>thead>tr>th]:p-0 [&>thead>tr>th]:pt-1 [&>thead>tr>th]:border [&>thead>tr>th]:border-slate-200 [&>thead>tr>th]:border-b-0">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <UITypography className="text-xs font-medium text-slate-400">
                        TYPE
                      </UITypography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <UITypography className="text-xs font-medium text-slate-400">
                        DIMENSION
                      </UITypography>
                    </th>
                  </tr>
                </thead>
                <tbody className="[&>tr>td]:border [&>tr>td]:border-slate-200 [&>tr>td]:border-t-0">
                  <tr>
                    <td>
                      <UITypography className="text-sm font-medium text-slate-800">
                        {billboard?.type}
                      </UITypography>
                    </td>
                    <td>
                      <UITypography className="text-sm font-medium text-slate-800">{`${billboard?.width} ft x ${billboard?.height} ft`}</UITypography>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full flex flex-col gap-1">
              <UITypography className="text-md font-bold">Map location</UITypography>
              <GoogleMapWrapper
                center={{
                  lat: billboard?.billboardLocation?.lat || 0,
                  lng: billboard?.billboardLocation?.lng || 0,
                }}
                zoom={18}
                mapContainerClassName="w-full h-64 rounded-lg"
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                }}
              >
                <MarkerF
                  position={{
                    lat: billboard?.billboardLocation?.lat || 0,
                    lng: billboard?.billboardLocation?.lng || 0,
                  }}
                  draggable={false}
                />
              </GoogleMapWrapper>
            </div>
          </div>
          {/* </div> */}
        </UICard>
        <div className="shrink-0 lg:w-96 w-full flex flex-col gap-6">
          <UICard className="flex flex-row justify-center items-baseline whitespace-nowrap gap-1 p-4">
            <UITypography className="text-teal-500 font-bold text-3xl">
              {`${billboard?.currency} ${billboard?.price}`}
            </UITypography>
            <UITypography variant="small" className="font-medium text-slate-800">
              {periods.filter((period) => billboard?.rate === period.value)[0]?.label}
            </UITypography>
          </UICard>
          <UIButton
            color="amber"
            variant="text"
            className="flex flex-row justify-center items-center gap-1 bg-amber-500/10 hover:bg-amber-600/10"
          >
            <BsBookmarkDashFill className="text-xl" />
            {/* <BsBookmarkHeart color="#2dd4bf" className="text-3xl" /> */}
            <UITypography className="font-bold">Bookmark</UITypography>
          </UIButton>
          <div className="flex flex-col gap-1 ">
            <UICard className="p-4 gap-1">
              <UITypography className="text-sm">Owned by</UITypography>
              <div className="flex lg:flex-col flex-row justify-between gap-6 mb-3">
                <Link href={`/${billboard?.owner?.username}`}>
                  <div className="flex flex-row items-center gap-2">
                    {billboard?.owner?.userProfile?.profileImage ? (
                      <UIAvatar
                        src={billboard.owner?.userProfile?.profileImage}
                        alt="avatar"
                        size="md"
                      />
                    ) : (
                      <RiAccountCircleFill className="text-slate-800" size="48px" />
                    )}
                    <UITypography className="text-lg font-medium normal-case text-slate-800 whitespace-nowrap">
                      {billboard?.owner?.firstName} {billboard?.owner?.lastName}
                    </UITypography>
                  </div>
                </Link>
                {(billboard?.owner?.userProfile?.contacts?.length || 0) > 0 && (
                  <UIDropdownButton
                    color="teal"
                    size="lg"
                    className="w-min lg:w-full justify-center"
                    arrow={false}
                    menu={
                      <UIMenuList>
                        {billboard?.owner?.userProfile?.contacts?.map((contact) => (
                          <UIMenuItem
                            key={contact.id}
                            onClick={() => setSelectedContact(contact.id)}
                          >
                            {contact.title}
                          </UIMenuItem>
                        ))}
                      </UIMenuList>
                    }
                  >
                    CONTACT
                  </UIDropdownButton>
                )}
              </div>
              {selectedContact !== null && (
                <div className="flex flex-col gap-4">
                  {billboard?.owner?.userProfile?.contacts
                    ?.filter((contact) => contact.id === selectedContact)[0]
                    ?.contact?.map((contact) => (
                      <Link key={contact} href={contact}>
                        <UIButton
                          variant="text"
                          color="blue-gray"
                          className="normal-case underline w-full text-lg font-normal text-ellipsis"
                        >
                          {contact}
                        </UIButton>
                      </Link>
                    ))}
                </div>
              )}
            </UICard>
          </div>
          <UICard className="flex flex-row justify-center items-center gap-1 p-4 bg-teal-50">
            <BsCircleFill className="text-sm text-teal-500" />
            <UITypography className="font-medium text-base text-slate-800">
              {billboard?.status}
            </UITypography>
          </UICard>
        </div>
      </main>
    </PageStatus>
  )
}
