"use client"

import Image from "next/image"
import {
  BsBookmarkDashFill,
  BsBookmarkHeart,
  BsCircleFill,
} from "react-icons/bs"
import { IoLocationSharp } from "react-icons/io5"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import {
  UIAvatar,
  UIButton,
  UICard,
  UICarousel,
  UIDropdownButton,
  UIIconButton,
  UIMenuItem,
  UIMenuList,
  UITypography,
} from "ui"
import { useState } from "react"
import Link from "next/link"

export const billboard = {
  images: [1, 1],
  title: "Large static billboard for sale at Fanmilk",
  type: "Static billboard",
  dimension: {
    height: 100,
    width: 200,
    unit: { name: "feet", abbrev: "ft" },
  },
  description: "We make sure you are satisfied with our service. We make sure you are satisfied with our service. We make sure you are satisfied with our service.",
  location: "Ablekuma, Accra",
  price: { value: 10000.0, currency: "GHS", rate: "/month" },
  status: "Availbale",
  owner: {
    uid: "abrewa_nana",
    profile_image:
      "https://images.unsplash.com/photo-1541951991883-a34a3024c94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    full_name: "Abrewa Nana",
    contacts: [
      {
        name: "Website",
        value: ["www.myweb.com"],
      },
      {
        name: "Phone",
        value: ["+233546040677"],
      },
      {
        name: "Email",
        value: ["evans@koo.com"],
      },
      {
        name: "WhatsApp",
        value: ["https://chat.whatsapp.com/+233546040677"],
      },
    ],
  },
}

