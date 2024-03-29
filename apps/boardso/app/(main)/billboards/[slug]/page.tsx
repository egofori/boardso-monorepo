import { Metadata } from "next"
import Content from "./content"
import { Billboard } from "@/types/Billboard"
import { defaultBillboardThumbnail, periods } from "@/utils/constants"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params

  let title
  let description
  let ogImage = {
    url: "",
    width: 500,
    height: 500,
    alt: "Boardso preview image",
  }
  let ogDescription

  try {
    const baseURL = process.env["NEXT_PUBLIC_API_BASE_URL"]
    const billboard: Billboard = await fetch(`${baseURL}/billboards/billboard?slug=${slug}`).then(
      (res) => res.json()
    )
    const {
      isActive,
      width,
      height,
      owner,
      type,
      price,
      rate,
      currency,
      billboardLocation: { address },
      images,
      thumbnailId,
    } = billboard || {}

    if (isActive) {
      if (images.length === 0) ogImage.url = defaultBillboardThumbnail
      else if (thumbnailId) {
        ogImage.url = images.filter((image) => image.id === thumbnailId)[0]?.url
      } else {
        ogImage.url = images[0]?.url
      }

      const amount =
        price && rate && currency
          ? `·${currency} ${price} ${periods.filter((period) => rate === period.value)[0].label} `
          : ""
      title = billboard.title
      description = `${width} ft x ${height} ft ${type} billboard at ${address} by ${owner.firstName} ${owner.lastName} ${amount}· ${billboard.description} · Add & find billboard spaces for free in Ghana/Africa on www.boardso.com today`
      ogDescription = `${width} ft x ${height} ft ${type} billboard at ${address} by ${owner.firstName} ${owner.lastName} ${amount}· ${billboard.description}`
    }
  } catch {}

  return {
    title,
    description,
    openGraph: { description: ogDescription, images: ogImage.url ? [ogImage] : [] },
    twitter: {
      title,
      description: ogDescription,
      images: ogImage.url ? [ogImage] : [],
    },
  }
}

export default function Page() {
  return <Content />
}
