"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/CartProvider";
import { formatCurrency } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    shippingAddress: "",
  });

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((item) => ({ productId: item.id, quantity: item.quantity })),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not submit order.");
      }
      clearCart();
      toast.success("Order submitted. Monkey Scarfs will contact you soon.");
      router.push("/shop");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080807] text-[#f8f4ea]">
      <Navbar />
      <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-6xl leading-[0.9] text-white sm:text-8xl">Checkout</h1>

          {items.length ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
              <form onSubmit={submitOrder} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-6">
                <h2 className="text-xl font-black text-white">Shipping details</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    ["customerName", "Customer name", "text"],
                    ["email", "Email", "email"],
                    ["phone", "Phone", "tel"],
                  ].map(([key, label, type]) => (
                    <label key={key} className="block">
                      <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">{label}</span>
                      <input
                        required
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                        className="mt-2 h-12 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none focus:border-[#d8ff2f]/70"
                      />
                    </label>
                  ))}
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">Shipping address</span>
                    <textarea
                      required
                      rows={5}
                      value={form.shippingAddress}
                      onChange={(event) => setForm((current) => ({ ...current, shippingAddress: event.target.value }))}
                      className="mt-2 w-full rounded-[8px] border border-white/12 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#d8ff2f]/70"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#d8ff2f] text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit order"}
                </button>
              </form>

              <aside className="h-fit rounded-[8px] border border-white/10 bg-white/[0.06] p-6">
                <h2 className="text-xl font-black text-white">Selected products</h2>
                <div className="mt-5 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-[8px] bg-black">
                        <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-white">{item.name}</p>
                        <p className="mt-1 text-sm text-white/55">
                          {item.quantity} x {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between border-t border-white/10 pt-5 text-lg font-black">
                  <span>Total</span>
                  <span className="text-[#d8ff2f]">{formatCurrency(total)}</span>
                </div>
              </aside>
            </div>
          ) : (
            <div className="mt-10 rounded-[8px] border border-white/10 bg-white/[0.05] p-10 text-center">
              <p className="text-white/60">Add products to your cart before checkout.</p>
              <Link href="/shop" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[#d8ff2f] px-7 text-sm font-black uppercase tracking-[0.12em] text-black">
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
