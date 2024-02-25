import { Metadata } from "next";
import Content from "./content";
import { Billboard } from "@/types/Billboard";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = params

  let title;
  let description;

  try {
    const baseURL = process.env["NEXT_PUBLIC_API_BASE_URL"]
    const billboard: Billboard = await fetch(`${baseURL}/billboards/billboard?slug=${slug}`).then((res) => res.json())
    if (billboard.isActive) {
      title = billboard.title
      description = billboard.description
    }
  } catch {}

  return { title, description }
}
export default function Page() {
  return <Content />
}
