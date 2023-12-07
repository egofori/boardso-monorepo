import { PageStatus } from "@/components/PageStatus"
import { useDeleteContact, useGetContacts } from "@/services/hooks/users"
import { UserContact } from "@/types/Billboard"
import { stringToHref } from "@/utils/index"
import Link from "next/link"
import {
  UIButton,
  UICard,
  UICardBody,
  UICardHeader,
  UIIconButton,
  UITooltip,
  UITypography,
  notification,
} from "ui"
import { AiOutlineLink, AiOutlineMail } from "react-icons/ai"
import { BsPhone } from "react-icons/bs"
import { AiFillEdit } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import { useCallback, useEffect, useState } from "react"
import { AddContactModal } from "./AddContactModal"
import { ModalHandler } from "@/types/Modal"

export function Contacts() {
  const {
    data: userContacts,
    isLoading,
    error,
    mutate,
  }: { data: UserContact[]; [x: string]: any } = useGetContacts()

  const [addContactModalOpen, setAddContactModalOpen] = useState<boolean>(false)
  const [selectedUserContact, setSelectedUserContact] = useState<UserContact | undefined>()

  const renderContactTypeIcon = useCallback((type: string) => {
    switch (type) {
      case "EMAIL":
        return <AiOutlineMail />
      case "PHONE":
        return <BsPhone />
      default:
        return <AiOutlineLink />
    }
  }, [])

  const handleOpen: ModalHandler = () => setAddContactModalOpen((cur) => !cur)

  const { trigger: deleteContactTrigger } = useDeleteContact()

  const editUserContact = (userContact: UserContact) => {
    setSelectedUserContact(userContact)
    setAddContactModalOpen(true)
  }

  useEffect(() => {
    if (!addContactModalOpen) mutate()
  }, [addContactModalOpen, mutate])

  const deleteContact = (id: number) => {
    deleteContactTrigger(
      id,
      () => {
        mutate()
        notification("success", "Contacts deleted successfully")
      },
      () => notification("error", "Error occurred while editing contacts")
    )
  }

  return (
    <PageStatus
      data={userContacts}
      isLoading={isLoading}
      error={error && "Unable to list contacts"}
      className="flex flex-col"
    >
      <UICard className="w-full p-5 sm:p-8">
        <UITypography variant="h3" className="text-tertiary-800 text-center mb-3 text-[25px] sm:text-[30px]">
          Contacts
        </UITypography>
        <UICardHeader className="m-0 shadow-none flex flex-row justify-end mb-2">
          <UIButton onClick={() => setAddContactModalOpen(true)}>Add Contact</UIButton>
        </UICardHeader>
        <UICardBody className="overflow-x-auto p-0">
          <table className="w-full min-w-max table-auto text-left [&>thead>tr>th>p]:text-center [&>thead>tr>th>p]:text-slate-500">
            <thead>
              <tr>
                <th colSpan={2} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    Title
                  </UITypography>
                </th>
                <th colSpan={2} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    Contacts
                  </UITypography>
                </th>
              </tr>
            </thead>
            <tbody>
              {userContacts?.map((userContact) => (
                <tr key={userContact.id} className="even:bg-blue-gray-50/50">
                  <td className="pl-4 text-slate-400">{renderContactTypeIcon(userContact.type)}</td>
                  <td className="p-4 !pl-2">
                    <UITypography variant="small" color="blue-gray" className="font-normal">
                      {userContact.title}
                    </UITypography>
                  </td>
                  <td className="p-4">
                    {userContact?.contacts?.map((value) => (
                      <Link
                        href={stringToHref(userContact.type, value)}
                        key={value}
                        className="text-teal-500 underline"
                      >
                        <UITypography className="break-all">{value}</UITypography>
                      </Link>
                    ))}
                  </td>
                  <td className="p-4 flex flex-row justify-end gap-1">
                    <UITooltip content="Edit">
                      <UIIconButton
                        color="amber"
                        variant="text"
                        className="normal-case font-normal text-sm"
                        onClick={() => editUserContact(userContact)}
                      >
                        <AiFillEdit className="text-[20px]" />
                      </UIIconButton>
                    </UITooltip>
                    <UITooltip content="Delete">
                      <UIIconButton
                        color="red"
                        variant="text"
                        className="normal-case font-normal text-sm"
                        onClick={() => deleteContact(userContact.id)}
                      >
                        <MdDelete className="text-[20px]" />
                      </UIIconButton>
                    </UITooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </UICardBody>
      </UICard>
      <AddContactModal
        open={addContactModalOpen}
        handleOpen={handleOpen}
        userContact={selectedUserContact}
      />
    </PageStatus>
  )
}
