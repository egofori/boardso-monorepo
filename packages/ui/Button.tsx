"use client";

import React from "react";
import { Button, type ButtonProps } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "shadow-none hover:shadow-none",
  {
    variants: {
      themeColor: {
        primary: "bg-primary-400 hover:bg-primary-500 focus:ring-primary-600",
        secondary: "bg-secondary-400  hover:bg-secondary-500"
      },
    },
  }
)

export interface Props extends ButtonProps, VariantProps<typeof buttonVariants>{}

const UIButton = React.forwardRef<HTMLButtonElement, Props>(({ className, themeColor, children, ...rest }, ref) => {
  return (
    <Button className={twMerge(className, buttonVariants({ themeColor }))} {...rest} ref={ref}>{children}</Button>
  )
})

UIButton.displayName = "UIButton"

export { UIButton };
