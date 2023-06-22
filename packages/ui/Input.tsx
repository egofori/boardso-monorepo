"use client";

import React from "react";
import { Input, type InputProps, ThemeProvider, type InputStylesType } from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "!border-t-blue-gray-200",
  {
    variants: {
      color: {
        teal: "focus:!border-t-teal-500"
      },
      error: {
        true: "!border-t-red-500 focus:!border-t-red-500",
        false: ""
      }
    },
    defaultVariants: {
      color: "teal",
      error: false
    },
  }
)

interface Props extends Omit<InputProps, "color" | "error">, VariantProps<typeof inputVariants> {}

const UIInput = React.forwardRef<HTMLInputElement, Props>(({ size, className, label, labelProps, color, error, ...rest }, ref) => {
  const theme: { input: InputStylesType} = {
    input: {
      defaultProps: {
        color: color || "teal",
        size: "lg",
        labelProps: {
          ...labelProps,
          className: twMerge("before:content-none after:content-none", labelProps?.className)
        }
      },
      styles: {
        base: {
          container: {
            minWidth: "min-w-[1rem]",
          }
        }
      }
    }
  }

  return (
    <ThemeProvider value={theme}>
      <Input
        error={Boolean(error)}
        label={label}
        size={size}
        className={twMerge(
          inputVariants({ color, error }),
          className
        )}
        {...rest}
        ref={ref}
      />
    </ThemeProvider>
  )
})

UIInput.displayName = "UIInput"

export { UIInput, type Props };
