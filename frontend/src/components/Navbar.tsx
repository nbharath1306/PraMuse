"use client";

import { useStore } from "@/store/useStore";
import { useTheme } from "@/lib/theme";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Repeat, Bell, Moon, Sun, LogOut, UserCircle, LayoutDashboard, Compass } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useStore();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState(0);
  const [showNotifDrop, setShowNotifDrop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Poll notifications every 15 seconds
  useEffect(() => {
    if (!user) return;
    const fetchNotifs = async () => {
      const res = await fetch(`/api/notifications?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.total || 0);
      }
    };
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 15000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const handleLogout = () => { logout(); router.push('/'); };

  return (
    <nav className="w-full flex justify-between items-center py-5 px-6 md:px-12 z-50 glass border-b border-[#43302E]/10 sticky top-0">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#43302E] flex items-center justify-center shadow-md">
          <Repeat className="text-[#FFF1B5] w-5 h-5" />
        </div>
        <span className="font-heading font-bold text-xl text-[#43302E] tracking-tight">PraMuse</span>
      </Link>

      {/* Center Nav */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#43302E]/70">
        <Link href="/explore" className="hover:text-[#43302E] transition-colors flex items-center gap-1.5">
          <Compass className="w-4 h-4" /> Explore
        </Link>
        {isAuthenticated && (
          <Link href="/dashboard" className="hover:text-[#43302E] transition-colors flex items-center gap-1.5">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-[#43302E]/60 hover:text-[#43302E] hover:bg-white/40 transition-all"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}

        {mounted && isAuthenticated && user ? (
          <>
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifDrop(!showNotifDrop); router.push('/inbox'); }}
                className="relative p-2 rounded-xl text-[#43302E]/60 hover:text-[#43302E] hover:bg-white/40 transition-all"
              >
                <Bell className="w-5 h-5" />
                <AnimatePresence>
                  {notifications > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md"
                    >
                      {notifications > 9 ? '9+' : notifications}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Avatar / Profile */}
            <Link href="/profile" className="flex items-center gap-2 glass px-3 py-2 rounded-xl border border-white/50 hover:bg-white/40 transition-all">
              {user.avatar ? (
                <Image src={user.avatar} alt="Avatar" width={28} height={28} className="rounded-full object-cover w-7 h-7" />
              ) : (
                <UserCircle className="w-7 h-7 text-[#43302E]" />
              )}
              <span className="text-sm font-semibold text-[#43302E] hidden md:block max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-[#43302E]/50 hover:text-red-500 hover:bg-red-50 transition-all"
              title="Sign out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </>
        ) : mounted ? (
          <div className="flex items-center gap-2">
            <Link href="/auth" className="text-sm font-medium text-[#43302E]/70 hover:text-[#43302E] hidden md:block">Log in</Link>
            <Link href="/auth" className="bg-[#43302E] text-[#FFF1B5] px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-[#43302E]/90 transition-all">
              Start Free
            </Link>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
