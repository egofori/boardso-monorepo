import Content from "./content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact us at Boardso",
}

export default function Page() {
  return <Content />
}
