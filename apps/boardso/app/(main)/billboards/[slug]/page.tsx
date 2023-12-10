"use client"

import { BsBookmarkDashFill, BsBookmarkHeart, BsCircleFill } from "react-icons/bs"
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
  notification,
} from "ui"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  useDeleteBillboard,
  useGetBillboard,
  useRemoveBookmark,
  useSaveBillboard,
} from "@/services/hooks"
import { useParams, useRouter } from "next/navigation"
import { Billboard, UserContact } from "@/types/Billboard"
import { RiAccountCircleFill } from "react-icons/ri"
import GoogleMapWrapper from "@/components/GoogleMapWrapper"
import { MarkerF } from "@react-google-maps/api"
import { defaultBillboardThumbnail, periods } from "@/utils/constants"
import { PageStatus } from "@/components/PageStatus"
import { stringToHref } from "@/utils/index"
import { useGetUserProfile } from "@/services/hooks/users"
import { User } from "@/types/User"
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal"
import { ModalHandler } from "@/types/Modal"
import { MdOutlineMoreVert } from "react-icons/md"

export default function Page() {
  const router = useRouter()

  const { slug } = useParams()
  const {
    data: billboard,
    isLoading,
    error,
  }: { data: Billboard | null; [x: string]: any } = useGetBillboard({ slug })
  const { isLoading: saveBillboardLoading, trigger: saveBillboard } = useSaveBillboard(
    billboard?.id
  )
  const { isLoading: removeBookmarkLoading, trigger: removeBookmark } = useRemoveBookmark(
    billboard?.id
  )
  const { isLoading: deleteBillboardLoading, trigger: deleteBillboard } = useDeleteBillboard(
    billboard?.id
  )
  // get current user
  const { data: currentUser }: { data: User | null; [x: string]: any } = useGetUserProfile()

  // save bookmarked status in the state for easier update
  const [isBookmarked, setIsBookmarked] = useState(false)

  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false)

  const handleDeleteOpen: ModalHandler = () => setConfirmDeleteModalOpen((cur) => !cur)

  useEffect(() => {
    setIsBookmarked(billboard?.bookmarked || false)
  }, [billboard])

  const [selectedContact, setSelectedContact] = useState<UserContact | null>(null)

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
        router.push(`/${currentUser?.username}`)
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
    <PageStatus isLoading={isLoading} data={billboard} error={error && "Billboard does not exist"}>
      <main className="layout-wrapper flex lg:flex-row flex-col items-start justify-center gap-4 py-5">
        <UICard className="w-full p-5 sm:p-10 bg-white flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-between">
            <div className="flex flex-col w-max">
              <UITypography
                variant="h4"
                className="text-xl sm:text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap"
              >
                {billboard?.title}
              </UITypography>
              <div className="flex flex-row gap-1 text-slate-500">
                <IoLocationOutline className="text-xs sm:text-sm" />
                <UITypography className="text-xs sm:text-sm">
                  {billboard?.billboardLocation?.address}
                </UITypography>
              </div>
            </div>
            {billboard?.owner?.username === currentUser?.username && (
              <UIDropdownButton
                icon={<MdOutlineMoreVert />}
                color="gray"
                variant="text"
                className="w-9 h-9 p-0 rounded-full text-slate-900 text-2xl [&>span]:mr-0"
                arrow={false}
                menu={
                  <UIMenuList>
                    <Link href={`/edit-billboard/${billboard?.uid}`}>
                      <UIMenuItem>Edit</UIMenuItem>
                    </Link>
                    <UIMenuItem
                      className="text-red-600"
                      onClick={() => setConfirmDeleteModalOpen(true)}
                    >
                      Delete
                    </UIMenuItem>
                  </UIMenuList>
                }
              />
            )}
          </div>
          {billboard?.images?.length !== 0 ? (
            <UICarousel
              className="rounded-lg h-64 sm:h-[400px]"
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
              {billboard?.images?.map((image) => {
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
          ) : (
            <div
              className="rounded-lg h-64 sm:h-[400px] w-full bg-contain"
              style={{
                background: `url('${defaultBillboardThumbnail}') no-repeat`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
          )}
          <div className="flex flex-col gap-8">
            {billboard?.description && (
              <div className="flex flex-col gap-1">
                <UITypography className="text-md font-bold">Description</UITypography>
                <UITypography className="text-sm">{billboard?.description}</UITypography>
              </div>
            )}
            <div>
              <table className="w-full min-w-max table-auto text-center border border-slate-200 [&>thead>tr>th]:bg-transparent [&>thead>tr>th]:p-0 [&>thead>tr>th]:pt-1 [&>thead>tr>th]:border [&>thead>tr>th]:border-slate-200 [&>thead>tr>th]:border-b-0">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[50%]">
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
            className="flex flex-row justify-center items-center gap-1 bg-amber-500/10 text-[16px]"
            onClick={onBookmarkClick}
            loading={saveBillboardLoading || removeBookmarkLoading}
            icon={
              isBookmarked ? (
                <BsBookmarkDashFill className="text-xl" />
              ) : (
                <BsBookmarkHeart className="text-xl" />
              )
            }
          >
            {isBookmarked ? (
              <UITypography className="font-bold">Bookmarked</UITypography>
            ) : (
              <UITypography className="font-bold">Bookmark</UITypography>
            )}
          </UIButton>
          <div className="flex flex-col gap-1 ">
            <UICard className="p-4 gap-1">
              <UITypography className="text-sm font-medium">Owned by</UITypography>
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
                {(billboard?.owner?.userProfile?.userContacts?.length || 0) > 0 && (
                  <UIDropdownButton
                    color="teal"
                    size="lg"
                    className="w-min lg:w-full justify-center"
                    arrow={false}
                    menu={
                      <UIMenuList>
                        {billboard?.owner?.userProfile?.userContacts?.map((userContact) => (
                          <UIMenuItem
                            key={userContact.id}
                            onClick={() => setSelectedContact(userContact)}
                          >
                            {userContact.title}
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
                  {selectedContact.contacts.map((contact) => (
                    <Link href={stringToHref(selectedContact.type, contact)} key={contact}>
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
      <DeleteConfirmationModal
        open={confirmDeleteModalOpen}
        handleOpen={handleDeleteOpen}
        onDelete={handleDeleteBillboard}
        loading={deleteBillboardLoading}
      />
    </PageStatus>
  )
}
