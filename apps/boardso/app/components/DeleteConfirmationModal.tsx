import { ModalHandler } from "@/types/Modal"
import { MouseEventHandler } from "react"
import { UIButton, UIModal, UIModalBody, UIModalFooter, UIModalHeader, UITypography } from "ui"

interface Props {
  open: boolean
  handleOpen: ModalHandler
  onDelete: MouseEventHandler<HTMLButtonElement>
  loading: boolean
}

export function DeleteConfirmationModal({ open, handleOpen, onDelete, loading }: Props) {
  return (
    <UIModal size="xs" open={open} handler={handleOpen} className="min-w-[340px]">
      <UIModalHeader>
        <UITypography variant="h4" className="m-auto">
          Confirm delete
        </UITypography>
      </UIModalHeader>
      <UIModalBody>
        <UITypography className="text-center">
          Are you sure? This action is irreversible.
        </UITypography>
      </UIModalBody>
      <UIModalFooter className="flex flex-col gap-2">
        <UIButton color="red" onClick={onDelete} loading={loading} className="w-full">
          Delete
        </UIButton>
        <UIButton variant="outlined" color="blue-gray" className="w-full" onClick={handleOpen}>
          Cancel
        </UIButton>
      </UIModalFooter>
    </UIModal>
  )
}
