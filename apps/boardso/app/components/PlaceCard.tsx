"use client"

import { twMerge } from "tailwind-merge"
import { UICard, UITypography } from "ui"
import { useRouter } from "next/navigation"
import { PopularPlace } from "@/types/Billboard"
import Link from "next/link"

type Props = {
  className?: string
  data: PopularPlace
  image: any
}

export default function PlaceCard({ className, data, image }: Props) {
  const router = useRouter()

  return (
    <Link href={`/billboards?location=${data.sublocality || data.locality}`}>
      <UICard
        onClick={() => router.push("/billboards")}
        shadow={false}
        className={twMerge(
          "cursor-pointer relative w-full h-[120px] overflow-hidden flex flex-col gap-1 justify-center items-center bg-cover bg-center",
          className
        )}
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
        <UITypography
          color="white"
          className="font-medium text-white text-2xl z-[1]"
        >
          {data.sublocality || data.locality}
        </UITypography>
        <UITypography className="mb-4 text-white text-xl z-[1]">
          {data.administrativeAreaLevel2}
        </UITypography>
      </UICard>
    </Link>
  )
}
