"use client"

import BillboardCard from "@/components/BillboardCard"
import { useEffect, useMemo, useState } from "react"
import { UIDropdownButton, UITypography, UIButton, UIMenuList, UIMenuItem } from "ui"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"
import { useSearchBillboards } from "@/services/hooks"
import { Billboard } from "@/types/Billboard"
import { useParams, useSearchParams } from "next/navigation"
import { sorts } from "@/utils/constants"
import { Pagination } from "@/types/index"
import Loader from "@/components/Loader"
import { User } from "@/types/User"

export function BillboardsList({
  params,
  setParams,
  owner,
}: {
  params: any
  setParams: Function
  owner?: User | null
}) {
  const { owner: username } = useParams<{ owner: string }>()
  const searchParams = useSearchParams()

  const getSelectedSort = useMemo(() => {
    const sort = sorts.filter((type) => type.value === searchParams.get("sort"))[0]
    return sort ?? sorts[0]
  }, [searchParams])

  const [selectedSort, setSelectedSort] = useState(getSelectedSort)

  const start = useMemo(() => Number(params.offset) + 1, [params.offset])
  const end = useMemo(
    () => Number(params.offset) + Number(params.limit),
    [params.limit, params.offset]
  )

  const { data: billboardsData, isLoading, mutate }: { data: Pagination | null; [x: string]: any } =
    useSearchBillboards({ ...params, username: username })

  const billboards: Billboard[] = billboardsData ? billboardsData.results : []

  useEffect(() => {
    if (selectedSort) setParams({ ...params, sort: selectedSort.value })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort])

  const sortMenu = (data: Array<any>, onClick: Function) => (
    <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
      {data.map((row: any) => (
        <UIMenuItem key={row.value} onClick={() => onClick(row)}>
          <UITypography className="text-tertiary-800">{row.label}</UITypography>
        </UIMenuItem>
      ))}
    </UIMenuList>
  )

  return (
    <>
      <div
        className={twMerge(
          "flex flex-row items-center",
          billboardsData && billboardsData.count > 0 ? "justify-between" : "justify-end"
        )}
      >
        {billboardsData && billboardsData.count > 0 ? (
          <UITypography className="text-slate-800">
            Showing{" "}
            <b>
              {start} - {end < billboardsData.count ? end : billboardsData.count}
            </b>{" "}
            of <b>{billboardsData.count}</b> billboards
          </UITypography>
        ) : (
          <></>
        )}
        <UIDropdownButton
          color="amber"
          variant="text"
          size="sm"
          menu={sortMenu(sorts, setSelectedSort)}
        >
          <UITypography className="normal-case whitespace-nowrap">{selectedSort.label}</UITypography>
        </UIDropdownButton>
      </div>
      {isLoading ? (
        <div className="h-[150px] w-full flex flex-row justify-center items-center">
          <Loader size="40px" />
        </div>
      ) : billboards?.length === 0 ? (
        <div className="h-[150px] w-full flex flex-row justify-center items-center bg-white">
          <UITypography className="info-text">
            No billboards are available yet!
          </UITypography>
        </div>
      ) : (
        <div
          className={twMerge(
            "grid grid-flow-row grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2",
            username ? "lg:grid-cols-2 xl:grid-cols-2" : "lg:grid-cols-3 2xl:grid-cols-4"
          )}
        >
          {billboards?.map((billboard) => (
            <BillboardCard
              key={billboard.slug}
              data={billboard}
              editable={billboard.owner.username === owner?.username}
              refetch={mutate}
            />
          ))}
        </div>
      )}
      {billboardsData?.next === null && billboardsData?.previous === null ? (
        <></>
      ) : (
        <div className="flex flex-row gap-3 justify-end">
          <UIButton
            size="md"
            variant="outlined"
            color="blue-gray"
            className="flex flex-row items-center gap-1"
            onClick={() => {
              setParams({ ...params, ...billboardsData?.previous })
            }}
            disabled={!billboardsData?.previous}
          >
            <FaAngleLeft />
            Previous
          </UIButton>
          <UIButton
            color="blue-gray"
            className="flex flex-row items-center gap-1"
            onClick={() => {
              setParams({ ...params, ...billboardsData?.next })
            }}
            disabled={!billboardsData?.next}
          >
            Next
            <FaAngleRight />
          </UIButton>
        </div>
      )}
    </>
  )
}
