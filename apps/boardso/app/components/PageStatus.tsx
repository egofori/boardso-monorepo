import { UITypography } from "ui"
import Loader from "./Loader"
import { twMerge } from "tailwind-merge"

interface Props {
  isLoading: any
  data: any
  error?: any
  children: any
  className?: string
}
export function PageStatus({ isLoading, data, error, children, className }: Props) {
  const renderContent = () => {
    if (isLoading) return <Loader size="40px" />
    else if (error) return <UITypography className="info-text">{error}</UITypography>
    else if (data) return children
  }
  return (
    <div
      className={twMerge(
        "w-full",
        isLoading || error ? "h-[calc(100%-83px)] flex flex-row justify-center items-center" : "",
        className
      )}
    >
      {renderContent()}
    </div>
  )
}
