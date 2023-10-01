export * from "./constants"

// converts stringified JSON object to object
export const stringToJSON = (value: string | null | undefined) => (value ? JSON.parse(value) : null)

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
