"use client"

import Link from "next/link"
import { UICard } from "ui"

export default function Content() {
  return (
    <main className="layout-wrapper">
      <UICard className="mx-auto my-5 max-w-3xl p-5 sm:p-10 bg-white">
        <article className="prose prose-slate mx-auto lg:prose-lg">
          <h1 className="text-center">Contact Us</h1>
          <p>
            Are you lost? Do you want to make an inquiry? Write us a testimonial? Send us a feedback? Or you would like to make a few suggestions?
            Please email us at <Link href="mailto:contact@boardso.com">contact@boardso.com</Link>.
          </p>
          <p>You can also whatsapp us on <Link href="https://wa.link/ffitqj" target="_blank">+233546040671</Link>.</p>
          <p>Ask us anything we are here to help.</p>
        </article>
      </UICard>
    </main>
  )
}
