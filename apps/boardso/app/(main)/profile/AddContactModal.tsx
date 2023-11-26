import { useAddContacts, useEditContact } from "@/services/hooks/users"
import { ModalHandler } from "@/types/Modal"
import { contactTypes } from "@/utils/constants"
import { useEffect, useState } from "react"
import { BiPlus } from "react-icons/bi"
import {
  UIButton,
  UIFieldError,
  UIForm,
  UIIconButton,
  UIInput,
  UIModal,
  UIModalBody,
  UIModalHeader,
  UIOption,
  UISelect,
  UITypography,
  hasError,
  notification,
  useZodForm,
} from "ui"
import { object, string } from "zod"
import { AiOutlineMinus } from "react-icons/ai"
import { UserContact } from "@/types/Billboard"

type Props = {
  open: boolean
  handleOpen: ModalHandler
  userContact: UserContact | undefined
}

export function AddContactModal({ open, handleOpen, userContact }: Props) {
  const { trigger, isLoading } = useAddContacts()
  const { trigger: editTrigger, isLoading: editLoading } = useEditContact(userContact?.id)

  const [selectedContactType, setSelectedContactType] = useState<{
    label: string
    value: string
    contactPlaceholder: string
    titlePlaceholder: string
  }>(contactTypes[0])
  const [contacts, setContacts] = useState<string[]>([])

  const changePasswordSchema = object({
    title: string({ required_error: "Title is required" })
      .min(1, { message: "Title is required" })
      .trim(),
    contact: string().optional(),
  })

  const form = useZodForm({
    schema: changePasswordSchema,
    mode: "all",
  })

  useEffect(() => {
    if (userContact) {
      if (selectedContactType.value !== userContact.type) setContacts([])
    } else setContacts([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, selectedContactType])

  useEffect(() => {
    if (userContact) {
      setSelectedContactType(contactTypes.filter((type) => type.value === userContact.type)[0])
      setContacts([...userContact.contacts])
      form.setValue("title", userContact.title)
    }
  }, [form, userContact])

  const onClose = () => {
    form.reset()
    handleOpen(false)
  }

  const onSubmit = (data: any) => {
    let contactList = contacts
    if (data.contact) {
      contactList = [...contactList, data.contact]
    }

    if (contactList.length === 0) {
      form.setError("contact", { message: "No contacts added" })
      return
    }

    if (userContact) {
      editTrigger(
        {
          data: {
            title: data.title,
            type: selectedContactType.value,
            contacts: contactList,
          },
        },
        () => {
          onClose()
          notification("success", "Contacts edited successfully")
        },
        (error: any) => {
          notification(
            "error",
            error.response?.data?.message || "Error occurred while editing contacts"
          )
        }
      )
    } else {
      trigger(
        {
          data: {
            title: data.title,
            type: selectedContactType.value,
            contacts: contactList,
          },
        },
        () => {
          onClose()
          notification("success", "Contacts added successfully")
        },
        (error: any) => {
          notification(
            "error",
            error.response?.data?.message || "Error occurred while adding contacts"
          )
        }
      )
    }
  }

  const addContact = () => {
    const contact = form.watch("contact")
    if (contact && contact !== "") {
      setContacts([...contacts, contact])
      form.setValue("contact", "")
    } else form.setError("contact", { message: "Contact is required" })
  }

  const removeContact = (index: number) => {
    setContacts((contacts) => contacts.filter((e, i) => i !== index))
  }

  return (
    <UIModal size="sm" className="min-w-[300px] p-2" open={open} handler={handleOpen}>
      <UIModalHeader>
        <UITypography variant="h4" color="blue-gray" className="font-medium">
          Add Contact
        </UITypography>
      </UIModalHeader>
      <UIModalBody>
        <UIForm form={form} onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="flex flex-row gap-3 w-full pr-[50px]">
            <div className="[&>div]:h-[65px] [&>div]:pt-2 [&>div>label]:text-slate-800">
              <div>
                <label>Title:</label>
              </div>
              <div>
                <label>Type:</label>
              </div>
              <div>
                <label>Contacts:</label>
              </div>
            </div>
            <div className="w-full">
              <div className="h-[65px]">
                <div>
                  <UIInput
                    {...form.register("title")}
                    error={hasError(form, "title")}
                    placeholder={selectedContactType.titlePlaceholder}
                  />
                  <UIFieldError name="title" />
                </div>
              </div>
              <div className="h-[65px]">
                <UISelect placeholder="Select contact type" value={selectedContactType.label}>
                  {contactTypes.map((data) => (
                    <UIOption
                      key={data.value}
                      value={data.value}
                      onClick={() => setSelectedContactType(data)}
                    >
                      {data.label}
                    </UIOption>
                  ))}
                </UISelect>
              </div>
              <div className="flex flex-col gap-[6px]">
                {contacts.map((contact, i) => (
                  <div key={contact} className="relative">
                    <div className="h-[44px] w-full rounded-md bg-gray-100/70 pl-1 pt-2">
                      <UITypography className="break-all text-center text-slate-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {contact}
                      </UITypography>
                    </div>
                    <UIIconButton
                      color="teal"
                      variant="text"
                      className="absolute inset-y-0 -right-[50px]"
                      onClick={() => removeContact(i)}
                    >
                      <AiOutlineMinus fontSize="25px" />
                    </UIIconButton>
                  </div>
                ))}
                <div className="relative">
                  <div>
                    <UIInput
                      {...form.register("contact")}
                      error={hasError(form, "contact")}
                      placeholder={selectedContactType.contactPlaceholder}
                    />
                    <UIFieldError name="contact" />
                  </div>
                  <UIIconButton
                    color="teal"
                    variant="text"
                    className="absolute inset-y-0 -right-[50px]"
                    onClick={addContact}
                  >
                    <BiPlus fontSize="25px" />
                  </UIIconButton>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <UIButton variant="outlined" className="w-full" onClick={onClose}>
              Cancel
            </UIButton>
            <UIButton type="submit" className="w-full" loading={isLoading || editLoading}>
              Save
            </UIButton>
          </div>
        </UIForm>
      </UIModalBody>
    </UIModal>
  )
}
