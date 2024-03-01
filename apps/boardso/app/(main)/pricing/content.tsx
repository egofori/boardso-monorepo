"use client"

import { PageStatus } from "@/components/PageStatus"
import { PricingCard } from "@/components/PricingCard"
import { useGetPlans } from "@/services/hooks/transactions"
import { Plan } from "@/types/Transaction"
import { UITypography } from "ui"

export default function Content() {
  const { data: plans, isLoading, error }: { data: Plan[]; [x: string]: any } = useGetPlans()

  const points = [
    ["Same premium benefits as 1 year plan", "Lasts for a month"],
    [
      "Unlimited billboard listings",
      "Access to all standard & premium features",
      "Life time technical support",
      "Lasts for a year",
    ],
    ["3 free billboard listings", "Access to all standard features", "Lasts forever"],
  ]

  const freePlan = plans?.filter((plan) => plan.amount === 0)[0]
  const oneMonthPlan = plans?.filter((plan) => plan.period === "month" && plan.number === 1)[0]
  const oneYearPlan = plans?.filter((plan) => plan.period === "year" && plan.number === 1)[0]

  return (
    <PageStatus isLoading={isLoading} data={plans} error={error && "An unknown error occurred"}>
      <main className="layout-wrapper flex flex-col gap-6 pb-5">
        <div className="flex flex-col gap-2 py-3">
          <UITypography variant="h2">Subscription plans</UITypography>
          <UITypography variant="paragraph">
            You are one step away from showcasing your billboards to the world, please choose a plan
            to continue.
          </UITypography>
          <UITypography>
            <b>Note:</b> Paying for a month or a year plan gets you the same benefits at their
            respective durations.
          </UITypography>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
          {oneYearPlan && <PricingCard plan={oneYearPlan} points={points[1]} />}
          {oneMonthPlan && <PricingCard plan={oneMonthPlan} points={points[0]} />}
          {freePlan && <PricingCard plan={freePlan} points={points[2]} />}
        </div>
      </main>
    </PageStatus>
  )
}
