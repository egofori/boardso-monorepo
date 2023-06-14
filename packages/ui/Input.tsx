"use client";

import React from "react";
import { Input, type InputProps } from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"

const UIInput = React.forwardRef<HTMLInputElement, InputProps>(({ size, className, label, labelProps, containerProps, color, ...rest }, ref) => {
  return (
    <>
    {
      label ?
      <Input
        label={label}
        className={twMerge("bg-white", className)}
        labelProps={labelProps}
        containerProps={containerProps}
        color={color || "teal"}
        size={size || "lg"}
        {...rest}
        ref={ref}
      /> :
      <Input
        label={label}
        className={twMerge(`bg-white focus:!border-t-${color || "teal"}-500`, className)}
        labelProps={{
          ...labelProps,
          className: twMerge("before:content-none after:content-none", labelProps?.className)
        }}
        containerProps={containerProps}
        color={color || "teal"}
        size={size || "lg"}
        {...rest}
        ref={ref}
      />
    }
    </>
  )
})

UIInput.displayName = "UIInput"

export { UIInput };
