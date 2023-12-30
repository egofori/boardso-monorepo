import "@/globals.css"
import { Inter } from "next/font/google"
import "ui/styles/globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { defaultMetadata } from "@/utils/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <ToastContainer hideProgressBar={true} autoClose={2000} />
      </body>
    </html>
  )
}
