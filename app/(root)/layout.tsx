import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Shared/Header";
import BottomBar from "@/components/Shared/BottomBar";
import SideBar from "@/components/Shared/SideBar";
import Footer from "@/components/Shared/Footer";
import { Toaster } from "@/components/ui/toaster";
import { LoadingScreen } from "@/components/Dialogs/LoadingScreen";
import { Suspense } from "react";
import Script from "next/script";
import Fonts from "../fonts/Montserrat";
import Others from "../fonts/others";
import { GoogleAnalytics } from "@next/third-parties/google";
import FetchData from "@/components/Shared/FetchData";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Shopping for Men, Women & Kids - Fashion & Lifestyle | Silkyester",
  description: "Online Shopping for Men, Women & Kids - Fashion & Lifestyle | Silkyester",
  icons: {
    icon: "assets/hindi_logo.png",
    shortcut: "assets/hindi_logo.png",
    apple: "assets/hindi_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Online Shopping for Men, Women & Kids - Fashion & Lifestyle | Silkyester</title>
        <meta
          name="description"
          content="Shop the latest fashion trends for Men, Women & Kids at Silkyester. Discover stylish clothing, accessories, and lifestyle products with the best deals & fast delivery!"
        />
        <meta
          name="keywords"
          content="online shopping, fashion marketplace, buy clothes online, men's fashion, women's clothing, kids wear, trendy outfits, stylish apparel, fashion accessories, lifestyle products, best fashion deals, Silkyester fashion, fast delivery shopping"
        />
      </head>
      <body
        className={`${Others.logoFont} ${Fonts.Thin} ${Fonts.ExtraLight} ${Fonts.Light} ${Fonts.Regular} ${Fonts.Medium} ${Fonts.SemiBold} ${Fonts.Bold} ${Fonts.ExtraBold} ${Fonts.Black} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="!scroll-smooth select-none relative bg-[--white] text-[--black]">
              <FetchData />
              <LoadingScreen />
              <Toaster />
              <Header />
              <SideBar />
              <main className="mx-auto">{children}</main>
              <Footer />
              <BottomBar />
            </div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
          </Suspense>
        </ThemeProvider>
        <GoogleAnalytics gaId="GTM-T737ZMVQ" />
      </body>
    </html>
  );
}
