"use client"

import React from "react"
import {
  IconButton,
  type IconButtonProps,
  ThemeProvider,
  IconButtonStyleTypes,
} from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"
import { BiLoaderCircle } from "react-icons/bi"

interface Props extends IconButtonProps {
  loading?: boolean
}

const UIIconButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ loading, className, children, ...rest }, ref) => {
    const theme: { iconButton: IconButtonStyleTypes } = {
      iconButton: {
        defaultProps: {
          color: "teal",
          className: twMerge(
            "shadow-none hover:shadow-none text-center inline-flex items-center justify-center",
            className
          ),
          size: "md",
        },
        styles: {
          variants: {
            filled: {
              teal: {
                background: "hover:bg-primary-600",
              },
              amber: {
                backgroud: "hover:bg-secondary-600",
              },
            },
          },
        },
      },
    }
    return (
      <ThemeProvider value={theme}>
        <IconButton
          className={twMerge("shadow-none hover:shadow-none", className)}
          ripple={false}
          {...rest}
          ref={ref}
        >
          {loading ? <BiLoaderCircle className="animate-spin" /> : children}
        </IconButton>
      </ThemeProvider>
    )
  }
)

UIIconButton.displayName = "UIIconButton"

export { UIIconButton }
