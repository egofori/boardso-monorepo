"use client";

import { Input, type InputProps } from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"

interface Props extends InputProps {
    ref?: React.Ref<HTMLInputElement>
}

function UIInput({ className, labelProps, containerProps, ...rest }: Props) {
  return (
    <Input
      className={twMerge("!border-t-blue-gray-200 !border-2 !ring-transparent focus:!border-teal-300 bg-white rounded-xl", className)}
      labelProps={{
        ...labelProps,
        className: twMerge("before:content-none after:content-none", labelProps?.className)
      }}
      containerProps={{
        ...containerProps,
        className: twMerge("h-12", containerProps?.className),
      }}
      {...rest}
    />
  )
}

export { UIInput };
