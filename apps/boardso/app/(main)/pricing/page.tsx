import Content from "./content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing list with an easy payment process.",
}

export default function Page() {
  return <Content />
}
