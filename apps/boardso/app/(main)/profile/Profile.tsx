"use client"

import React, { useCallback, useEffect, useState } from "react"
import {
  hasError,
  notification,
  UIAvatar,
  UIButton,
  UICard,
  UICardBody,
  UICardFooter,
  UICardHeader,
  UIFieldError,
  UIForm,
  UIIconButton,
  UIInput,
  UITextarea,
  UITooltip,
  // UIRating,
  UITypography,
  useZodForm,
} from "ui"
import { object, string } from "zod"
import { AiFillEdit } from "react-icons/ai"
import {
  useDeleteUser,
  useGetUserProfile,
  useRemoveProfilePicture,
  useUpdateProfilePicture,
  useUpdateUser,
} from "@/services/hooks/users"
import { User } from "@/types/User"
import { PageStatus } from "@/components/PageStatus"
import { RiAccountCircleFill } from "react-icons/ri"
import { AiOutlineUpload } from "react-icons/ai"
import { MdDelete } from "react-icons/md"
import ChangePasswordModal from "./ChangePasswordModal"
import { ModalHandler } from "@/types/Modal"
import Loader from "@/components/Loader"
import { DeleteConfirmationModal } from "@/components/DeleteConfirmationModal"
import { useRouter } from "next/navigation"

export default function Profile() {
  const router = useRouter()

  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState<boolean>(false)
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false)

  const {
    data: owner,
    isLoading,
    error,
    mutate,
  }: { data: User | null; [x: string]: any } = useGetUserProfile()

  const { trigger, isLoading: updateUserLoading } = useUpdateUser()

  const { trigger: updateProfilePictureTrigger, isLoading: updateProfilePictureLoading } =
    useUpdateProfilePicture()

  const { trigger: removeProfilePictureTrigger, isLoading: removeProfilePictureLoading } =
    useRemoveProfilePicture()

  const { trigger: deleteUserTrigger, isLoading: deleteUserLoading } = useDeleteUser()

  const profileSchema = object({
    firstName: string().min(1, { message: "Invalid first name" }).trim(),
    lastName: string().min(1, { message: "Invalid last name" }).trim(),
    username: string()
      .regex(/^\w+$/g, "Invalid username")
      .min(1, { message: "Invalid username" })
      .trim(),
    about: string().trim().optional(),
    email: string(),
    password: string().optional(),
    phone: string(),
  })

  const form = useZodForm({
    schema: profileSchema,
    mode: "all",
  })

  const resetForm = useCallback(() => {
    if (owner) {
      form.setValue("username", owner.username)
      form.setValue("firstName", owner.firstName)
      form.setValue("lastName", owner.lastName)
      form.setValue("email", owner.email)
      form.setValue("about", owner.userProfile?.about || "")
      form.setValue("phone", `${owner.zipCode || ""}${owner.phone || ""}`)
    }
  }, [form, owner])

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const onSubmit = (data: any) => {
    trigger(
      {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        about: data.about,
      },
      () => notification("success", "Profile updated successfully"),
      () => notification("error", "An error occurred while updating profile")
    )
  }

  const handleOpen: ModalHandler = () => setChangePasswordModalOpen((cur) => !cur)

  const handleDeleteOpen: ModalHandler = () => setConfirmDeleteModalOpen((cur) => !cur)

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files

    if (files) {
      const formData = new FormData()
      formData.append("image", files[0])

      updateProfilePictureTrigger(
        {
          data: formData,
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
        () => {
          notification("success", "Profile picture uploaded successfully")
          mutate()
        },
        (error: any) => {
          notification(
            "error",
            error.response?.data?.message || "Error occurred while updating profile picture"
          )
        }
      )
    }
  }

  const removeProfilePicture = () => {
    removeProfilePictureTrigger(
      null,
      () => {
        notification("success", "Profile picture removed successfully")
        mutate()
      },
      () => notification("error", "An error occurred while removing profile picture")
    )
  }

  const deleteUser = () => {
    deleteUserTrigger(
      null,
      () => {
        notification("success", "User permanently deleted")
        router.push("/")
      },
      () => notification("error", "An error occurred during deletion")
    )
  }

  return (
    <PageStatus
      data={owner}
      isLoading={isLoading}
      error={error && "Something went wrong"}
      className="flex flex-col gap-6"
    >
      <UICard className="w-full p-5 sm:p-8 bg-white">
        <UITypography variant="h3" className="text-tertiary-800 text-center mb-3 text-[25px] sm:text-[30px]">
          My Profile
        </UITypography>
        <UICardHeader className="m-0 shadow-none flex flex-col gap-3 justify-center items-center ">
          <div className="w-[120px] h-[120px] relative overflow-hidden rounded-full">
            {owner?.userProfile?.profileImage?.url ? (
              <UIAvatar
                src={owner?.userProfile?.profileImage?.url}
                alt="avatar"
                className="w-[120px] h-[120px]"
              />
            ) : (
              <RiAccountCircleFill className="text-slate-800" size="120px" />
            )}
            {updateProfilePictureLoading || removeProfilePictureLoading ? (
              <div className="absolute top-0 w-full h-full bg-slate-800/70 flex flex-col justify-center items-center group">
                <Loader size="40px" />
              </div>
            ) : (
              <div className="absolute top-0 w-full h-full hover:bg-slate-800/70 flex flex-col justify-center items-center group">
                <div className="group-hover:visible flex flex-row gap-2 invisible">
                  <UITooltip content="Upload">
                    <label
                      htmlFor="dropzone-file"
                      className="h-[40px] w-[40px] bg-white rounded-full flex flex-col justify-center items-center cursor-pointer"
                    >
                      <AiOutlineUpload className="text-[20px]" />
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={onSelectImage}
                      />
                    </label>
                  </UITooltip>
                  <UITooltip content="Delete">
                    <UIIconButton
                      color="red"
                      variant="filled"
                      className="rounded-full transition-none"
                      onClick={removeProfilePicture}
                    >
                      <MdDelete className="text-[20px]" />
                    </UIIconButton>
                  </UITooltip>
                </div>
              </div>
            )}
          </div>
        </UICardHeader>
        <UICardBody className="p-0">
          <UIForm form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
            <div>
              <UIInput
                label="Username"
                type="text"
                {...form.register("username")}
                error={hasError(form, "username")}
              />
              <UIFieldError name="username" />
            </div>
            <div>
              <UIInput
                label="First name"
                type="text"
                {...form.register("firstName")}
                error={hasError(form, "firstName")}
              />
              <UIFieldError name="firstName" />
            </div>
            <div>
              <UIInput
                label="Last name"
                type="text"
                {...form.register("lastName")}
                error={hasError(form, "lastName")}
              />
              <UIFieldError name="lastName" />
            </div>
            <div>
              <UITextarea
                label="About me"
                {...form.register("about")}
                error={hasError(form, "about")}
              />
              <UIFieldError name="about" />
            </div>
            <div>
              <div className="relative w-full">
                <UIInput
                  label="Email"
                  type="email"
                  {...form.register("email")}
                  error={hasError(form, "email")}
                  className="pr-10"
                  disabled
                />
              </div>
              <UIFieldError name="email" />
            </div>
            <div>
              <div className="relative w-full">
                <UIInput
                  label="Password"
                  type="password"
                  {...form.register("password")}
                  error={hasError(form, "password")}
                  className="pr-10"
                  disabled
                />
                <UIIconButton
                  color="white"
                  className="absolute right-[2px] top-[2px] border rounded"
                  onClick={() => setChangePasswordModalOpen(true)}
                >
                  <AiFillEdit className="text-[20px]" />
                </UIIconButton>
              </div>
              <UIFieldError name="password" />
            </div>
            <div>
              <div className="relative w-full">
                <UIInput
                  label="Phone"
                  {...form.register("phone")}
                  error={hasError(form, "phone")}
                  className="pr-10"
                  disabled
                />
              </div>
              <UIFieldError name="phone" />
            </div>
            <div className="flex gap-2">
              <UIButton variant="outlined" className="w-full" onClick={() => resetForm()}>
                CANCEL
              </UIButton>
              <UIButton type="submit" className="w-full" loading={updateUserLoading}>
                SUBMIT
              </UIButton>
            </div>
          </UIForm>
        </UICardBody>
      </UICard>
      <ChangePasswordModal open={changePasswordModalOpen} handleOpen={handleOpen} />
      <UICard className="w-full p-5 sm:p-8 bg-white flex flex-col gap-6">
        <div className="w-full">
          <UITypography variant="h4" color="red">
            Delete Account
          </UITypography>
        </div>
        <UICardBody className="p-0">
          <UITypography>
            Please note that once your account is deleted, all data under it will be permanently
            removed from Boardso. Account deletion is irreversible.
          </UITypography>
        </UICardBody>
        <UICardFooter className="p-0 flex flex-row justify-center">
          <UIButton color="red" onClick={handleDeleteOpen}>
            Permanently delete account
          </UIButton>
        </UICardFooter>
      </UICard>
      <DeleteConfirmationModal
        open={confirmDeleteModalOpen}
        handleOpen={handleDeleteOpen}
        onDelete={deleteUser}
        loading={deleteUserLoading}
      />
    </PageStatus>
  )
}
