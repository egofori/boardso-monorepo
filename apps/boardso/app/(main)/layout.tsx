import "@/globals.css"
import { Inter } from "next/font/google"
import Script from "next/script"
import "ui/styles/globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { defaultMetadata } from "@/utils/constants"

const clarityCode = `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "ke5f2dccng");`

const inter = Inter({ subsets: ["latin"] })

export const metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Script id="ms-clarity" strategy="afterInteractive">
        {clarityCode}
      </Script>
      <Script id="wa-bubble" strategy="afterInteractive">
        {`var url = 'https://edna.io/wp-content/plugins/whatsapp-widget-generator/js/generator.js?34872';
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        var options = {
          "host":"https://edna.io",
          "enabled":true,
          "chatButtonSetting":{
              "backgroundColor":"#4fce5d",
              "ctaText":"",
              "icon":"whatsapp",
              "position":"right",
          },
          "brandSetting":{
              "backgroundColor":"#085b53",
              "brandImg":"https://storage.googleapis.com/boardso-media/site-media/icon.png",
              "brandName":"Boardso",
              "brandSubTitle":"Online",
              "ctaText":"Start Chat",
              "phoneNumber":"233546040671",
              "welcomeText":"Hello there 👋🏿. How may I be of service today?"
          }
        };
        s.onload = function() {
            CreateWhatsappChatWidget(options);
        };
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);`}
      </Script>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <ToastContainer hideProgressBar={true} autoClose={3000} />
      </body>
    </html>
  )
}
