"use client";

import React from "react";
import { Button, type ButtonProps, ThemeProvider, type ButtonStyleTypes } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

const UIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...rest }, ref) => {

  const theme: {button: ButtonStyleTypes} = {
    button: {
      defaultProps: {
        color: "teal",
        className: twMerge("shadow-none hover:shadow-none", className),
        size: "md"
      },
      styles: {
        variants: {
          filled: {
            teal: {
              background: "hover:bg-primary-600"
            },
            amber: {
              backgroud: "hover:bg-secondary-600"
            },
          }
        }
      }
    }
  }

  return (
    <ThemeProvider value={theme}>
      <Button {...rest} ref={ref}>{children}</Button>
    </ThemeProvider>
  )
})

UIButton.displayName = "UIButton"

export { UIButton };
