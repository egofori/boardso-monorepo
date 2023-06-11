"use client"

import {
  UICard,
  UICardBody,
  UICardFooter,
  UICardHeader,
  UITypography,
} from "ui";
// #00C1A2FF
export default function BillboardCard({ className }:{ className?: string }) {
  return (
    <UICard className={`shadow-slate-300 shadow-md min-w-[200px] w-full md:w-[332px] ${className}`}>
      <UICardHeader
        floated={false}
        shadow={false}
        color="transparent"
      >
        <div className="w-full h-[250px] bg-cover bg-center bg-[url('/assets/images/erik-mclean-wj_Tjw7oV-g-unsplash.jpg')]" />
      </UICardHeader>
      <UICardBody className="mb-1">
        <div className="flex items-center justify-between mb-2">
          <UITypography color="blue-gray" className="font-medium">
            Apple AirPods
          </UITypography>
          <div className="p-1 bg-teal-300">
            <UITypography color="blue-gray" className="font-medium">$95.00</UITypography>
          </div>
        </div>
        <UITypography variant="small" color="gray" className="font-normal opacity-75">Static billboard</UITypography>
        <UITypography variant="small" color="gray" className="font-normal opacity-75">Ablekuma, Accra</UITypography>
      </UICardBody>
      <UICardFooter className="flex justify-end pt-0">
        <UITypography variant="small" className="font-normal italic">Promoted</UITypography>
      </UICardFooter>
    </UICard>
  );
}
