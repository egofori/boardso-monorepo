import { Suspense } from "react"
import Content from "./content"

export async function generateMetadata({ searchParams }: any) {
  const { mode } = searchParams

  switch (mode) {
    case "resetPassword":
      return { title: "Reset Password" }
    case "verifyEmail":
      return { title: "Verify Email" }
    default:
      break
  }
}

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}
