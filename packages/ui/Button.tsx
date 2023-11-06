"use client"

import React from "react"
import {
  Button,
  type ButtonProps,
  ThemeProvider,
  type ButtonStyleTypes,
} from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"
import { BiLoaderCircle } from "react-icons/bi"

interface Props extends Omit<ButtonProps, "children"> {
  loading?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}

const UIButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, children, loading, icon, disabled, ...rest }, ref) => {
    const theme: { button: ButtonStyleTypes } = {
      button: {
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
                background: "hover:bg-secondary-600",
              },
            },
          },
        },
      },
    }

    return (
      <ThemeProvider value={theme}>
        <Button {...rest} disabled={ disabled || loading } ref={ref}>
          <span className={children ? "mr-1" : ""}>
            {loading ? <BiLoaderCircle className="animate-spin" /> : icon}
          </span>
          {children}
        </Button>
      </ThemeProvider>
    )
  }
)

UIButton.displayName = "UIButton"

export { UIButton }
