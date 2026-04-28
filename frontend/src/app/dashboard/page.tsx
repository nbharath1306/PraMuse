"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard, PlusCircle, Repeat, ArrowRightLeft, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useStore();
  const router = useRouter();

  if (!isAuthenticated || !user) {
    if (typeof window !== 'undefined') router.push("/auth");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#FFF1B5] relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-6 px-8 md:px-16 z-10 glass border-b border-[#43302E]/10 sticky top-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <div className="w-8 h-8 rounded-lg bg-[#43302E] flex items-center justify-center">
            <Repeat className="text-[#FFF1B5] w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-2xl text-[#43302E] tracking-tight">PraMuse</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => router.push("/explore")} className="font-medium text-[#43302E] hover:text-[#43302E]/70 transition-colors">
            Explore Skills
          </button>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-[#43302E] leading-tight">{user.name}</p>
              <p className="text-xs text-[#43302E]/70">Score: {user.trustScore}</p>
            </div>
            <Image src={user.avatar} alt="Avatar" width={40} height={40} className="rounded-full border-2 border-white shadow-md" />
            <button onClick={handleLogout} className="p-2 text-[#43302E]/50 hover:text-[#43302E] hover:bg-white/40 rounded-full transition-all">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h1 className="text-4xl font-heading font-bold text-[#43302E] mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-[#43302E]/70">Here's an overview of your skill exchange activity.</p>
          </div>
          <button className="bg-[#43302E] text-[#FFF1B5] px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:-translate-y-1 hover:shadow-xl transition-all">
            <PlusCircle className="w-5 h-5" /> Offer New Skill
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stat Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass p-6 rounded-3xl border border-white/40 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center mb-4 text-[#43302E]"><ArrowRightLeft /></div>
            <p className="text-[#43302E]/60 text-sm font-medium">Active Swaps</p>
            <p className="text-3xl font-heading font-bold text-[#43302E] mt-1">2</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-3xl border border-white/40 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center mb-4 text-[#43302E]"><Star /></div>
            <p className="text-[#43302E]/60 text-sm font-medium">Trust Score</p>
            <p className="text-3xl font-heading font-bold text-[#43302E] mt-1">{user.trustScore}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-3xl border border-white/40 shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center mb-4 text-[#43302E]"><LayoutDashboard /></div>
            <p className="text-[#43302E]/60 text-sm font-medium">Pending Requests</p>
            <p className="text-3xl font-heading font-bold text-[#43302E] mt-1">5</p>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
