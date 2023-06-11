"use client"

import Link from "next/link";
import { UITypography } from "ui";

export default function Footer() {
  return (
    <footer className="bg-tertiary-100">
      <div className="layout-wrapper py-10 flex flex-col justify-between lg:flex-row gap-4">
        <div className="flex flex-row items-start gap-4  lg:w-[50%]">
          <UITypography className="font-bold text-4xl">Boardso</UITypography>
          <UITypography className="text-justify">
            Serves individuals and businesses looking for billboard space to advertise. Search through a growing database of billboards.
          </UITypography>
        </div>
        <div className="flex justify-between gap-10">
            <ul>
                <li>
                    <Link href="#">About Us</Link>
                </li>
                <li>
                    <Link href="#">Contact Us</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href="#">Privacy Policy</Link>
                </li>
                <li>
                    <Link href="#">Terms & Conditions</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <Link href="#">Report</Link>
                </li>
                <li>
                    <Link href="#">Documentation</Link>
                </li>
            </ul>
        </div>
      </div>
      <div className="bg-tertiary-200">
        <UITypography className="text-center">© 2023 Boardso.com</UITypography>
      </div>
    </footer>
  );
}
