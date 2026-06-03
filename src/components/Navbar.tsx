"use client";

import { useState } from "react";
import { Camera, Menu, X } from "lucide-react";
import { INSTAGRAM_URL } from "@/data/site";

const navItems = [
  { label: "Collection", href: "#collection" },
  { label: "About", href: "#about" },
  { label: "How to Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[linear-gradient(90deg,rgba(4,4,3,0.92),rgba(18,18,15,0.82),rgba(4,4,3,0.92))] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label="Monkey Scarfs home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#d8ff2f] text-sm font-black text-[#080807] shadow-[0_0_28px_rgba(216,255,47,0.25)] transition-transform duration-300 group-hover:scale-105">
            MS
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl text-[#f8f4ea]">
              MONKEY
            </span>
            <span className="text-xs font-semibold tracking-[0.34em] text-[#d8ff2f]">
              SCARFS
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-white/58 transition-colors hover:text-[#d8ff2f]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#d8ff2f]/60 hover:bg-[#d8ff2f] hover:text-[#080807]"
          >
            <Camera className="h-4 w-4" />
            Instagram
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/8 text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#080807] px-4 py-4 shadow-lg md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:bg-white/8 hover:text-[#d8ff2f]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#d8ff2f] px-5 py-3 text-sm font-black text-[#080807]"
            >
              <Camera className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
