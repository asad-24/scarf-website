"use client";

import { Camera, Mail, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { INSTAGRAM_URL } from "@/data/site";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      toast.success("Message prepared. Email Monkey Scarfs for a direct reply.");
      (event.currentTarget as HTMLFormElement).reset();
    }, 400);
  }

  return (
    <div className="min-h-screen bg-[#080807] text-[#f8f4ea]">
      <Navbar />
      <main className="px-4 pb-24 pt-32 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-[#d8ff2f]">Contact</p>
            <h1 className="mt-4 font-display text-6xl leading-[0.9] text-white sm:text-8xl">
              Let&apos;s talk scarfs
            </h1>
            <p className="mt-5 text-base leading-8 text-white/62">
              Reach out for availability, delivery questions, bulk orders, or styling guidance.
            </p>
            <div className="mt-8 space-y-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex h-14 items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.05] px-5 text-white transition hover:border-[#d8ff2f]/50">
                <Camera className="h-5 w-5 text-[#d8ff2f]" />
                instagram.com/monkeyscarfs
              </a>
              <a href="mailto:hello@monkeyscarfs.com" className="flex h-14 items-center gap-3 rounded-[8px] border border-white/10 bg-white/[0.05] px-5 text-white transition hover:border-[#d8ff2f]/50">
                <Mail className="h-5 w-5 text-[#d8ff2f]" />
                hello@monkeyscarfs.com
              </a>
            </div>
          </div>

          <form onSubmit={submitContact} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">Name</span>
                <input required className="mt-2 h-12 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none focus:border-[#d8ff2f]/70" />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">Email</span>
                <input required type="email" className="mt-2 h-12 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none focus:border-[#d8ff2f]/70" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">Message</span>
                <textarea required rows={7} className="mt-2 w-full rounded-[8px] border border-white/12 bg-black px-4 py-3 text-sm text-white outline-none focus:border-[#d8ff2f]/70" />
              </label>
            </div>
            <button type="submit" disabled={loading} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#d8ff2f] text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white disabled:opacity-60">
              <Send className="h-4 w-4" />
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
