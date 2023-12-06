"use client"

import { useState } from "react"
import { UIButton } from "./Button"
import { UIMenu, UIMenuHandler } from "./Menu"
import { BsCaretDownFill } from "react-icons/bs"
import { type ButtonProps } from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"

interface DropdownButtonProps extends Omit<ButtonProps, "children"> {
  children?: React.ReactNode
  menu?: React.ReactNode
  arrow?: boolean
  icon?: React.ReactNode
}

function UIDropdownButton(
  {
    children,
    menu,
    arrow = true,
    className,
    color,
    ...rest
  }: DropdownButtonProps,
  ref: any
) {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <UIMenu open={openMenu} handler={setOpenMenu}>
      <UIMenuHandler>
        <UIButton
          className={twMerge(
            "flex gap-1 items-center active:brightness-95",
            className
          )}
          color={color || "white"}
          ripple={false}
          {...rest}
          ref={ref}
        >
          {children}
          {arrow && (
            <BsCaretDownFill
              className={twMerge(
                openMenu ? "rotate-180" : "rotate-0",
                "flex-shrink-0 text-xs"
              )}
            />
          )}
        </UIButton>
      </UIMenuHandler>
      {menu}
    </UIMenu>
  )
}

export { UIDropdownButton }
