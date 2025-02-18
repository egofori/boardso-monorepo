import { UIButton, UITypography } from "ui"

export function VerifyEmail({ email, ok }: { email: string, ok: Function }) {
  return (
    <>
      <UITypography variant="h3" className="text-tertiary-800 text-center mb-3">
        Verify Email
      </UITypography>
      <div className="flex flex-col gap-6">
        <UITypography>
          We&apos;ve sent an email to <b>{email}</b> to verify your account.
        </UITypography>
        <UIButton onClick={() => ok()} className="w-full">Ok</UIButton>
      </div>
    </>
  )
}
