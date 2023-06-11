"use client"

import Lottie from "lottie-react";
import loader3Dots from "@/lottie_files/loader-3dots.json";

export default function MoreLoader() {
  return (
    <Lottie animationData={loader3Dots} loop={true} className="w-[200px]" />
  )
}
