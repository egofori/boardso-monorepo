import Content from "./content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: `Boardso is a website with billboard listings from billboard owners, providing billboard
  seekers an easy way to find billboard sites on the internet. It is a cutting-edge
  platform that can significantly increase the exposure of your billboard sites on the
  internet.`,
}

export default function Page() {
  return <Content />
}
