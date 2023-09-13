import Loader from "@/components/Loader"

export default function Loading() {
  return (
    <div className="w-screen h-[calc(100%-83px)] flex flex-row justify-center items-center">
      <Loader size="40px" />
    </div>
  )
}
