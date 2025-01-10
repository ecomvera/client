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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce App",
  description: "Ecommerce app using Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="!scroll-smooth select-none relative">
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
      </body>
    </html>
  );
}
