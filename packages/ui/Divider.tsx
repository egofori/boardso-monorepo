import { twMerge } from "tailwind-merge"

function UIDivider({
  type = "horizontal",
  className,
  children,
}: {
  type?: "horizontal" | "vertical"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <>
      {type === "vertical" ? (
        <div className={twMerge("flex flex-col items-center", className)}>
          <div className="h-[50%] w-[1px] bg-gray-300" />
          {children && <span className="px-1 text-xs">{children}</span>}
          <div className="h-[50%] w-[1px] bg-gray-300" />
        </div>
      ) : (
        <div className={twMerge("flex flex-row items-center", className)}>
          <div className="w-[50%] border-t border-t-gray-300" />
          {children && <span className="px-1 text-xs">{children}</span>}
          <div className="w-[50%] border-t border-t-gray-300" />
        </div>
      )}
    </>
  )
}

export { UIDivider }
