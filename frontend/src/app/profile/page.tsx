"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { ArrowLeft, Save, User as UserIcon, Mail, Camera, Repeat } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfile } = useStore();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: ""
  });

  useEffect(() => {
    setMounted(true);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        avatar: user.avatar
      });
    }
  }, [user]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/auth");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-[#FFF1B5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#43302E]/20 border-t-[#43302E] rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast.success("Profile updated successfully!");
    router.push("/dashboard");
  };

  const handleAvatarChange = () => {
    const defaultAvatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=43302E&color=FFF1B5&bold=true`;
    setFormData({ ...formData, avatar: defaultAvatarUrl });
    toast.info("Avatar reset to initials");
  };

  return (
    <div className="min-h-screen bg-[#FFF1B5] relative pb-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-6 px-8 md:px-16 z-10 glass border-b border-[#43302E]/10 sticky top-0 mb-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#43302E] flex items-center justify-center">
            <Repeat className="text-[#FFF1B5] w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-2xl text-[#43302E] tracking-tight">PraMuse</span>
        </Link>
        <button onClick={() => router.push("/dashboard")} className="font-medium text-[#43302E] hover:text-[#43302E]/70 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </nav>

      <main className="max-w-2xl mx-auto px-4 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-heading font-bold text-[#43302E] mb-2">Profile Settings</h1>
          <p className="text-[#43302E]/70">Manage your account details and public appearance.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-[2rem] p-8 md:p-12 shadow-2xl border border-white/40"
        >
          <form onSubmit={handleSave} className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="relative group cursor-pointer mb-4" onClick={handleAvatarChange}>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white/50 relative">
                  <Image src={formData.avatar} alt="Profile Avatar" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-[#43302E]/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-sm text-[#43302E]/60 text-center">Click avatar to reset to initials, or paste an image URL below.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#43302E]/80 mb-2 ml-1">Full Name</label>
                <div className="relative group">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#43302E]/40 transition-colors group-focus-within:text-[#43302E]" />
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl py-4 pl-12 pr-4 text-[#43302E] outline-none transition-all shadow-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#43302E]/80 mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#43302E]/40 transition-colors group-focus-within:text-[#43302E]" />
                  <input 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl py-4 pl-12 pr-4 text-[#43302E] outline-none transition-all shadow-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#43302E]/80 mb-2 ml-1">Avatar Image URL (Optional)</label>
                <div className="relative group">
                  <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#43302E]/40 transition-colors group-focus-within:text-[#43302E]" />
                  <input 
                    type="url" 
                    value={formData.avatar} 
                    onChange={e => setFormData({...formData, avatar: e.target.value})} 
                    className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl py-4 pl-12 pr-4 text-[#43302E] outline-none transition-all shadow-sm" 
                    placeholder="https://example.com/my-photo.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#43302E]/10">
              <button 
                type="submit" 
                className="w-full bg-[#43302E] text-[#FFF1B5] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#43302E]/90 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Save className="w-5 h-5" /> Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
