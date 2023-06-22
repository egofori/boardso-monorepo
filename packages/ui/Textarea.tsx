"use client";

import React from "react";
import {
  Textarea,
  type TextareaProps,
  ThemeProvider,
  type TextareaStylesType,
} from "@material-tailwind/react";
import { cva, type VariantProps } from 'class-variance-authority'
import { twMerge } from "tailwind-merge";

const textareaVariants = cva(
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

interface Props extends Omit<TextareaProps, "color" | "error">, VariantProps<typeof textareaVariants> {}

const UITextarea = React.forwardRef<HTMLDivElement, Props>(
  ({ children, color, className, error, ...rest }, ref) => {
    const theme: { textarea: TextareaStylesType } = {
      textarea: {
        defaultProps: {
          color: color || "teal",
          labelProps: {
            className: "before:content-none after:content-none",
          },
        },
        styles: {
          base: {
            container: {
              minWidth: "min-w-[1rem]",
            }
          }
        }
      },
    }

    return (
      <ThemeProvider value={theme}>
        <Textarea
          error={Boolean(error)}
          className={twMerge(
            textareaVariants({ color, error }),
            className
          )}
          {...rest}
          ref={ref}
        >
          {children}
        </Textarea>
      </ThemeProvider>
    );
  }
);

UITextarea.displayName = "UITextarea";

export { UITextarea, type Props as UITextareaProps };
