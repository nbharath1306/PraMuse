"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, UserCheck, Repeat, Star, MessageSquare, Zap } from "lucide-react";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export default function Home() {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-[#FFF1B5]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#43302E]/10 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#D4AF37]/15 blur-[120px] -z-10" />

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center py-6 px-8 md:px-16 z-10 glass border-b border-[#43302E]/10 sticky top-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#43302E] flex items-center justify-center shadow-md">
            <Repeat className="text-[#FFF1B5] w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-2xl text-[#43302E] tracking-tight">PraMuse</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-[#43302E]/70 text-sm">
          <Link href="/explore" className="hover:text-[#43302E] transition-colors">Explore Skills</Link>
          <Link href="/explore" className="hover:text-[#43302E] transition-colors">Community</Link>
          <Link href="/explore" className="hover:text-[#43302E] transition-colors">How It Works</Link>
        </div>
        <div className="flex items-center gap-3">
          {mounted && isAuthenticated ? (
            <Link href="/dashboard" className="bg-[#43302E] text-[#FFF1B5] px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth" className="font-medium text-[#43302E]/70 hover:text-[#43302E] transition-colors hidden md:block text-sm">Log in</Link>
              <Link href="/auth" className="bg-[#43302E] text-[#FFF1B5] px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Start Free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-32 z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/60 mb-8 text-sm font-medium text-[#43302E]">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>AI-powered skill bartering — now live</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold text-[#43302E] leading-tight mb-6">
            Learn by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#43302E] to-[#8A5A53]">Giving.</span><br />
            Your Talent is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A5A53] to-[#D4AF37]">Currency.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#43302E]/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Trade your UI Design for Fitness Coaching. Exchange Spoken English for Video Editing.
            Our AI finds your perfect partner. Zero money. Pure growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-full sm:w-auto glass rounded-2xl p-2 flex items-center max-w-md shadow-lg border border-white/60">
              <Search className="w-5 h-5 text-[#43302E]/40 ml-3 mr-2 flex-shrink-0" />
              <input type="text" placeholder="What do you want to learn?" className="bg-transparent border-none outline-none flex-1 py-2 pr-2 text-[#43302E] placeholder:text-[#43302E]/40 min-w-[180px] text-sm" />
              <Link href="/explore" className="bg-[#43302E] text-[#FFF1B5] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#43302E]/90 transition-colors whitespace-nowrap">
                Search
              </Link>
            </div>
            <Link href={mounted && isAuthenticated ? "/dashboard" : "/auth"} className="flex items-center gap-2 font-bold text-[#43302E] px-6 py-4 hover:bg-white/30 rounded-2xl transition-colors">
              Offer a Skill <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl mx-auto px-4">
          {[
            { icon: <Zap className="w-6 h-6" />, title: "AI Magic Match", desc: "Llama-3 AI analyzes your profile and pinpoints your perfect skill-swap partner from the live marketplace." },
            { icon: <MessageSquare className="w-6 h-6" />, title: "Real-Time Chat", desc: "Once you accept a swap, instantly connect with your partner through our built-in messaging system." },
            { icon: <Star className="w-6 h-6" />, title: "Trust Economy", desc: "Every completed swap updates your Trust Score. Build a reputation that opens doors across the platform." },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
              className="glass p-8 rounded-[2rem] border border-white/50 hover:-translate-y-1 hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#43302E]/10 flex items-center justify-center mb-6 text-[#43302E]">
                {f.icon}
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-[#43302E]">{f.title}</h3>
              <p className="text-[#43302E]/60 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-20 text-center">
          <div className="flex items-center justify-center gap-6 text-[#43302E]/50 text-sm">
            <div className="flex items-center gap-2"><UserCheck className="w-4 h-4" /> <span>Real users, real skills</span></div>
            <div className="w-1 h-1 rounded-full bg-[#43302E]/30" />
            <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" /> <span>5.0 avg trust score</span></div>
            <div className="w-1 h-1 rounded-full bg-[#43302E]/30" />
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#D4AF37]" /> <span>AI-powered matching</span></div>
          </div>
        </motion.div>
      </main>

      <footer className="py-8 text-center text-[#43302E]/50 text-sm glass border-t border-[#43302E]/10">
        © 2026 PraMuse · The Skill Barter Revolution
      </footer>
    </div>
  );
}
