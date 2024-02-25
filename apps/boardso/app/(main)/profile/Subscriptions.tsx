import { PageStatus } from "@/components/PageStatus"
import {
  UIButton,
  UICard,
  UICardBody,
  UICardHeader,
  UITooltip,
  UITypography,
  notification,
} from "ui"
import { useGetTransactions, useVerifyTransaction } from "@/services/hooks/transactions"
import { Transaction, VerifyTransaction } from "@/types/Transaction"
import CurrentPlan from "./CurrentPlan"
import { useGetUserStatus } from "@/services/hooks/users"
import { UserStatus } from "@/types/User"
import { AxiosError } from "axios"
import Link from "next/link"
import { getStatusColor } from "@/utils/index"
import dayjs from "dayjs"
import { useEffect, useState } from "react"

export function Subscriptions() {
  const {
    data: transactions,
    isLoading,
    error,
    mutate,
  }: { data: Transaction[]; [x: string]: any } = useGetTransactions()

  const { data: userStatus }: { data: UserStatus; error: AxiosError; isLoading: boolean } =
    useGetUserStatus()

  const [reference, setReference] = useState<string | null>(null)

  const {
    data: verificationData,
    isLoading: verificationLoading,
    error: verificationError,
  }: { data: VerifyTransaction; [x: string]: any } = useVerifyTransaction(reference)

  useEffect(() => {
    if (verificationError)
      notification("error", "Could not verify your payment. Please contact us for help.")
    if (verificationData) {
      notification("info", verificationData.message)
      mutate()
    }
  }, [verificationError, verificationData, mutate])

  return (
    <PageStatus
      data={transactions}
      isLoading={isLoading}
      error={error && "Unable to list transactions"}
      className="flex flex-col"
    >
      <UICard className="w-full p-5 sm:p-8">
        <UITypography variant="h3" className="page-card-title">
          Subscriptions
        </UITypography>
        <UICardHeader className="m-0 shadow-none flex flex-col gap-5 mt-5 mb-10 rounded-none">
          <div>
            <CurrentPlan data={userStatus} className="max-w-[350px]" />
          </div>
          <div className="flex flex-row justify-end">
            <UITooltip
              placement="bottom"
              content={
                userStatus?.isSubscriptionActive ? "You already have an active subscription" : null
              }
            >
              <Link href={userStatus?.isSubscriptionActive ? "" : "/pricing"}>
                <UIButton disabled={userStatus?.isSubscriptionActive}>Pay subscription</UIButton>
              </Link>
            </UITooltip>
          </div>
        </UICardHeader>
        <UICardBody className="overflow-x-auto p-0 flex flex-col gap-3">
          <UITypography variant="h4">Transaction history</UITypography>
          <table className="w-full min-w-max table-auto text-left [&>thead>tr>th>p]:text-center [&>thead>tr>th>p]:text-slate-500">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    Plan
                  </UITypography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    Amount
                  </UITypography>
                </th>

                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    Payment Status
                  </UITypography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    Payment Date
                  </UITypography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    Expires On
                  </UITypography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <UITypography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    Action
                  </UITypography>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr key={transaction.id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <UITypography variant="small" color="blue-gray" className="font-normal">
                      {transaction.plan.name}
                    </UITypography>
                  </td>
                  <td className="p-4">
                    <UITypography variant="small" color="blue-gray" className="font-normal">
                      {(transaction.plan.amount / 100).toFixed(2)}
                    </UITypography>
                  </td>
                  <td className="p-4">
                    <UITypography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                      style={{ color: getStatusColor(transaction.status.toLowerCase()) }}
                    >
                      {transaction.status}
                    </UITypography>
                  </td>
                  <td className="p-4">
                    <UITypography variant="small" color="blue-gray" className="font-normal">
                      {(transaction.paidAt && dayjs(transaction.paidAt).format("LL")) || "-"}
                    </UITypography>
                  </td>
                  <td className="p-4">
                    <UITypography variant="small" color="blue-gray" className="font-normal">
                      {(transaction.subscription?.expiresAt &&
                        dayjs(transaction.subscription?.expiresAt).format("LL")) ||
                        "-"}
                    </UITypography>
                  </td>
                  <td className="p-4">
                    {transaction.status === "PENDING" ? (
                      <UIButton
                        loading={reference === transaction.reference && verificationLoading}
                        onClick={() => setReference(transaction.reference)}
                        variant="text"
                      >
                        Verify transaction
                      </UIButton>
                    ) : (
                      <UITypography variant="small" color="blue-gray" className="font-normal">
                        None
                      </UITypography>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </UICardBody>
      </UICard>
    </PageStatus>
  )
}
