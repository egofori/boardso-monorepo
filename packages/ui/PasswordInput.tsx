import React, { useState } from "react"
import { UIInput, Props as UIInputProps } from "./Input"
import { UIIconButton } from "./IconButton"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { UIConnectInput } from "./ConnectInput"

interface Props extends UIInputProps {
  name: string
  ref?: React.Ref<HTMLInputElement> | undefined
}

function UIPasswordInput(props: Props) {
  const [passwordVisible, setPasswordInvisible] = useState<boolean>(false)

  return (
    <div className="relative">
      <UIConnectInput type={passwordVisible ? "text" : "password"} {...props} />
      <UIIconButton
        color="white"
        className="absolute right-[7px] top-[7px] rounded-full h-[30px] w-[30px]"
        onClick={() => setPasswordInvisible(!passwordVisible)}
      >
        {passwordVisible ? (
          <IoEyeOutline className="text-[20px] text-slate-500" />
          ) : (
            <IoEyeOffOutline className="text-[20px] text-slate-500" />
        )}
      </UIIconButton>
    </div>
  )
}

export { UIPasswordInput }
