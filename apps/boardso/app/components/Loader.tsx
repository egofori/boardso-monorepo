import { IconBaseProps } from "react-icons"
import { BiLoaderCircle } from "react-icons/bi"
import { twMerge } from "tailwind-merge"

export default function Loader({ className, ...rest }: IconBaseProps) {
  return <BiLoaderCircle className={twMerge("animate-spin text-teal-500", className)} {...rest} />
}
