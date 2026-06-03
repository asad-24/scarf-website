import Image from "next/image";
import { ArrowRight, Camera, MessageCircle, Sparkles } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { products } from "@/data/products";
import { brandStats, INSTAGRAM_URL, WHATSAPP_BASE_URL } from "@/data/site";

const orderSteps = [
  {
    number: "01",
    title: "Choose your scarf design",
    copy: "Explore the real collection assets and select the color or preview you like.",
  },
  {
    number: "02",
    title: "Click Order Now",
    copy: "Each scarf sends a ready WhatsApp message with the selected product name.",
  },
  {
    number: "03",
    title: "Confirm on Instagram or WhatsApp",
    copy: "Finalize availability, delivery, and order details directly with Monkey Scarfs.",
  },
];

const aboutHighlights = [
  {
    label: "Color Driven",
    text: "Vibrant drops designed to stand out instantly.",
  },
  {
    label: "Gift Ready",
    text: "Black-box presentation with a premium brand feel.",
  },
  {
    label: "Style First",
    text: "Scarfs made for bold daily outfits and statement looks.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080807] text-[#f8f4ea]">
      <Navbar />

      <main>
        <section
          id="home"
          className="fashion-grid relative flex min-h-[92svh] items-end overflow-hidden bg-black"
        >
          <Image
            src="/assests/hero-ai-scarves.png"
            alt="Premium Monkey Scarfs arranged on dark studio blocks"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-95"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(216,255,47,0.18),transparent_20%),linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.58)_40%,rgba(0,0,0,0.16)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#080807] to-transparent" />

          <div className="pointer-events-none absolute left-[8%] top-[24%] hidden h-16 w-16 rounded-full border border-[#d8ff2f]/40 bg-[#d8ff2f]/10 backdrop-blur-md md:block motion-safe:animate-[float_9s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute right-[10%] top-[20%] hidden h-28 w-28 rounded-full border border-white/15 bg-white/8 backdrop-blur-md lg:block motion-safe:animate-[float_12s_ease-in-out_infinite]" />

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 sm:pb-16 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8ff2f]/40 bg-[#d8ff2f]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#d8ff2f] backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Drop 005 / Summer Odyssey
              </div>
              <h1 className="mt-6 font-display text-6xl leading-[0.9] text-white sm:text-8xl lg:text-[132px]">
                <AnimatedText text="MONKEY SCARFS" />
              </h1>
              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-white/74 sm:text-lg">
                A premium scarf showcase built around the real Monkey Scarfs assets:
                bold colors, black packaging, crisp visuals, and a collection that
                feels ready for a client preview.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#collection"
                  className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#d8ff2f] px-7 text-sm font-black uppercase tracking-[0.12em] text-[#080807] shadow-[0_0_40px_rgba(216,255,47,0.22)] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  View All Scarfs
                  <ArrowRight className="h-4 w-4" />
                </a>
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
            {brandStats.map((stat) => (
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

        <section id="collection" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto max-w-4xl text-center">
              <div className="flex justify-center">
                <p className="rounded-full border border-[#d8ff2f]/35 bg-[#d8ff2f]/10 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#d8ff2f]">
                  All Scarfs
                </p>
              </div>
              <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl leading-[0.92] text-white sm:text-7xl lg:text-8xl">
                Premium scarf collection
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/58">
                Explore bold Monkey Scarfs designs, packaging previews, and new collection visuals in a polished showcase.
              </p>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="about"
          className="relative scroll-mt-24 overflow-hidden border-y border-white/10 bg-[#10100e] px-4 py-24 text-white sm:px-6 lg:px-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(216,255,47,0.16),transparent_26%),radial-gradient(circle_at_86%_78%,rgba(255,255,255,0.08),transparent_28%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <Reveal className="relative min-h-[560px]">
              <div className="absolute left-0 top-8 h-64 w-[58%] overflow-hidden rounded-[8px] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:h-80">
                <Image
                  src="/assests/new/002.png"
                  alt="Monkey Scarfs premium packaging and tag artwork"
                  fill
                  sizes="(max-width: 1024px) 58vw, 34vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute right-0 top-0 h-80 w-[56%] overflow-hidden rounded-[8px] border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:h-[410px]">
                <Image
                  src="/assests/scarf1.jpeg"
                  alt="Bold orange Monkey Scarf product preview"
                  fill
                  sizes="(max-width: 1024px) 56vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-[14%] h-72 w-[64%] overflow-hidden rounded-[8px] border border-[#d8ff2f]/30 bg-black shadow-[0_0_70px_rgba(216,255,47,0.12)] sm:h-80">
                <Image
                  src="/assests/collection.png"
                  alt="Monkey Scarfs colorful collection overview"
                  fill
                  sizes="(max-width: 1024px) 64vw, 38vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-8 right-6 rounded-full bg-[#d8ff2f] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black shadow-[0_0_45px_rgba(216,255,47,0.3)]">
                Drop 005
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:pl-8">
              <div className="inline-flex rounded-full border border-[#d8ff2f]/35 bg-[#d8ff2f]/10 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#d8ff2f]">
                About Monkey Scarfs
              </div>
              <h2 className="mt-6 font-display text-5xl leading-[0.9] text-white sm:text-7xl lg:text-8xl">
                Crafted for color, confidence, and modern style.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/64 sm:text-lg">
                Monkey Scarfs brings bold scarf colors together with sleek black
                packaging and editorial product visuals. The brand feels sharp,
                gift-ready, and made for outfits that deserve a clean finishing
                statement.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {aboutHighlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[8px] border border-white/10 bg-white/[0.055] p-5"
                  >
                    <h3 className="text-sm font-black uppercase tracking-[0.16em] text-[#d8ff2f]">
                      {item.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/58">{item.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="order" className="scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.28em] text-[#d8ff2f]">
                How to order
              </p>
              <h2 className="mt-3 font-display text-5xl leading-[0.96] text-white sm:text-7xl">
                Three steps from scarf to confirmation.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {orderSteps.map((step, index) => (
                <Reveal
                  key={step.number}
                  delay={index * 0.08}
                  className="rounded-[8px] border border-white/10 bg-[#11110f] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                >
                  <p className="font-display text-6xl leading-none text-[#d8ff2f]">{step.number}</p>
                  <h3 className="mt-6 text-xl font-black text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">{step.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-24 border-t border-white/10 bg-[radial-gradient(circle_at_top,rgba(216,255,47,0.13),transparent_34%),#050505] px-4 py-20 sm:px-6 lg:px-8"
        >
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#d8ff2f]">
              Contact
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[0.96] text-white sm:text-7xl">
              Ready to order Monkey Scarfs?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/62">
              Message Monkey Scarfs on Instagram or WhatsApp to check availability,
              confirm your selected design, and place your order.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-7 text-sm font-black uppercase tracking-[0.12em] text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-black"
              >
                <Camera className="h-4 w-4" />
                Instagram
              </a>
              <a
                href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent("Hi Monkey Scarfs, I want to place an order.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#d8ff2f] px-7 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:-translate-y-0.5 hover:bg-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Order
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
