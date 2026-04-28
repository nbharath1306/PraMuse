"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { Repeat, Mail, User as UserIcon, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function AuthPage() {
  const { isAuthenticated, login } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, router]);

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      await login(form.email.trim(), form.name.trim());
      toast.success("Welcome to PraMuse!");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF1B5] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#43302E]/5 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-[#43302E] flex items-center justify-center shadow-lg">
            <Repeat className="text-[#FFF1B5] w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-3xl text-[#43302E] tracking-tight">PraMuse</span>
        </Link>

        <div className="glass p-8 rounded-[2rem] border border-white/50 shadow-2xl">
          <h1 className="text-2xl font-heading font-bold text-[#43302E] mb-1">Welcome</h1>
          <p className="text-[#43302E]/60 mb-8 text-sm">Join thousands of people trading skills, not money.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43302E]/40" />
              <input
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl text-[#43302E] outline-none shadow-sm placeholder:text-[#43302E]/40 transition-all"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43302E]/40" />
              <input
                type="email"
                placeholder="Your email address"
                value={form.email}
                onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl text-[#43302E] outline-none shadow-sm placeholder:text-[#43302E]/40 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#43302E] text-[#FFF1B5] py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#43302E]/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Getting you in...</>
              ) : (
                <>Enter PraMuse <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#43302E]/50 mt-6">
            By continuing, you agree to our{" "}
            <span className="underline cursor-pointer hover:text-[#43302E]">Terms of Service</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
