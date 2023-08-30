import { useEffect, useState } from "react"

export const useValue = (data: any) => {
  const [value, setValue] = useState<typeof data>()

  useEffect(() => {
    setValue(data)
  }, [data])

  return value
}
