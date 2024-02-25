"use client"

import { UIButton, UITooltip, UITypography } from "ui"
import SearchInput from "../../components/SearchInput"
import { BiPlus } from "react-icons/bi"
import PlaceCard from "@/components/PlaceCard"
import Link from "next/link"
import { useGetPopularPlaces } from "@/services/hooks"
import { PopularPlace } from "@/types/Billboard"
import Loader from "@/components/Loader"
import { placeImages } from "@/utils/constants"
import { useDisableAddBillboard } from "@/utils/hooks"

export default function Content() {
  const {
    data: popularPlacesData,
    isLoading: popularPlacesLoading,
  }: { data: PopularPlace[]; [x: string]: any } = useGetPopularPlaces()

  const disableAddBillboard = useDisableAddBillboard()

  const popularPlaces = popularPlacesData ?? []

  return (
    <main>
      <div
        className="h-[300px] sm:h-[400px] md:h-[500px] flex justify-center items-center flex-col gap-5 bg-no-repeat bg-cover relative px-4"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/boardso-media/site-media/hero_image.jpg')",
        }}
      >
        <div className="h-full w-full bg-black/40 absolute" />
        <SearchInput className="z-[1]" />
        <UITooltip placement="bottom" content="Click to add a new billboard listing">
          <Link href={disableAddBillboard ? "/pricing" : "/add-billboard"} className="z-[1]">
            <UIButton
              size="md"
              className="text-white bg-tertiary-200/50 hover:bg-tertiary-200/60 rounded-full text-lg font-medium flex items-center"
            >
              <BiPlus fontSize="25px" />
              Add Billboard
            </UIButton>
          </Link>
        </UITooltip>
      </div>
      <div className="py-14">
        <div className="layout-wrapper flex flex-col gap-6 my-2">
          <div className="flex flex-col gap-2">
            <UITypography variant="h4" className="text-tertiary-700 text-[20px]">
              Popular places
            </UITypography>
            {popularPlacesLoading ? (
              <div className="h-[150px] w-full flex flex-row justify-center items-center ">
                <Loader size="40px" />
              </div>
            ) : (
              <>
                {popularPlaces.length === 0 ? (
                  <div className="h-[150px] w-full flex flex-row justify-center items-center ">
                    <UITypography className="info-text">
                      No billboards are available yet!
                    </UITypography>
                  </div>
                ) : (
                  <div className="grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {popularPlaces?.map((place, i) => (
                      <PlaceCard
                        key={place.sublocality || place.locality}
                        data={place}
                        image={placeImages[i]}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-teal-100 py-14">
        <div className="layout-wrapper flex flex-col gap-10">
          <div>
            <UITypography variant="h2">Let the World find your Billboards easily</UITypography>
            <UITypography className="text-xl">
              Manage all your billboard sites in one place
            </UITypography>
          </div>
          <div>
            <UITypography className="text-2xl font-bold text-center uppercase mb-4">
              Watch this video to help you get started
            </UITypography>
            <div className="rounded-lg overflow-hidden relative aspect-w-16 aspect-h-9">
              <iframe
                width="852"
                height="480"
                src="https://www.youtube.com/embed/UPm83aiMFk0"
                title="Getting started with Boardso app"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
