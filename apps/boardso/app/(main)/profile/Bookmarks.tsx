import { PageStatus } from "@/components/PageStatus"
import { Billboard } from "@/types/Billboard"
import {
  UIButton,
  UICard,
  UICardBody,
  UIDropdownButton,
  UIMenuItem,
  UIMenuList,
  UITypography,
} from "ui"
import { useMemo, useState } from "react"
import { useGetBookmarks } from "@/services/hooks"
import { useSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { Pagination } from "@/types/index"
import { sorts } from "@/utils/constants"
import Loader from "@/components/Loader"
import BillboardCard from "@/components/BillboardCard"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"

export function Bookmarks() {
  const {
    data: billboardsData,
    isLoading,
    error,
  }: { data: Pagination | null; [x: string]: any } = useGetBookmarks()
  const billboards: Billboard[] = billboardsData ? billboardsData.results : []

  const offset = 0
  const limit = 10
  const searchParams = useSearchParams()

  const getParams = useMemo(() => {
    const params: any = { offset, limit }
    Array.from(searchParams.keys()).forEach((key) => {
      if (searchParams.get(key)) params[key] = searchParams.get(key)
    })

    return params
  }, [searchParams])
  const [params, setParams] = useState<any>(getParams)

  const start = useMemo(() => Number(params.offset) + 1, [params.offset])
  const end = useMemo(
    () => Number(params.offset) + Number(params.limit),
    [params.limit, params.offset]
  )

  const getSelectedSort = useMemo(() => {
    const sort = sorts.filter((type) => type.value === searchParams.get("sort"))[0]
    return sort ?? sorts[0]
  }, [searchParams])

  const [selectedSort, setSelectedSort] = useState(getSelectedSort)

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
    <PageStatus
      data={billboardsData}
      isLoading={isLoading}
      error={error && "Unable to list contacts"}
    >
      <UICard className="w-full p-2 pt-6">
        <UITypography variant="h3" className="text-tertiary-800 text-center text-[25px] sm:text-[30px] mb-3">
          Bookmarks
        </UITypography>
        <UICardBody className="overflow-x-auto">
          <div
            className={twMerge(
              "flex flex-row items-center",
              billboardsData && billboardsData.count > 0 ? "justify-between" : "justify-end"
            )}
          >
            {billboardsData && billboardsData.count > 0 ? (
              <UITypography className="text-slate-800 text-lg">
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
              <UITypography className="normal-case">{selectedSort.label}</UITypography>
            </UIDropdownButton>
          </div>
          {isLoading ? (
            <div className="h-[150px] w-full flex flex-row justify-center items-center">
              <Loader size="40px" />
            </div>
          ) : billboards?.length === 0 ? (
            <div className="h-[150px] w-full flex flex-row justify-center items-center bg-white">
              <UITypography className="info-text">
                No bookmarks are available yet!
              </UITypography>
            </div>
          ) : (
            <div className={"grid grid-flow-row grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"}>
              {billboards?.map((billboard) => (
                <BillboardCard key={billboard.slug} data={billboard} />
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
        </UICardBody>
      </UICard>
    </PageStatus>
  )
}
