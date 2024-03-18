import { UIButton, UIPopover, UIPopoverContent, UIPopoverHandler } from "ui"
import { MdOutlineInfo } from "react-icons/md"
import { useState } from "react"

interface Props {
  content: string
}

export default function InfoPopover({ content }: Props) {
  const [openPopover, setOpenPopover] = useState(false)

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  }
  return (
    <UIPopover open={openPopover} handler={setOpenPopover}>
      <UIPopoverHandler {...triggers}>
        <div>
          <MdOutlineInfo className="text-slate-400" />
        </div>
      </UIPopoverHandler>
      <UIPopoverContent {...triggers} className="max-w-[300px]">{content}</UIPopoverContent>
    </UIPopover>
  )
}
