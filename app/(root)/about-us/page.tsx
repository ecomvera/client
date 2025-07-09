export const metadata = {
  title: "About Us | Silkyester",
  alternates: {
    canonical: "https://www.silkyester.com/about-us",
  },
};

import Link from "next/link";
import { Calendar, Package, ShoppingBag, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[--c2]">Our Story</h1>
            <p className="max-w-[700px] text-xl text-muted-foreground md:text-2xl">The Journey of Silkyester</p>
          </div>
        </div>
      </section>

      {/* Beginning and Vision */}
      <section className="container space-y-8 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] space-y-6">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">The Beginning and Vision</h2>
          <div className="rounded-lg bg-muted/50 p-8">
            <p className="text-center text-lg">
              Silkyester was founded on September 24, 2024, by Vikas Yadav. The goal was to create a brand that wasn't just
              about selling clothes, but offering fashion in a unique way.
            </p>
            <p className="mt-4 text-center text-lg">
              We wanted to provide a platform where everyone could freely express their style and wear their confidence.
            </p>
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
          <Card className="border border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">Silkyester</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                From trendy street style to casual looks, express your unique identity in every outfit.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl">Formal Wear Store</CardTitle>
            </CardHeader>
            <CardContent>
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
        <div className="mx-auto max-w-[800px] rounded-lg bg-muted/50 p-8 pt-8 text-center">
          <p className="text-lg">
            At Silkyester, we make every shopping experience special. Our platform is designed to bring you trendy, stylish,
            and affordable fashion effortlessly.
          </p>
          <p className="pt-4 text-lg">
            Now, we are working on same-day delivery, ensuring that your favorite fashion pieces reach you faster than ever.
            Our goal is simple – to deliver your perfect style right to your doorstep without any delay!
          </p>
        </div>
      </section>

      <Separator className="container" />

      {/* Vision */}
      <section className="container space-y-8 py-12 md:py-16 lg:py-20 mb-10">
        <div className="mx-auto max-w-[800px] space-y-8">
          <div className="rounded-xl bg-primary/10 p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Vision</h2>
            <p className="mt-6 text-xl font-medium">
              Our dream is to make Silkyester a premium and trusted fashion brand in India and globally.
            </p>
            {/* <div className="pt-8">
              <Button asChild size="lg" className="bg-[--c2] hover:bg-[--c3] text-white">
                <Link href="/collections">Explore Our Collections</Link>
              </Button>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
