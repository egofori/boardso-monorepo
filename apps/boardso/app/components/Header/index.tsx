"use client"

import {
  Navbar,
  IconButton,
  Collapse,
} from "@material-tailwind/react"
import Link from "next/link"
import React from "react";
import { UITypography } from "ui"
import CountryDropdown from "@/components/CountryDropdown";

export default function Header() {
  return (
    <Navbar className="sticky inset-0 z-10 h-max rounded-none max-w-full px-0">
      <div className="layout-wrapper flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <UITypography className="font-bold text-4xl text-tertiary-800">
            boardso
          </UITypography>
          <CountryDropdown />
        </div>
        <div className="flex gap-2 text-tertiary-800 hover:[&>a]:text-teal-400">
          <Link href="#" className="">Log in</Link>
          <UITypography as="span">/</UITypography>
          <Link href="#">Sign up</Link>
        </div>
      </div>
    </Navbar>
  );
}