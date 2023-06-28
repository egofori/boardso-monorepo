"use client"

import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
  type CardStylesType,
} from "@material-tailwind/react"
import { twMerge } from "tailwind-merge"

const UICard = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <Card className={twMerge("shadow-none border border-slate-200", className)} {...rest} ref={ref}>
        {children}
      </Card>
    )
  }
)

UICard.displayName = "UICard"

export {
  UICard,
  CardHeader as UICardHeader,
  CardBody as UICardBody,
  CardFooter as UICardFooter,
}
