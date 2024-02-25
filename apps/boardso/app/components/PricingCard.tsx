import { UIButton, UICard, UICardBody, UICardHeader, UITypography, notification } from "ui"
import { Plan } from "@/types/Transaction"
import { useInitializeTransaction } from "@/services/hooks/transactions"
import { twMerge } from "tailwind-merge"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

function CheckIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={twMerge("h-3 w-3", className)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

type Props = {
  plan: Plan
  points: string[]
  className?: string
}

export function PricingCard({ plan, points, className }: Props) {
  const router = useRouter()

  const {
    data,
    trigger: initializeTransactionTrigger,
    error,
    isLoading,
  } = useInitializeTransaction()

  const paySubscription = (id: number) => {
    initializeTransactionTrigger({ data: { planId: id } })
  }

  useEffect(() => {
    const responseData = data?.data

    if (responseData?.authorizationURL && !isLoading) router.push(responseData?.authorizationURL)
    
    if (responseData?.message) notification("info", responseData.message)
  }, [data, isLoading, router])

  useEffect(() => {
    if (error) {
      notification(
        "error",
        error?.response?.data?.message ||
          "An error occurred. Please try again. Or contact us for support."
      )
    }
  }, [error])

  return (
    <UICard className={twMerge("w-full max-w-[20rem] h-min p-8 shadow", className)}>
      <UICardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-black/10 pb-8 text-center"
      >
        <UITypography variant="small" className="font-normal uppercase">
          {plan.name}
        </UITypography>
        <UITypography variant="h1" className="mt-6 flex justify-center gap-1 text-5xl font-normal">
          <span className="mt-2 text-4xl">{plan.currency}</span>
          {plan.amount / 100}
        </UITypography>
        {/* for free plan */}
        <UITypography variant="paragraph" className="mt-2">
          {plan.number === 0 ? "Forever" : `For ${plan.number} ${plan.period}`}
        </UITypography>
        {plan.amount !== 0 && (
          <UIButton
            size="lg"
            className="mt-3"
            ripple={false}
            fullWidth={true}
            onClick={() => paySubscription(plan.id)}
            loading={isLoading}
          >
            Pay Now
          </UIButton>
        )}
      </UICardHeader>
      <UICardBody className="p-0">
        <ul className="flex flex-col gap-4">
          {points.map((point: string, index: number) => (
            <li key={index} className="flex items-center gap-4">
              <span className="rounded-full border border-black/30 p-1">
                <CheckIcon className="text-black/30" />
              </span>
              <UITypography className="font-normal">{point}</UITypography>
            </li>
          ))}
        </ul>
      </UICardBody>
    </UICard>
  )
}
