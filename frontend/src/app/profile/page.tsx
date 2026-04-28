"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Save, Loader2, Repeat } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfile } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({ name: "", avatar: "" });

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) { router.push('/auth'); return; }
    if (user) setForm({ name: user.name, avatar: user.avatar || "" });
  }, [isAuthenticated, user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({ name: form.name, avatar: form.avatar });
      toast.success("Profile updated!");
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted || !user) return (
    <div className="min-h-screen bg-[#FFF1B5] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#43302E]/20 border-t-[#43302E] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF1B5] relative pb-20">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <nav className="w-full flex justify-between items-center py-6 px-8 md:px-16 z-10 glass border-b border-[#43302E]/10 sticky top-0 mb-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#43302E] flex items-center justify-center"><Repeat className="text-[#FFF1B5] w-5 h-5" /></div>
          <span className="font-heading font-bold text-2xl text-[#43302E] tracking-tight">PraMuse</span>
        </Link>
        <button onClick={() => router.push("/dashboard")} className="font-medium text-[#43302E] hover:text-[#43302E]/70 transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Dashboard
        </button>
      </nav>

      <main className="max-w-xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-heading font-bold text-[#43302E] mb-8">Edit Profile</h1>

          {/* Avatar Preview */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              {form.avatar ? (
                <Image src={form.avatar} alt="Avatar" width={100} height={100} className="rounded-full border-4 border-white shadow-xl" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#43302E] flex items-center justify-center text-[#FFF1B5] text-3xl font-bold shadow-xl border-4 border-white">
                  {user.name[0]}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-[#43302E]/60 font-medium">Trust Score: {user.trust_score?.toFixed(1)} ⭐</span>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4 glass p-8 rounded-[2rem] border border-white/40 shadow-xl">
            <div>
              <label className="block text-sm font-bold text-[#43302E] mb-2">Display Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
                className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl px-4 py-3 text-[#43302E] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#43302E] mb-2">Email</label>
              <input value={user.email} readOnly className="w-full bg-white/30 border border-white/50 rounded-2xl px-4 py-3 text-[#43302E]/50 outline-none cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#43302E] mb-2">Avatar URL</label>
              <input value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} placeholder="https://..."
                className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl px-4 py-3 text-[#43302E] outline-none" />
              <p className="text-xs text-[#43302E]/40 mt-1">Paste any image URL from the web.</p>
            </div>
            <button type="submit" disabled={isSaving} className="w-full bg-[#43302E] text-[#FFF1B5] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#43302E]/90 transition-all disabled:opacity-60 mt-2">
              {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
