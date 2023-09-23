"use client"

import React from "react"
import {
  Textarea,
  type TextareaProps,
  ThemeProvider,
  type TextareaStylesType,
} from "@material-tailwind/react"
import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

const textareaVariants = cva("!border-gray-200", {
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
  extends Omit<TextareaProps, "color" | "error">,
    VariantProps<typeof textareaVariants> {}

const UITextarea = React.forwardRef<HTMLDivElement, Props>(
  ({ color, className, error, label, labelProps, ...rest }, ref) => {
    const theme: { textarea: TextareaStylesType } = {
      textarea: {
        defaultProps: {
          labelProps: {
            ...labelProps,
            className: twMerge("before:content-none after:content-none", labelProps?.className),
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

    const themeAlt: { input: TextareaStylesType } = {
      input: {
        ...theme.textarea,
        defaultProps: {
          ...theme.textarea.defaultProps,
          labelProps,
        },
      },
    }
    return (
      <ThemeProvider value={Boolean(label) ? themeAlt : theme}>
        <Textarea
          color= {color || "teal"}
          label={label}
          error={Boolean(error)}
          className={
            Boolean(label) ? className : twMerge(textareaVariants({ color, error }), className)
          }
          {...rest}
          ref={ref}
        />
      </ThemeProvider>
    )
  }
)

UITextarea.displayName = "UITextarea"

export { UITextarea, type Props as UITextareaProps }