export default function Page() {
  const [selectedContact, setSelectedContact] = useState<number | null>(null)

  return (
    <main className="layout-wrapper flex lg:flex-row flex-col items-start justify-center gap-4 py-5">
      <UICard className="w-full p-8 bg-white flex flex-col gap-4">
        <div className="flex flex-row justify-between items-start">
          <UITypography variant="h4">{billboard.title}</UITypography>
          <div className="flex flex-row items-baseline whitespace-nowrap gap-1">
            <UITypography variant="h3" color="" className="text-teal-500">
              {`${billboard.price.currency} ${billboard.price.value}`}
            </UITypography>
            <UITypography
              variant="small"
              className="font-medium text-slate-800"
            >
              {billboard.price.rate}
            </UITypography>
          </div>
          {/* <Link
            href={billboard.owner.uid}
            className="flex flex-row items-center gap-3"
          >
            <UIAvatar
              src={billboard.owner.profile_image}
              alt="avatar"
              size="sm"
            />
            <UITypography className="text-lg font-bold normal-case text-slate-600">
              {billboard.owner.full_name}
            </UITypography>
          </Link> */}
          {/* <UIIconButton
            color="teal"
            variant="text"
            className="rounded-full p-6"
          >
            <BsBookmarkDashFill color="#2dd4bf" className="text-3xl" />
            <BsBookmarkHeart color="#2dd4bf" className="text-3xl" />
          </UIIconButton> */}
        </div>
        <UICarousel
          className="rounded-lg h-[400px]"
          loop
          prevArrow={({ handlePrev }) => (
            <UIIconButton
              variant="text"
              color="teal"
              size="lg"
              onClick={handlePrev}
              className="!absolute top-2/4 -translate-y-2/4 left-4 rounded-full !bg-teal-400/10"
            >
              <FaAngleLeft strokeWidth={2} className="w-6 h-6" />
            </UIIconButton>
          )}
          nextArrow={({ handleNext }) => (
            <UIIconButton
              variant="text"
              color="teal"
              size="lg"
              onClick={handleNext}
              className="!absolute top-2/4 -translate-y-2/4 !right-4 rounded-full !bg-teal-400/10"
            >
              <FaAngleRight strokeWidth={2} className="w-6 h-6" />
            </UIIconButton>
          )}
        >
          {billboard.images.map((image, i) => (
            <div
              key={i}
              className="h-full w-full bg-contain"
              style={{
                background:
                  "url('https://images.unsplash.com/photo-1541951991883-a34a3024c94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80') no-repeat",
                backgroundSize: "contain",
                backgroundPosition: "center center",
              }}
            >
              {/* <Image
                src="https://images.unsplash.com/photo-1541951991883-a34a3024c94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt={image.toString()}
                // className="object-contain"
                height={400}
                width={768}
              /> */}
            </div>
          ))}
        </UICarousel>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-end items-start">
            {/* <div className="flex flex-row items-baseline gap-1">
              <UITypography variant="h3" className="text-teal-500">
                {`${billboard.price.currency} ${billboard.price.value}`}
              </UITypography>
              <UITypography
                variant="small"
                className="font-medium text-slate-800"
              >
                {billboard.price.rate}
              </UITypography>
            </div> */}
            {/* <UIIconButton color="white" className="rounded-full p-6">
              <BsBookmarkDashFill color="#2dd4bf" className="text-3xl" />
            </UIIconButton> */}
            {/* <UITypography>{billboard.description}</UITypography> */}
            {/* <div className="flex flex-row justify-between items-center">
              <UITypography variant="h4">{billboard.title}</UITypography>
              <div className="flex flex-row items-baseline gap-1">
                <UITypography variant="h3" color="" className="text-teal-500">
                  {`${billboard.price.currency} ${billboard.price.value}`}
                </UITypography>
                <UITypography variant="small" className="font-medium text-slate-800">
                  {billboard.price.rate}
                </UITypography>
              </div>
              <UIIconButton color="white" className="rounded-full p-6">
                <BsBookmarkDashFill color="#2dd4bf" className="text-3xl" />
                <BsBookmarkHeart color="#2dd4bf" className="text-3xl" />
              </UIIconButton>
            </div> */}
          </div>
          <UITypography>{billboard.description}</UITypography>
          <table className="w-full min-w-max table-auto text-center border border-slate-200 [&>thead>tr>th]:bg-transparent [&>thead>tr>th]:p-0 [&>thead>tr>th]:border [&>thead>tr>th]:border-slate-200 [&>thead>tr>th]:border-b-0">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography className="text-xs font-medium text-slate-400">
                    TYPE
                  </UITypography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography className="text-xs font-medium text-slate-400">
                    DIMENSION
                  </UITypography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography className="text-xs font-medium text-slate-400">
                    LOCATION
                  </UITypography>
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr>td]:border [&>tr>td]:border-slate-200 [&>tr>td]:border-t-0">
              <tr>
                <td>
                  <UITypography className="text-sm font-medium text-slate-800">
                    {billboard.type}
                  </UITypography>
                </td>
                <td>
                  <UITypography className="text-sm font-medium text-slate-800">{`${billboard.dimension.width} ${billboard.dimension.unit.abbrev} x ${billboard.dimension.height} ${billboard.dimension.unit.abbrev}`}</UITypography>
                </td>
                <td>
                  <UITypography className="text-sm font-medium text-slate-800">
                    {billboard.location}
                  </UITypography>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <ul className="flex flex-row justify-around mgap-2 p-2 bg-teal-50 rounded-md w-full ">
            <li>
              <UITypography className="text-xs font-medium text-slate-400">
                TYPE
              </UITypography>
              <UITypography className="text-sm font-medium text-slate-800">
                {billboard.type}
              </UITypography>
            </li>
            <UIDivider type="vertical" />
            <li>
              <UITypography className="text-xs font-medium text-slate-400">
                DIMENSION
              </UITypography>
              <UITypography className="text-sm font-medium text-slate-800">{`${billboard.dimension.width} ${billboard.dimension.unit.abbrev} x ${billboard.dimension.height} ${billboard.dimension.unit.abbrev}`}</UITypography>
            </li>
            <UIDivider type="vertical" />
            <li>
              <UITypography className="text-xs font-medium text-slate-400">
                LOCATION
              </UITypography>
              <UITypography className="text-sm font-medium text-slate-800">
                {billboard.location}
              </UITypography>
            </li>
          </ul> */}
        </div>
        {/* <div className="flex flex-row justify-between gap-4 w-full"> */}
        {/* <div className="w-[400px]"> */}
        {/* <UITypography className="text-sm font-bold">Status:</UITypography>
            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="flex flex-row justify-center items-center gap-1">
                <BsCircleFill className="text-sm text-teal-500" />
                <UITypography className="font-medium text-base text-slate-800">
                  {billboard.status}
                </UITypography>
              </div>
            </div> */}
        {/* </div> */}
        <div className="w-full">
          <div className="overflow-hidden flex flex-col items-center justify-center gap-3 w-full h-64 rounded-lg cursor-pointer bg-secondary-100 hover:brightness-[0.98] active:brightness-90">
            <div className="bg-secondary-200 rounded-full p-3">
              <IoLocationSharp className="text-secondary-400 text-6xl" />
            </div>
          </div>
        </div>
        {/* </div> */}
      </UICard>
      <div className="shrink-0 lg:w-96 w-full flex flex-col gap-6">
        {/* <UICard className="w-full p-8 flex flex-row items-baseline justify-center gap-1">
          <UITypography variant="h2" className="text-teal-500">
            {`${billboard.price.currency} ${billboard.price.value}`}
          </UITypography>
          <UITypography variant="small" className="font-medium text-slate-800">
            {billboard.price.rate}
          </UITypography>
        </UICard> */}
        <UIButton color="amber" variant="text" className="flex flex-row justify-center items-center gap-1 bg-amber-500/10 hover:bg-amber-600/10">
          <BsBookmarkDashFill className="text-xl" />
          {/* <BsBookmarkHeart color="#2dd4bf" className="text-3xl" /> */}
          <UITypography className="font-bold">Bookmark</UITypography>
        </UIButton>
        <div className="flex flex-col gap-1 ">
          <UITypography className="text-lg font-bold text-slate-600">
            Owned by
          </UITypography>
          <UICard className="p-4">
            <div className="flex flex-col gap-6">
              <Link href={billboard.owner.uid}>
                <UIButton
                  variant="text"
                  color="blue-gray"
                  className="flex flex-row justify-between items-center w-full"
                >
                  <div className="flex flex-row items-center gap-2">
                    <UIAvatar
                      src={billboard.owner.profile_image}
                      alt="avatar"
                      size="md"
                    />
                    <UITypography className="text-lg font-medium normal-case text-slate-800">
                      {billboard.owner.full_name}
                    </UITypography>
                  </div>
                  <FaAngleRight className="text-3xl font-light text-slate-800" />
                </UIButton>
              </Link>
              <UIDropdownButton
                color="teal"
                size="lg"
                className="w-full justify-center"
                arrow={false}
                menu={
                  <UIMenuList>
                    {billboard.owner.contacts.map((contact, i) => (
                      <UIMenuItem
                        key={contact.name}
                        onClick={() => setSelectedContact(i)}
                      >
                        {contact.name}
                      </UIMenuItem>
                    ))}
                  </UIMenuList>
                }
              >
                CONTACT
              </UIDropdownButton>
              {selectedContact !== null && (
                <div className="flex flex-col gap-4">
                  {billboard.owner.contacts[selectedContact].value.map(
                    (contact) => (
                      <Link key={contact} href={contact}>
                        <UIButton
                          variant="text"
                          color="amber"
                          className="normal-case underline w-full text-lg font-normal text-ellipsis"
                        >
                          {contact}
                        </UIButton>
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          </UICard>
        </div>
        <UICard className="flex flex-row justify-center items-center gap-1 p-4 bg-teal-50">
          <BsCircleFill className="text-sm text-teal-500" />
          <UITypography className="font-medium text-lg text-slate-800">
            {billboard.status}
          </UITypography>
        </UICard>
      </div>
    </main>
  )
}
