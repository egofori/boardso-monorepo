import Content from "./content";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Edit billboard',
}

export default function Page() {
  return <Content />
}
