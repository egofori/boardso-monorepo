"use client"

import { Tooltip, type TooltipProps } from "@material-tailwind/react"
import React from "react"


const UITooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, ...rest }, ref) => {
    return !content ? (
      children
    ) : (
      <Tooltip content={content} {...rest} ref={ref}>
        {children}
      </Tooltip>
    )
  }
)

UITooltip.displayName = "UITooltip"

export { UITooltip }
