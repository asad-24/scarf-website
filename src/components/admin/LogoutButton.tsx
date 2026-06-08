"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.message("Logged out");
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/12 px-4 text-sm font-bold text-white/70 transition hover:border-[#d8ff2f]/60 hover:text-[#d8ff2f]"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  );
}
