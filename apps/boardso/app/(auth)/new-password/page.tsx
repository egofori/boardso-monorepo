import { Suspense } from "react"
import Content from "./content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "New Password",
}

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}
