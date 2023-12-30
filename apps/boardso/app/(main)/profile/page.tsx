import Content from "./content"

export async function generateMetadata({ searchParams }: any) {
  const { t: tab } = searchParams

  switch (tab) {
    case "0":
      return { title: "Profile" }
    case "1":
      return { title: "Contacts" }
    case "2":
      return { title: "Bookmarks" }
    default:
      break
  }
}

export default function Page() {
  return <Content />
}
