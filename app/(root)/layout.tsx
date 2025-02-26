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
        <script>
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T737ZMVQ');
        </script>
      </head>
      <body
        className={`${Others.logoFont} ${Fonts.Thin} ${Fonts.ExtraLight} ${Fonts.Light} ${Fonts.Regular} ${Fonts.Medium} ${Fonts.SemiBold} ${Fonts.Bold} ${Fonts.ExtraBold} ${Fonts.Black} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="!scroll-smooth select-none relative bg-[--white] text-[--black]">
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T737ZMVQ"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
