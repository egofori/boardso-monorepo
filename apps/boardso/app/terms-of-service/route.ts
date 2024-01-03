import fs from "fs"
const filename = "/public/terms-of-service.html"

export async function GET() {
  const page = fs.readFileSync(process.cwd() + filename, "utf-8")

  return new Response(page, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  })
}
