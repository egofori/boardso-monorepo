import { useChangePassword } from "@/services/hooks"
import { ModalHandler } from "@/types/Modal"
import {
  UIButton,
  UIFieldError,
  UIForm,
  UIModal,
  UIModalBody,
  UIModalHeader,
  UIPasswordInput,
  UITypography,
  hasError,
  notification,
  useZodForm,
} from "ui"
import { object, string } from "zod"
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Typography } from "@material-tailwind/react";

type Props = {
  open: boolean
  handleOpen: ModalHandler
}

export default function ChangePasswordModal({ open, handleOpen }: Props) {
  const { trigger, isLoading } = useChangePassword()

  const changePasswordSchema = object({
    oldPassword: string(),
    password: string().min(8, { message: "Password must be more than 8 characters" }),
  })

  const form = useZodForm({
    schema: changePasswordSchema,
    mode: "all",
  })

  const onClose = () => {
    form.reset()
    handleOpen(false)
  }

  const onSubmit = (data: any) => {
    trigger(
      { data: { oldPassword: data.oldPassword, password: data.password } },
      () => {
        notification("success", "Password updated successfully")
        onClose()
      },
      () => notification("error", "An error occurred while updating password")
    )
  }

  return (
    <UIModal size="sm" className="min-w-[300px] p-2" open={open} handler={handleOpen}>
      <UIModalHeader>
        <UITypography variant="h4" color="blue-gray" className="font-medium">
          Change Password
        </UITypography>
      </UIModalHeader>
      <UIModalBody className="pt-0">
        <div className="flex flex-row items-start gap-1 py-2">
          <IoMdInformationCircleOutline />
          <Typography className="text-xs">Provide current password if any else leave empty</Typography>
        </div>
        <UIForm form={form} onSubmit={onSubmit} className="flex flex-col gap-6">
          <div>
            <UIPasswordInput
              label="Current password"
              name="oldPassword"
              error={hasError(form, "oldPassword")}
              />
            <UIFieldError name="oldPassword" />
          </div>
          <div>
            <UIPasswordInput
              label="New password"
              name="password"
              error={hasError(form, "password")}
              />
            <UIFieldError name="password" />
          </div>
          <div className="flex gap-2">
            <UIButton variant="outlined" className="w-full" onClick={onClose}>
              Cancel
            </UIButton>
            <UIButton type="submit" className="w-full" loading={isLoading}>
              Save
            </UIButton>
          </div>
        </UIForm>
      </UIModalBody>
    </UIModal>
  )
}
