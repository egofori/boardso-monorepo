import Link from "next/link"
import Logo from "../Logo"

export default function AuthHeader() {
  return (
    <nav className="p-6">
      <Link href="/" className="font-bold text-4xl text-tertiary-800 block w-max">
        <Logo />
      </Link>
    </nav>
  )
}
