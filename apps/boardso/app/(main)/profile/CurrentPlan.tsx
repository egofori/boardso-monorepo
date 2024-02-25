import { UserStatus } from "@/types/User"
import dayjs from "dayjs"
import { twMerge } from "tailwind-merge"
import { UICard, UITypography } from "ui"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { getStatusColor } from "@/utils/index"

dayjs.extend(localizedFormat)

type Props = {
  subscription?: any
  className?: string
  data: UserStatus
}

export default function CurrentPlan({ data, className }: Props) {

  const planStatus = data
    ? data.isSubscriptionActive || !data.subscribedAt
      ? "ACTIVE"
      : "EXPIRED"
    : "PENDING"

  return (
    <UICard className={twMerge("p-4 flex flex-col gap-2", className)} style={{ borderColor: getStatusColor(planStatus.toLowerCase())}}>
        <UITypography variant="small" className="font-normal text-slate-400">
          Current plan
        </UITypography>
        <UITypography variant="h5">{data?.currentPlan ?? "--"}</UITypography>
        <ul className="[&>li]:flex [&>li]:flex-row [&>li]:gap-1 flex flex-col gap-1">
          <li>
            <UITypography variant="small" className="font-normal">
              Days left:
            </UITypography>
            <UITypography variant="small">{data?.daysLeft || "-"}</UITypography>
          </li>
          <li>
            <UITypography variant="small" className="font-normal">
              Payment date:
            </UITypography>
            <UITypography variant="small">
              {data?.subscribedAt ? dayjs(data.subscribedAt).format("LL") : "-"}
            </UITypography>
          </li>
          <li>
            <UITypography variant="small" className="font-normal">
              Expires on:
            </UITypography>
            <UITypography variant="small">
              {data?.subscriptionExpiresAt ? dayjs(data.subscriptionExpiresAt).format("LL") : "-"}
            </UITypography>
          </li>
        </ul>
      <div className="flex flex-row justify-end">
        <UITypography
          variant="small"
          className="font-normal"
          style={{ color: getStatusColor(planStatus.toLowerCase()) }}
        >
          {planStatus}
        </UITypography>
      </div>
    </UICard>
  )
}
