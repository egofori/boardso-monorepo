import React from "react"
import { useFormContext } from "react-hook-form"
import { UIInput, Props as UIInputProps } from "./Input"

interface Props extends UIInputProps {
  name: string
  ref?: React.Ref<HTMLInputElement> | undefined
}

function UIConnectInput ({ name, ...rest }: Props) {
  const methods = useFormContext()

  return <UIInput {...methods?.register(name)} {...rest} />
}

export { UIConnectInput }
