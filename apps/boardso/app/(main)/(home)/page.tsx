"use client"

import { UIButton, UITypography } from "ui";
import SearchInput from "../../components/SearchInput";
import { BiPlus } from "react-icons/bi"
import MoreLoader from "@/components/MoreLoader";
import PlaceCard from "@/components/PlaceCard";
import Link from "next/link";

export default function Page() {
  // dummy data
  const places = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((place, i) => ({ id: i, location: "Ablekuma, Accra", image: "https://images.unsplash.com/photo-1541951991883-a34a3024c94a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80" }))

  return (
    <>
      <div className="h-[500px] flex justify-center items-center flex-col gap-5 bg-hero-image bg-no-repeat bg-cover bg-center relative" >
        <div className="h-full w-full bg-black/40 absolute" />
        <SearchInput className="z-[1]" />
        <Link href="/add-billboard" className="z-[1]">
          <UIButton size="md" className="text-white bg-tertiary-200/50 hover:bg-tertiary-200/60 rounded-full text-lg font-medium flex items-center">
            <BiPlus fontSize="25px" />
            Add Billboard
          </UIButton>
        </Link>
      </div>
      <div className="py-5">
        <div className="layout-wrapper">
          <UITypography variant="h4" className="pl-2 text-tertiary-700 my-2">Popular places</UITypography>
          <div className="flex flex-row flex-wrap">
            {
              places.map((place) => <PlaceCard key={place.id} data={place} />)
            }
          </div>
          <div className="w-full flex justify-center">
            <MoreLoader />
          </div>
        </div>
      </div>
    </>
  )
}
