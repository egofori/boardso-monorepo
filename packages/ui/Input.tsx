"use client"

import React from "react"
import {
  Input,
  type InputProps,
  ThemeProvider,
  type InputStylesType,
} from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva("!border-gray-200 !border-t-gray-200", {
  variants: {
    color: {
      teal: "focus:!border-teal-500",
    },
    error: {
      true: "!border-red-500 focus:!border-red-500",
      false: "",
    },
  },
  defaultVariants: {
    color: "teal",
    error: false,
  },
})

interface Props
  extends Omit<InputProps, "color" | "error">,
    VariantProps<typeof inputVariants> {}

const UIInput = React.forwardRef<HTMLInputElement, Props>(
  ({ size, className, label, labelProps, color, error, ...rest }, ref) => {
    const theme: { input: InputStylesType } = {
      input: {
        defaultProps: {
          color: color || "teal",
          size: "lg",
          labelProps: {
            ...labelProps,
            className: twMerge(
              "before:content-none after:content-none",
              labelProps?.className
            ),
          },
        },
        styles: {
          base: {
            container: {
              minWidth: "min-w-[1rem]",
            },
          },
        },
      },
    }

    const themeAlt: { input: InputStylesType } = {
      input: {
        ...theme.input,
        defaultProps: {
          ...theme.input.defaultProps,
          labelProps,
        },
      },
    }

    return (
      <ThemeProvider value={Boolean(label) ? themeAlt : theme}>
        <Input
          label={label}
          error={Boolean(error)}
          size={size}
          className={
            Boolean(label)
              ? className
              : twMerge(inputVariants({ color, error }), className)
          }
          {...rest}
          ref={ref}
        />
      </ThemeProvider>
    )
  }
)

UIInput.displayName = "UIInput"

export { UIInput, type Props }
