"use client";

import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }
      toast.success("Welcome back");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-[8px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#d8ff2f] text-black">
        <Lock className="h-5 w-5" />
      </div>
      <h1 className="mt-6 font-display text-5xl leading-none text-white">Admin Login</h1>
      <p className="mt-3 text-sm leading-6 text-white/55">
        Use the seeded admin account from your environment variables.
      </p>
      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">Username</span>
          <input
            required
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none focus:border-[#d8ff2f]/70"
          />
        </label>
        <label className="block">
          <span className="text-xs font-black uppercase tracking-[0.14em] text-white/50">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-white/12 bg-black px-4 text-sm text-white outline-none focus:border-[#d8ff2f]/70"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#d8ff2f] text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
