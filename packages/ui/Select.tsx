"use client";

import React from "react";
import {
  Select,
  type SelectProps,
  Option,
  ThemeProvider,
  type SelectStylesType,
} from "@material-tailwind/react";
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from "tailwind-merge";

const selectVariants = cva(
  "border border-gray-200 focus:border-2 !transition-none",
  {
    variants: {
      color: {
        teal: "focus:border-teal-500"
      },
      error: {
        true: "focus:!border-t-red-500",
        false: ""
      }
    },
    defaultVariants: {
      color: "teal",
      error: false
    },
  }
)

interface Props extends Omit<SelectProps, "color" | "error">, VariantProps<typeof selectVariants> {}

const UISelect = React.forwardRef<HTMLDivElement, Props>(
  ({ children, className, color, error, ...rest }, ref) => {
    const theme: { select: SelectStylesType } = {
      select: {
        defaultProps: {
          size: "lg",
          color: "teal",
          labelProps: {
            className: "before:content-none after:content-none",
          },
        },
        styles: {
          base: {
            container: {
              minWidth: "min-w-[2rem]",
            }
          }
        }
      }
    }

    return (
      <ThemeProvider value={theme}>
        <Select error={Boolean(error)} className={twMerge(selectVariants({color, error}), className)} {...rest} ref={ref}>
          {children}
        </Select>
      </ThemeProvider>
    )
  }
)

UISelect.displayName = "UISelect"

export { UISelect, Option as UIOption, type Props as UISelectProps }
