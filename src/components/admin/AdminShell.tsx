import Link from "next/link";
import type { ReactNode } from "react";
import LogoutButton from "@/components/admin/LogoutButton";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default function AdminShell({
  children,
  email,
}: {
  children: ReactNode;
  email: string;
}) {
  return (
    <div className="min-h-screen bg-[#080807] text-[#f8f4ea]">
      <header className="border-b border-white/10 bg-[#0d0d0c]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Link href="/admin" className="font-display text-3xl text-white">
              MONKEY SCARFS ADMIN
            </Link>
            <p className="mt-1 text-sm text-white/45">{email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex h-10 items-center rounded-full border border-white/12 px-4 text-sm font-bold text-white/70 transition hover:border-[#d8ff2f]/60 hover:text-[#d8ff2f]"
              >
                {link.label}
              </Link>
            ))}
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
