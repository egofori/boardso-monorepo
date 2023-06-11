'use client'

export default function LayoutWrapper({ children } : { children: React.ReactNode }) {
  return (
    <div className="">
      {children}
    </div>
  )
}
