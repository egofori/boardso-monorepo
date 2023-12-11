import "@/globals.css"
import { Inter } from "next/font/google"
import "ui/styles/globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Find available billboard spaces at Boardso.com",
  description: "Boardso.com will help you find your billboard spaces available for free. Billboard owners can add billboards for free. We have static and digital billboards for all your advertising needs.",
};

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
