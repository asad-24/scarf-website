import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Sparkles } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getPublicProducts } from "@/lib/products";
import { INSTAGRAM_URL } from "@/data/site";

export const dynamic = "force-dynamic";

async function loadFeaturedProducts() {
  try {
    return await getPublicProducts({ featured: true, limit: 4 });
  } catch {
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await loadFeaturedProducts();

  return (
    <div className="min-h-screen bg-[#080807] text-[#f8f4ea]">
      <Navbar />

      <main>
        <section className="fashion-grid relative flex min-h-[88svh] items-end overflow-hidden bg-black">
          <Image
            src="/assests/hero-ai-scarves.png"
            alt="Premium Monkey Scarfs arranged on dark studio blocks"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-95"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.58)_44%,rgba(0,0,0,0.16)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#080807] to-transparent" />

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8ff2f]/40 bg-[#d8ff2f]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#d8ff2f] backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Premium scarf collection
              </div>
              <h1 className="mt-6 font-display text-6xl leading-[0.9] text-white sm:text-8xl lg:text-[132px]">
                MONKEY SCARFS
              </h1>
              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/74 sm:text-lg">
                Elegant everyday scarfs with bold color, premium presentation, and a smooth online
                ordering experience.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#d8ff2f] px-7 text-sm font-black uppercase tracking-[0.12em] text-[#080807] shadow-[0_0_40px_rgba(216,255,47,0.22)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Shop Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-7 text-sm font-black uppercase tracking-[0.12em] text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-black"
                >
                  <Camera className="h-4 w-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0d0d0c]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-4 py-6 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              { value: "MongoDB", label: "Live product catalog" },
              { value: "Secure", label: "Admin dashboard" },
              { value: "Vercel", label: "Deployment ready" },
            ].map((stat) => (
              <Reveal
                key={stat.label}
                className="flex items-center justify-between border-b border-white/10 py-4 last:border-b-0 sm:block sm:border-b-0 sm:border-r sm:px-6 sm:last:border-r-0"
              >
                <p className="font-display text-5xl leading-none text-[#d8ff2f]">{stat.value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-white/50">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-[#d8ff2f]">
                  Featured Scarfs
                </p>
                <h2 className="mt-3 font-display text-5xl leading-[0.92] text-white sm:text-7xl">
                  Shop the latest edit
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            {featuredProducts.length ? (
              <div className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-[8px] border border-white/10 bg-white/[0.05] p-10 text-center text-white/60">
                Seed products to show the featured collection.
              </div>
            )}
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-[#10100e] px-4 py-24 text-white sm:px-6 lg:px-8">
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal className="relative min-h-[520px]">
              <div className="absolute left-0 top-8 h-72 w-[62%] overflow-hidden rounded-[8px] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                <Image src="/assests/new/002.png" alt="Monkey Scarfs packaging" fill sizes="50vw" className="object-cover" />
              </div>
              <div className="absolute right-0 top-0 h-96 w-[58%] overflow-hidden rounded-[8px] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                <Image src="/assests/scarf1.jpeg" alt="Orange Monkey Scarf" fill sizes="50vw" className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-[12%] h-64 w-[70%] overflow-hidden rounded-[8px] border border-[#d8ff2f]/30 bg-black">
                <Image src="/assests/collection.png" alt="Monkey Scarfs collection" fill sizes="60vw" className="object-cover" />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#d8ff2f]">
                About Monkey Scarfs
              </p>
              <h2 className="mt-4 font-display text-5xl leading-[0.92] text-white sm:text-7xl">
                Crafted for color, confidence, and modern styling.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/64 sm:text-lg">
                Monkey Scarfs pairs vivid colors with a clean premium identity. Customers can browse
                the collection, build a cart, and submit order requests while the owner manages
                products, images, prices, and customer orders from a protected dashboard.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#d8ff2f]">
              Contact
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[0.96] text-white sm:text-7xl">
              Questions before you order?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/62">
              Message Monkey Scarfs on Instagram or use the contact page for order questions,
              availability, and shipping details.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#d8ff2f] px-7 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                Contact us
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
