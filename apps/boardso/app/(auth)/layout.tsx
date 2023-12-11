import "@/globals.css";
import { Inter } from "next/font/google";
import "ui/styles/globals.css";
import AuthHeader from "@/components/Header/AuthHeader";
import AuthFooter from "@/components/Footer/AuthFooter";
import { twMerge } from "tailwind-merge";
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Boardso.com",
  description: "Boardso.com will help you find your billboard spaces available for free. Billboard owners can add billboards for free. We have static and digital billboards for all your advertising needs.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={twMerge(inter.className, "min-h-screen flex flex-col justify-between bg-tertiary-100")}>
        <AuthHeader />
        {children}
        <AuthFooter />
        <ToastContainer hideProgressBar={true} autoClose={2000} />
      </body>
    </html>
  );
}
