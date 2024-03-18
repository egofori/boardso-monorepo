"use client"

import { useDeleteBillboard, useRemoveBookmark, useSaveBillboard } from "@/services/hooks"
import { Billboard } from "@/types/Billboard"
import { defaultBillboardThumbnail, periods } from "@/utils/constants"
import Link from "next/link"
import { useMemo, useState } from "react"
import { BsBookmarkDashFill, BsBookmarkHeart } from "react-icons/bs"
import { FaAngleRight } from "react-icons/fa6"
import { RiAccountCircleFill } from "react-icons/ri"
import { MdDelete } from "react-icons/md"
import { AiFillEdit } from "react-icons/ai"
import { IoLocationSharp } from "react-icons/io5"
import { TbDimensions } from "react-icons/tb";
import {
  UIAvatar,
  UICard,
  UICardBody,
  UICardHeader,
  UIIconButton,
  UITooltip,
  UITypography,
  notification,
} from "ui"
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"
import { ModalHandler } from "@/types/Modal"

export default function BillboardCard({
  className,
  data,
  editable,
  refetch,
}: {
  className?: string
  data: Billboard
  editable?: boolean
  refetch?: Function
}) {
  const { isLoading: saveBillboardLoading, trigger: saveBillboard } = useSaveBillboard(data.id)
  const { isLoading: removeBookmarkLoading, trigger: removeBookmark } = useRemoveBookmark(data.id)
  const { isLoading: deleteBillboardLoading, trigger: deleteBillboard } = useDeleteBillboard(
    data.id
  )

  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false)

  const handleDeleteOpen: ModalHandler = () => setConfirmDeleteModalOpen((cur) => !cur)

  // save bookmarked status in the state for easier update
  const [isBookmarked, setIsBookmarked] = useState(data.bookmarked)

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

  const onBookmarkClick = (e: any) => {
    e.preventDefault()
    if (isBookmarked)
      removeBookmark(
        null,
        () => {
          setIsBookmarked(false)
          notification("success", "Bookmark removed successfully")
        },
        () => notification("error", "An error occurred while removing bookmark")
      )
    else
      saveBillboard(
        null,
        () => {
          setIsBookmarked(true)
          notification("success", "Billboard added to bookmarks successfully")
        },
        () => notification("error", "An error occurred while adding billboard to bookmarks")
      )
  }

  const handleDeleteBillboard = () => {
    deleteBillboard(
      null,
      () => {
        setConfirmDeleteModalOpen(false)
        if (refetch) refetch()
        notification("success", "Billboard deleted successfully")
      },
      () =>
        notification(
          "error",
          "An error has occurred while deleting billboard. Please try again later"
        )
    )
  }

  return (
    <>
      <Link href={data.isActive ? `/billboards/${data.slug}` : ""}>
        <UICard
          className={`cursor-pointer border-gray-200 shadow-none min-w-[200px] w-full overflow-clip ${className}`}
        >
          {!data.isActive &&
          <UITooltip content={editable ? "Subscribe to make listing available" : "Listing unavailable"}>
            <div className="h-full w-full bg-white/95 absolute z-[2]" />
          </UITooltip>
          }
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
              <Link href={`/${data.owner.username}`} className="z-[1]">
                <div className="flex flex-row items-center gap-0 bg-slate-700/50 rounded-full px-1 py-1">
                  <div className="flex flex-row items-center gap-1">
                    {data.owner.userProfile?.profileImage ? (
                      <UIAvatar src={data.owner.userProfile.profileImage} alt="avatar" size="xs" />
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
              {editable && (
                <div className="flex flex-col gap-2 absolute right-2 top-2">
                  <UITooltip content="Edit billboard">
                    <Link href={`/edit-billboard/${data.uid}`}>
                      <UIIconButton color="white">
                        <AiFillEdit className="text-[20px]" />
                      </UIIconButton>
                    </Link>
                  </UITooltip>
                  <UITooltip content="Delete billboard">
                    <UIIconButton
                      color="red"
                      variant="filled"
                      onClick={(e: any) => {
                        e.preventDefault()
                        setConfirmDeleteModalOpen(true)
                      }}
                    >
                      <MdDelete className="text-[20px]" />
                    </UIIconButton>
                  </UITooltip>
                </div>
              )}
              <div className="w-full flex flex-row justify-end">
                <UIIconButton
                  color="white"
                  variant="filled"
                  className="rounded-full text-xl text-amber-500"
                  onClick={onBookmarkClick}
                  loading={saveBillboardLoading || removeBookmarkLoading}
                >
                  {isBookmarked ? (
                    <BsBookmarkDashFill />
                  ) : (
                    <BsBookmarkHeart />
                  )}
                </UIIconButton>
              </div>
            </div>
          </UICardHeader>
          <UICardBody className="p-3">
            <div className="flex flex-col items-start justify-start gap-0">
              <UITypography color="blue-gray" className="font-medium">
                {data.title}
              </UITypography>
              <div className="flex flex-row justify-center items-baseline whitespace-nowrap gap-1">
                <UITypography color="teal" className="font-bold text-xl">
                  {data?.price ? `${data?.currency} ${data?.price}` : "GHS --"}
                </UITypography>
                <UITypography variant="small" className="text-slate-500">
                  {data?.price ? periods.filter((period) => data?.rate === period.value)[0]?.label : ""}
                </UITypography>
              </div>
            </div>
            <div className="flex flex-row gap-1 text-slate-500 items-start">
              <IoLocationSharp size="14px" className="flex-shrink-0 mt-[0.5px]" />
              <UITypography className="font-normal text-xs">
                {data.billboardLocation.address}
              </UITypography>
            </div>
            <div className="flex flex-row gap-1 text-slate-500 items-start">
              <TbDimensions size="14px" className="flex-shrink-0 mt-[0.5px]" />
              <UITypography className="font-normal text-xs">
                {`${data.width} ft x ${data.height} ft`}
              </UITypography>
            </div>
          </UICardBody>
        </UICard>
      </Link>
      <DeleteConfirmationModal
        open={confirmDeleteModalOpen}
        handleOpen={handleDeleteOpen}
        onDelete={handleDeleteBillboard}
        loading={deleteBillboardLoading}
      />
    </>
  )
}
