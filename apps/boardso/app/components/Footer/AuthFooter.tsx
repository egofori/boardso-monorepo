"use client"

import { UITypography } from "ui"

export default function AuthFooter() {
  return (
    <footer className="py-1">
      <UITypography className="text-center text-xs">
        Copyright © 2023 - {new Date().getFullYear()} Boardso.com
      </UITypography>
    </footer>
  )
}
