import Content from "./content";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Add billboard',
}

export default function Page() {
  return <Content />
}
