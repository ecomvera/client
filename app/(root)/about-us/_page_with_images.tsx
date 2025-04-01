export const metadata = {
  title: "About Us | Silkyester",
  alternates: {
    canonical: "https://www.silkyester.com/about-us",
  },
};

import Image from "next/image";
import Link from "next/link";
import { Calendar, Package, ShoppingBag, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-muted py-24 md:py-32">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Story</h1>
            <p className="max-w-[700px] text-xl text-muted-foreground md:text-2xl">The Journey of Silkyester</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background/80" />
      </section>

      {/* Beginning and Vision */}
      <section className="container space-y-8 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] space-y-4">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">The Beginning and Vision</h2>
          <p className="text-center text-muted-foreground">
            Silkyester was founded on September 24, 2024, by Vikas Yadav. The goal was to create a brand that wasn't just
            about selling clothes, but offering fashion in a unique way.
          </p>
          <p className="text-center text-muted-foreground">
            We wanted to provide a platform where everyone could freely express their style and wear their confidence.
          </p>
          <div className="flex justify-center pt-6">
            <div className="relative h-[300px] w-full overflow-hidden rounded-xl md:h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=800"
                alt="Silkyester fashion"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <Separator className="container" />

      {/* Collections */}
      <section className="container space-y-8 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">The Best Collections at Silkyester</h2>
          <p className="text-muted-foreground">Discover curated collections for every need and occasion</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">Silkyester</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Silkyester casual collection"
                  fill
                  className="object-cover"
                />
              </div>
              <CardDescription className="text-base">
                From trendy street style to casual looks, express your unique identity in every outfit.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">Formal Wear Store</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 h-[200px] w-full overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Silkyester formal collection"
                  fill
                  className="object-cover"
                />
              </div>
              <CardDescription className="text-base">
                Find the perfect look for office wear and special occasions with our elegant shirts and T-shirts.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="container" />

      {/* Shopping Experience */}
      <section className="container space-y-8 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">A Seamless & Faster Shopping Experience</h2>
          <p className="text-muted-foreground">Now with Express Delivery!</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <Card className="flex flex-col items-center p-6 text-center">
            <ShoppingBag className="mb-4 h-10 w-10 text-primary" />
            <CardTitle className="text-xl">Trendy Fashion</CardTitle>
            <CardDescription className="pt-2">Curated collections that keep you ahead of trends</CardDescription>
          </Card>
          <Card className="flex flex-col items-center p-6 text-center">
            <TrendingUp className="mb-4 h-10 w-10 text-primary" />
            <CardTitle className="text-xl">Affordable Style</CardTitle>
            <CardDescription className="pt-2">Quality fashion that doesn't break the bank</CardDescription>
          </Card>
          <Card className="flex flex-col items-center p-6 text-center">
            <Package className="mb-4 h-10 w-10 text-primary" />
            <CardTitle className="text-xl">Express Delivery</CardTitle>
            <CardDescription className="pt-2">Working on same-day delivery for your convenience</CardDescription>
          </Card>
          <Card className="flex flex-col items-center p-6 text-center">
            <Calendar className="mb-4 h-10 w-10 text-primary" />
            <CardTitle className="text-xl">Founded 2024</CardTitle>
            <CardDescription className="pt-2">A young brand with a bold vision for fashion</CardDescription>
          </Card>
        </div>
        <div className="mx-auto max-w-[800px] pt-8 text-center">
          <p className="text-muted-foreground">
            At Silkyester, we make every shopping experience special. Our platform is designed to bring you trendy, stylish,
            and affordable fashion effortlessly.
          </p>
          <p className="pt-4 text-muted-foreground">
            Now, we are working on same-day delivery, ensuring that your favorite fashion pieces reach you faster than ever.
            Our goal is simple – to deliver your perfect style right to your doorstep without any delay!
          </p>
        </div>
      </section>

      <Separator className="container" />

      {/* Vision */}
      <section className="container space-y-8 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] space-y-8">
          <div className="relative h-[250px] w-full overflow-hidden rounded-xl md:h-[300px]">
            <Image src="/placeholder.svg?height=300&width=800" alt="Silkyester vision" fill className="object-cover" />
          </div>
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Vision</h2>
            <p className="text-xl font-medium">
              Our dream is to make Silkyester a premium and trusted fashion brand in India and globally.
            </p>
            <div className="pt-6">
              <Button asChild size="lg">
                <Link href="/collections">Explore Our Collections</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2024 Silkyester. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium underline underline-offset-4">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm font-medium underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
