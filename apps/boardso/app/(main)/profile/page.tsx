"use client"

import React, { useEffect, useMemo, useState } from "react"
import { UICard, UITab, UITabPanel, UITabs, UITabsBody, UITabsHeader } from "ui"
import Profile from "./Profile"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Contacts } from "./Contacts"
import { Bookmarks } from "./Bookmarks"

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const getActiveTab = useMemo(() => {
    let activeTab = Number(searchParams.get("t"))

    if (!activeTab) activeTab = 0

    return activeTab
  }, [searchParams])

  const [activeTab, setActiveTab] = useState(getActiveTab)

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    current.set("t", activeTab.toString())

    const search = current.toString()
    const query = search ? `?${search}` : ""
    router.replace(`${pathname}${query}`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab])

  return (
    <main className="layout-wrapper flex flex-row py-5">
      <UITabs
        orientation="vertical"
        value={activeTab}
        className="w-full flex flex-col sm:flex-row gap-2"
      >
        <UITabsHeader
          className="w-full sm:w-[250px] md:w-[300px] bg-transparent z-0"
          indicatorProps={{
            className: "bg-slate-100 shadow-none",
          }}
        >
          <UICard className="p-4">
            <UITab value={0} onClick={() => setActiveTab(0)}>
              Profile
            </UITab>
            <UITab value={1} onClick={() => setActiveTab(1)}>
              Contacts
            </UITab>
            <UITab value={2} onClick={() => setActiveTab(2)}>
              Bookmarks
            </UITab>
          </UICard>
        </UITabsHeader>
        <UITabsBody className="w-full">
          <UITabPanel value={0} className="p-0">
            {activeTab === 0 && <Profile />}
          </UITabPanel>
          <UITabPanel value={1} className="p-0">
            {activeTab === 1 && <Contacts />}
          </UITabPanel>
          <UITabPanel value={2} className="p-0">
            {activeTab === 2 && <Bookmarks />}
          </UITabPanel>
        </UITabsBody>
      </UITabs>
    </main>
  )
}
