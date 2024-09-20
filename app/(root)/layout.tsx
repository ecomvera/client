import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Shared/Header";
import BottomBar from "@/components/Shared/BottomBar";
import SideBar from "@/components/Shared/SideBar";
import Footer from "@/components/Shared/Footer";
import { Toaster } from "@/components/ui/toaster";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="!scroll-smooth select-none">
            <Toaster />
            <Header />
            <SideBar />
            <main className="mx-auto">{children}</main>
            <Footer />
            <BottomBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
