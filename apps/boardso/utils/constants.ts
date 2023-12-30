import { Metadata } from "next"

export const defaultBillboardThumbnail = "https://storage.googleapis.com/boardso-media/site-media/default-billboard-thumbnail.jpg"

export const billboardTypes = [
  { label: "Static billboard", value: "STATIC" },
  { label: "Digital billboard", value: "DIGITAL" },
]

export const unitsOfMeasurement = [
  { label: "feet", value: "FEET" },
  { label: "meters", value: "METERS" },
]

export const currencies = [
  { label: "GHS", value: "GHS" },
  { label: "USD", value: "USD" },
]

export const periods = [
  { label: "per month", value: "PER_MONTH" },
  { label: "per year", value: "PER_YEAR" },
  { label: "for sale", value: "FOR_SALE" },
]

export const sorts = [
  { label: "Newest", value: "DATE_DESC" },
  { label: "Oldest", value: "DATE_ASC" },
  { label: "Highest price", value: "PRICE_DESC" },
  { label: "Lowest price", value: "PRICE_ASC" },
]

export const contactTypes = [
  {
    label: "Link",
    value: "URL",
    titlePlaceholder: "eg. WhatsApp",
    contactPlaceholder: "https://example.com",
  },
  {
    label: "Email",
    value: "EMAIL",
    titlePlaceholder: "eg. Support Email",
    contactPlaceholder: "john@example.com",
  },
  {
    label: "Phone number",
    value: "PHONE",
    titlePlaceholder: "eg. Phone number",
    contactPlaceholder: "0540000000",
  },
]

export const placeImages = [
  "https://storage.googleapis.com/boardso-media/site-media/place01.jpg",
  "https://storage.googleapis.com/boardso-media/site-media/place02.jpg",
  "https://storage.googleapis.com/boardso-media/site-media/place03.jpg",
  "https://storage.googleapis.com/boardso-media/site-media/place04.jpg",
  "https://storage.googleapis.com/boardso-media/site-media/place05.jpg",
  "https://storage.googleapis.com/boardso-media/site-media/place06.jpg",
]

export const defaultMetadata: Metadata = {
  title: {
    template: "%s - Boardso",
    default: "Add & Find Billboard spaces at Boardso.com",
  },
  description:
    "Add & find billboard spaces. Boardso.com will help you find available billboard spaces. Billboard owners can add billboards for free. There are static and digital billboards for your advertising needs.",
  applicationName: "Boardso",
  keywords: ["Board", "Billboard", "Ghana", "Advert", "Advertisement", "Spaces"],
  openGraph: {
    title: "Boardso: Add & Find Billboard spaces",
    description:
    "Add & find billboard spaces. Boardso.com will help you find available billboard spaces. Billboard owners can add billboards for free. There are static and digital billboards for your advertising needs.",
    url: "https://boardso.com",
    siteName: "Boardso",
    images: [
      {
        url: "https://storage.googleapis.com/boardso-media/site-media/boardso-ogg.jpg",
        width: 889,
        height: 500,
        alt: "Boardso preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boardso",
    description:
      "Add & find billboard spaces. Boardso.com will help you find your billboard spaces available for free. Billboard owners can add billboards for free. We have static and digital billboards for all your advertising needs.",
    images: ["https://storage.googleapis.com/boardso-media/site-media/boardso-ogg.jpg"],
  },
  icons: {
    icon: "https://storage.googleapis.com/boardso-media/site-media/icon.png",
    shortcut: "https://storage.googleapis.com/boardso-media/site-media/icon.png",
    apple: "https://storage.googleapis.com/boardso-media/site-media/icon.png",
  },
}
