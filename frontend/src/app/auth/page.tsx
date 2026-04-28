"use client";

import { createClient } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Repeat, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated } = useStore();
  const [mode, setMode] = useState<"options" | "magic">("options");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, router]);

  // Handle OAuth callback — sync Supabase session with our DB
  useEffect(() => {
    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session?.user) {
        const u = session.user;
        const displayName = u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || "User";
        // Sync with our Prisma DB
        await useStore.getState().login(u.email!, displayName);
        router.push("/dashboard");
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { toast.error("Please fill in all fields"); return; }
    setIsLoading(true);
    try {
      // Save name in localStorage for post-auth sync
      localStorage.setItem("pramuse-pending-name", name.trim());
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { full_name: name.trim() },
        },
      });
      if (error) throw error;
      setMagicSent(true);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send link");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#FFF1B5] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#43302E]/5 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md z-10">
        <Link href="/" className="flex items-center justify-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-[#43302E] flex items-center justify-center shadow-lg">
            <Repeat className="text-[#FFF1B5] w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-3xl text-[#43302E] tracking-tight">PraMuse</span>
        </Link>

        <div className="glass p-8 rounded-[2rem] border border-white/50 shadow-2xl">
          {magicSent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-[#43302E] mb-2">Check your inbox!</h2>
              <p className="text-[#43302E]/60 text-sm leading-relaxed">
                We sent a magic login link to <span className="font-bold text-[#43302E]">{email}</span>.<br />
                Click it to sign in — no password needed.
              </p>
              <button onClick={() => { setMagicSent(false); setMode("options"); }} className="mt-6 text-sm text-[#43302E]/60 hover:text-[#43302E] underline">
                Use a different email
              </button>
            </div>
          ) : mode === "options" ? (
            <>
              <h1 className="text-2xl font-heading font-bold text-[#43302E] mb-1">Welcome to PraMuse</h1>
              <p className="text-[#43302E]/60 mb-8 text-sm">Trade skills. Build futures. Zero money.</p>

              {/* Google OAuth */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-[#43302E]/10 text-[#43302E] py-3.5 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all shadow-sm mb-4 disabled:opacity-60"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                Continue with Google
              </button>

              <div className="relative flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-[#43302E]/10" />
                <span className="text-xs text-[#43302E]/40 font-medium">or</span>
                <div className="flex-1 h-px bg-[#43302E]/10" />
              </div>

              {/* Magic Link */}
              <button
                onClick={() => setMode("magic")}
                className="w-full flex items-center justify-center gap-2 glass border border-white py-3.5 rounded-2xl font-bold text-sm text-[#43302E] hover:bg-white/40 transition-all"
              >
                <Mail className="w-4 h-4" /> Continue with Email Link
              </button>

              <p className="text-center text-xs text-[#43302E]/40 mt-6">
                By continuing, you agree to our Terms of Service
              </p>
            </>
          ) : (
            <>
              <button onClick={() => setMode("options")} className="text-sm text-[#43302E]/50 hover:text-[#43302E] mb-6 flex items-center gap-1">
                ← Back
              </button>
              <h2 className="text-xl font-heading font-bold text-[#43302E] mb-1">Magic Link Sign In</h2>
              <p className="text-[#43302E]/60 mb-6 text-sm">We&apos;ll send you a secure link — no password required.</p>

              <form onSubmit={handleMagicLink} className="space-y-4">
                <input type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required
                  className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl px-4 py-3.5 text-[#43302E] outline-none placeholder:text-[#43302E]/40 text-sm" />
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl px-4 py-3.5 text-[#43302E] outline-none placeholder:text-[#43302E]/40 text-sm" />
                <button type="submit" disabled={isLoading}
                  className="w-full bg-[#43302E] text-[#FFF1B5] py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#43302E]/90 transition-all shadow-lg disabled:opacity-60">
                  {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <>Send Magic Link <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
