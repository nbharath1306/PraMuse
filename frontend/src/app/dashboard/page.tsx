"use client";

import { useStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, PlusCircle, Repeat, ArrowRightLeft, Star, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, logout, pendingRequests, addSkill } = useStore();
  const router = useRouter();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    offering: "",
    seeking: "",
    category: "Development",
    level: "Beginner",
    availability: ""
  });

  if (!isAuthenticated || !user) {
    if (typeof window !== 'undefined') router.push("/auth");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    addSkill(formData);
    setIsModalOpen(false);
    setFormData({ offering: "", seeking: "", category: "Development", level: "Beginner", availability: "" });
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
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <h1 className="text-4xl font-heading font-bold text-[#43302E] mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-[#43302E]/70">Here's an overview of your skill exchange activity.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#43302E] text-[#FFF1B5] px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:-translate-y-1 hover:shadow-xl transition-all"
          >
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-3xl border border-white/40 shadow-lg relative overflow-hidden">
            {pendingRequests > 0 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {pendingRequests}
              </motion.div>
            )}
            <div className="w-12 h-12 rounded-2xl bg-white/50 flex items-center justify-center mb-4 text-[#43302E]"><LayoutDashboard /></div>
            <p className="text-[#43302E]/60 text-sm font-medium">Pending Requests</p>
            <p className="text-3xl font-heading font-bold text-[#43302E] mt-1">{pendingRequests}</p>
          </motion.div>
        </div>
      </main>

      {/* Offer Skill Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#43302E]/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#FFF1B5] border border-white rounded-[2rem] p-8 shadow-2xl z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/50 hover:bg-white text-[#43302E] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-2xl font-heading font-bold text-[#43302E] mb-6">Publish a Skill</h2>
              
              <form onSubmit={handleAddSkill} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#43302E]/70 mb-1">What can you teach? (Offering)</label>
                  <input type="text" required value={formData.offering} onChange={e => setFormData({...formData, offering: e.target.value})} className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-xl py-3 px-4 text-[#43302E] outline-none transition-all shadow-sm" placeholder="e.g. Advanced Next.js" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#43302E]/70 mb-1">What do you want to learn? (Seeking)</label>
                  <input type="text" required value={formData.seeking} onChange={e => setFormData({...formData, seeking: e.target.value})} className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-xl py-3 px-4 text-[#43302E] outline-none transition-all shadow-sm" placeholder="e.g. Spanish Conversation" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#43302E]/70 mb-1">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/60 border border-white rounded-xl py-3 px-4 text-[#43302E] outline-none shadow-sm appearance-none">
                      <option>Development</option>
                      <option>Design</option>
                      <option>Communication</option>
                      <option>Marketing</option>
                      <option>Creative</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#43302E]/70 mb-1">Your Level</label>
                    <select value={formData.level} onChange={e => setFormData({...formData, level: e.target.value})} className="w-full bg-white/60 border border-white rounded-xl py-3 px-4 text-[#43302E] outline-none shadow-sm appearance-none">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#43302E]/70 mb-1">Availability</label>
                  <input type="text" required value={formData.availability} onChange={e => setFormData({...formData, availability: e.target.value})} className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-xl py-3 px-4 text-[#43302E] outline-none transition-all shadow-sm" placeholder="e.g. Weekends, Evenings" />
                </div>
                
                <button type="submit" className="w-full bg-[#43302E] text-[#FFF1B5] py-4 rounded-xl font-bold mt-6 hover:bg-[#43302E]/90 hover:shadow-lg transition-all">
                  Publish to Marketplace
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
