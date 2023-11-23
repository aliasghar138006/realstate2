import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Layout from "@/Layout/Layout";
import NextProvider from "../providers/NextProvider";

const yekan = localFont({
  src: [
    {
      path: "../../public/fonts/YekanBakh-Light.woff2",
      // weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakh-Regular.woff2",
      // weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakh-Bold.woff2",
      // weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakh-Heavy.woff2",
      // weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/YekanBakh-Fat.woff2",
      // weight: "700",
      style: "normal",
    },
  ],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "پروژه املاک",
  description: "خرید و فروش و معامله ملک",
  icon: "./favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekan.className}>
        <NextProvider>
          <Layout>{children}</Layout>
        </NextProvider>
      </body>
    </html>
  );
}
