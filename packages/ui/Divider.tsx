import { twMerge } from "tailwind-merge"

function UIDivider({ type="horizontal", className, children }: { type?: string, className?: string, children?: React.ReactNode }) {
  return (
    <div className={twMerge("flex flex-row items-center", className)}>
    {
        (type === "horizontal") && (
            <>
                <div className="w-full border-t border-t-gray-300" />
                { children && <span className="px-1 text-xs">{children}</span>}
                <div className="w-full border-t border-t-gray-300" />
            </>
        )
    }
    </div>
  )
}

export { UIDivider }
