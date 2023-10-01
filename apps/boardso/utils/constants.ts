export const defaultBillboardThumbnail = "/assets/images/erik-mclean-wj_Tjw7oV-g-unsplash.jpg"

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
  { label: "for sale", value: "PER_SALE" },
]

export const sorts = [
  { label: "Newest", value: "DATE_DESC" },
  { label: "Oldest", value: "DATE_ASC" },
  { label: "Highest price", value: "PRICE_DESC" },
  { label: "Lowest price", value: "PRICE_ASC" },
]

export const contactTypes = [
  { label: "Link", value: "URL", titlePlaceholder: "eg. WhatsApp", contactPlaceholder: "https://example.com" },
  { label: "Email", value: "EMAIL", titlePlaceholder: "eg. Support Email", contactPlaceholder: "john@example.com" },
  { label: "Phone number", value: "PHONE", titlePlaceholder: "eg. Phone number", contactPlaceholder: "0540000000" },
]
