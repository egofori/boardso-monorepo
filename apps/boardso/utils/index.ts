export * from "./constants"

// converts stringified JSON object to object
export const stringToObject = (value: string | null | undefined) => JSON.parse(value || "null")

export const stringToHref = (type: string, value: string) => {
  switch (type) {
    case "EMAIL":
      return `mailto:${value}`
    case "PHONE":
      return `tel:${value}`
    default:
      return value
  }
}
