import { Suspense } from "react";
import Content from "./content";
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Email Confirmation',
}

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}
