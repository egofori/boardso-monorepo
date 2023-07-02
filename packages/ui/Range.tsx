"use client"

import TooltipSlider from "rc-slider"
import "rc-slider/assets/index.css"
// import { Slider } from "@material-tailwind/react";

function UIRange(props: any) {
  return (
    <TooltipSlider
      allowCross={false}
      railStyle={{ height: 6 }}
      trackStyle={{ backgroundColor: "#4b5563", height: 6 }}
      handleStyle={{
        height: 18,
        width: 18,
        borderColor: "#4b5563",
        opacity: 1,
      }}
      range
      {...props}
    />
  )
}

export { UIRange }
