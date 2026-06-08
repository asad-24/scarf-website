"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart();

  return (
    <div className="min-h-screen bg-[#080807] text-[#f8f4ea]">
      <Navbar />
      <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-6xl leading-[0.9] text-white sm:text-8xl">Cart</h1>

          {items.length ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid gap-4 rounded-[8px] border border-white/10 bg-white/[0.05] p-4 sm:grid-cols-[96px_1fr_auto] sm:items-center"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-[8px] bg-black">
                      <Image src={item.imageUrl} alt={item.name} fill sizes="96px" className="object-cover" />
                    </div>
                    <div>
                      <Link href={`/products/${item.slug}`} className="text-xl font-black text-white hover:text-[#d8ff2f]">
                        {item.name}
                      </Link>
                      <p className="mt-2 text-sm text-white/55">{formatCurrency(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(event) => updateQuantity(item.id, Number(event.target.value))}
                        className="h-11 w-20 rounded-full border border-white/12 bg-black px-4 text-center text-sm font-black text-white outline-none"
                        aria-label={`Quantity for ${item.name}`}
                      />
                      <button
                        type="button"
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/70 transition hover:border-red-400/60 hover:text-red-300"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="h-fit rounded-[8px] border border-white/10 bg-white/[0.06] p-6">
                <h2 className="text-xl font-black text-white">Order summary</h2>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-lg font-black">
                  <span>Total</span>
                  <span className="text-[#d8ff2f]">{formatCurrency(total)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#d8ff2f] text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                >
                  Checkout
                </Link>
              </aside>
            </div>
          ) : (
            <div className="mt-10 rounded-[8px] border border-white/10 bg-white/[0.05] p-10 text-center">
              <p className="text-white/60">Your cart is empty.</p>
              <Link
                href="/shop"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#d8ff2f] px-7 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                Shop collection
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
