"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { UITypography } from "ui"

export default function Footer() {
  const pathname = usePathname()
  const footerPages = ["/", "/about-us", "/contact-us", "/pricing"]

  return footerPages.includes(pathname) ? (
    <footer className="bg-tertiary-100">
      <div className="layout-wrapper py-10 flex flex-col justify-between lg:flex-row gap-4">
        <div className="flex flex-row items-start gap-4  lg:w-[50%]">
          <UITypography className="font-bold text-2xl">Boardso</UITypography>
          <UITypography className="text-justify text-sm">
            Serves individuals and businesses looking for billboard spaces to advertise. Search
            through a growing database of billboards.
          </UITypography>
        </div>
        <div className="flex justify-between text-sm w-full gap-1 [&>ul>li:first-child]:mb-1">
          <ul>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="https://wa.link/ffitqj" target="_blank">
                Report
              </Link>
            </li>
            <li>
              <Link href="/about-us">Documentation</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-tertiary-200 py-1">
        <UITypography className="text-center text-xs">
          Copyright © 2023 - {new Date().getFullYear()} Boardso.com
        </UITypography>
      </div>
    </footer>
  ) : (
    <></>
  )
}
