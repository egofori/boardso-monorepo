export const stringToObject = (value: string | null | undefined) => JSON.parse(value || "null")
