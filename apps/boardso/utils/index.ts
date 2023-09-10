export * from "./constants"

// converts stringified JSON object to object
export const stringToObject = (value: string | null | undefined) => JSON.parse(value || "null")
