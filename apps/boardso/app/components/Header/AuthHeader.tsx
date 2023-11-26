"use client"

import Link from "next/link"

export default function AuthHeader() {
  return (
    <nav className="p-6">
        <Link href="/" className="font-bold text-4xl text-tertiary-800">boardso</Link>
    </nav>
  )
}
