import { Camera, MessageCircle } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_BASE_URL } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-[#f8f4ea]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="font-display text-4xl leading-none text-white">MONKEY SCARFS</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-white/55">
            Premium scarf designs for elegant everyday styling.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white transition hover:bg-white hover:text-black"
          >
            <Camera className="h-4 w-4" />
            Instagram
          </a>
          <a
            href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent("Hi Monkey Scarfs, I want to place an order.")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#d8ff2f] px-5 text-sm font-black text-black transition hover:bg-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
