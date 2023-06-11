"use client";

import React from "react";
import { Button, type ButtonProps } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

const UIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...rest }, ref) => {
  return (
    <Button className={twMerge("shadow-none hover:shadow-none", className)} {...rest} ref={ref}>{children}</Button>
  )
})

UIButton.displayName = "UIButton"

export { UIButton };
