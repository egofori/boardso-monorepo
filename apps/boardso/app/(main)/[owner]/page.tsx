"use client"

import { useCallback, useMemo, useState } from "react"
import { UITypography, UICard, UIAvatar, UIIconButton } from "ui"
import { BillboardsSearch } from "@/components/BillboardsSearch"
import { useParams, useSearchParams } from "next/navigation"
import { BillboardsList } from "@/components/BillboardsList"
import { useGetUser, useGetUserProfile } from "@/services/hooks/users"
import { User } from "@/types/User"
import { PageStatus } from "@/components/PageStatus"
import { RiAccountCircleFill } from "react-icons/ri"
import Link from "next/link"
import { stringToHref } from "@/utils/index"
import { AiFillEdit } from "react-icons/ai"

export default function Page() {
  const { owner: username } = useParams()

  const offset = 0
  const limit = 10
  const searchParams = useSearchParams()

  // retrieve all the params to make request to the server
  const getParams = useMemo(() => {
    const params: any = { offset, limit }
    Array.from(searchParams.keys()).forEach((key) => {
      if (searchParams.get(key)) params[key] = searchParams.get(key)
    })

    return params
  }, [searchParams])

  const [params, setParams] = useState<any>(getParams)

  const {
    data: owner,
    isLoading,
    error,
  }: { data: User | null; [x: string]: any } = useGetUser(username)

  // get current user
  const {
    data: currentUser,
    isLoading: currentUserLoading,
  }: { data: User | null;[x: string]: any } = useGetUserProfile()
  
  const renderContacts = useCallback(() => {
    if (owner?.userProfile?.userContacts?.length === 0) {
      return <UITypography className="text-center">No contacts available</UITypography>
    }

    return (
      <table className="w-full min-w-min gap-2">
        <tbody>
          {owner?.userProfile?.userContacts.map(
            (userContact) =>
              userContact.contacts.length !== 0 && (
                <tr key={userContact.id}>
                  <td className="pr-2">
                    <UITypography className="font-bold">{userContact.title}</UITypography>
                  </td>
                  <td>
                    {userContact.contacts.map((value) => (
                      <Link
                        href={stringToHref(userContact.type, value)}
                        key={value}
                        className="text-teal-500 underline"
                      >
                        <UITypography className="break-all">{value}</UITypography>
                      </Link>
                    ))}
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    )
  }, [owner?.userProfile?.userContacts])

  return (
    <PageStatus data={owner} isLoading={isLoading || currentUserLoading} error={error && "User does not exist!"}>
      <main className="layout-wrapper flex 2xl:flex-row flex-col items-start justify-center gap-6 py-5">
        <div className="shrink-0 2xl:w-96 w-full flex flex-col gap-6">
          <UICard className="flex flex-col justify-center items-center gap-1 p-4">
            {owner?.userProfile?.profileImage?.url ? (
              <UIAvatar src={owner.userProfile.profileImage.url} alt="avatar" size="xl" />
            ) : (
              <RiAccountCircleFill className="text-slate-800" size="74px" />
            )}
            <UITypography variant="h4">
              {owner?.firstName} {owner?.lastName}
            </UITypography>
            <UITypography>{owner?.email}</UITypography>
            <UITypography>
              {owner?.zipCode} {owner?.phone}
            </UITypography>
            {currentUser?.username === username && (
              <Link href="/profile">
                <UIIconButton color="white" className="absolute right-[5px] top-[5px] rounded">
                  <AiFillEdit className="text-[20px]" />
                </UIIconButton>
              </Link>
            )}
          </UICard>
          <UICard className="flex flex-col justify-center items-center gap-1 p-4">
            <UITypography variant="h5">Contacts</UITypography>
            <div className="overflow-x-auto">{renderContacts()}</div>
          </UICard>
          <UICard className="flex flex-col justify-center items-center gap-1 p-4">
            <UITypography variant="h5">About</UITypography>
            <UITypography className="text-center">{owner?.userProfile?.about}</UITypography>
          </UICard>
        </div>
        <div className="w-full">
          <UITypography variant="h4" className="mb-4">
            List of billboards
          </UITypography>
          <div className="w-full px-2 py-5 sm:p-10 bg-white">
            <BillboardsSearch params={params} setParams={setParams} />
          </div>
          <div className="flex flex-col gap-7 py-7">
            <BillboardsList params={params} setParams={setParams} owner={currentUser} />
          </div>
        </div>
      </main>
    </PageStatus>
  )
}
