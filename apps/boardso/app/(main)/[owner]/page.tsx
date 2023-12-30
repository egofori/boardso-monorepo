import { Metadata } from "next"
import Content from "./content"
import { User } from "@/types/User"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { owner: username } = params

  let title;

  try {
    const baseURL = process.env["NEXT_PUBLIC_API_BASE_URL"]
    const user: User = await fetch(`${baseURL}/users/${username}`).then((res) => res.json())
    title = `${user.firstName} ${user.lastName}`
  } catch {}

  return { title }
}

export default function Page() {
  return <Content />
}
