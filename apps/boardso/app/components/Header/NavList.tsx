'use client'

import { UITypography } from "ui";

export default function NavList() {
    return (
      <ul className="">
        <UITypography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
            Pages
          </a>
        </UITypography>
        <UITypography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
            Account
          </a>
        </UITypography>
        <UITypography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
            Blocks
          </a>
        </UITypography>
        <UITypography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          <a href="#" className="flex items-center hover:text-blue-500 transition-colors">
            Docs
          </a>
        </UITypography>
      </ul>
    );
  }