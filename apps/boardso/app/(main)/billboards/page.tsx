import Content from "./content";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Search Billboards',
}

export default function Page() {
  return <Content />
}
