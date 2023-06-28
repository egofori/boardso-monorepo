"use client"

import React from "react"
import { IconButton, type IconButtonProps } from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"

const UIIconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ className, children, ...rest }, ref) => {
  return (
    <IconButton className={twMerge("shadow-none hover:shadow-none", className)} ripple={false} {...rest} ref={ref}>{children}</IconButton>
  )
})

UIIconButton.displayName = "UIIconButton"

export { UIIconButton }
