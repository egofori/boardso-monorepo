"use client"

import { twMerge } from "tailwind-merge"
import { UICard, UITypography } from "ui"
import { useRouter } from "next/navigation"

type Props = {
  className?: string
  data: {
    image?: string
    location?: string
  }
}

export default function PlaceCard({ className, data }: Props) {
  const router = useRouter()

  return (
    <UICard
      onClick={(e) => router.push("/billboards")}
      shadow={false}
      className={twMerge(
        "cursor-pointer relative w-[calc((100%/2)-16px)] md:w-[calc((700px/3)-16px-16px)] lg:w-[calc((950px/4)-16px-16px)] xl:w-[calc((1000px/4)-16px-16px)] 2xl:w-[calc((1300px/4)-16px-16px)] h-[calc((100vw/2)-16px-16px)] md:h-[calc((700px/3)-16px-16px)] lg:h-[calc((950px/4)-16px-16px)] xl:h-[calc((1000px/4)-16px-16px)] 2xl:h-[calc((1300px/4)-16px-16px)] m-2 overflow-hidden flex flex-col gap-1 justify-center items-center bg-cover bg-center",
        className
      )}
      style={{ backgroundImage: `url('${data.image}')` }}
    >
      <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      <UITypography
        color="white"
        className="font-medium text-white text-3xl z-[1]"
      >
        {data.location?.split(",")[0]}
      </UITypography>
      <UITypography className="mb-4 text-white text-2xl z-[1]">
        {data.location?.split(",")[1]}
      </UITypography>
    </UICard>
  )
}
