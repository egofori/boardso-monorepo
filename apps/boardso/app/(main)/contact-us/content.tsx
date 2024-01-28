"use client"

import Link from "next/link"
import { UICard, UITypography } from "ui"

export default function Content() {
  return (
    <main className="layout-wrapper">
      <UICard className="mx-auto my-5 max-w-3xl p-5 sm:p-10 bg-white">
        <article className="prose prose-slate mx-auto lg:prose-lg">
          <UITypography variant="h1" className="text-4xl text-center">Contact Us</UITypography>
          <UITypography variant="paragraph">
            Are you lost? Do you want to make an inquiry? Write us a testimonial? Send us a feedback? Or you would like to make a few suggestions?
            Please email us at <Link href="mailto:contact@boardso.com">contact@boardso.com</Link>.
          </UITypography>
          <UITypography variant="paragraph">You can also whatsapp us on <Link href="https://wa.link/ffitqj" target="_blank">+233546040671</Link>.</UITypography>
          <UITypography variant="paragraph">Ask us anything we are here to help.</UITypography>
        </article>
      </UICard>
    </main>
  )
}
