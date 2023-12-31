import "@/globals.css"
import { Inter } from "next/font/google"
import Head from "next/head"
import "ui/styles/globals.css"
import AuthHeader from "@/components/Header/AuthHeader"
import AuthFooter from "@/components/Footer/AuthFooter"
import { twMerge } from "tailwind-merge"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { defaultMetadata } from "@/utils/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata = defaultMetadata

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ke5f2dccng");
            `,
          }}
        ></script>
      </Head>
      <body
        className={twMerge(
          inter.className,
          "min-h-screen flex flex-col justify-between bg-tertiary-100"
        )}
      >
        <AuthHeader />
        {children}
        <AuthFooter />
        <ToastContainer hideProgressBar={true} autoClose={2000} />
      </body>
    </html>
  )
}
