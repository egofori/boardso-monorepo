"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { BillboardsSearch } from "@/components/BillboardsSearch"
import { BillboardsList } from "@/components/BillboardsList"

export default function Page() {
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

  return (
    <main>
      <div className="w-full py-10 bg-white">
        <div className="layout-wrapper">
          <BillboardsSearch params={params} setParams={setParams} />
        </div>
      </div>
      <div className="layout-wrapper flex flex-col gap-7 py-7">
        <BillboardsList params={params} setParams={setParams} />
      </div>
    </main>
  )
}
