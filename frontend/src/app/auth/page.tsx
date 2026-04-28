"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat, ArrowRight, Mail, Lock, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const login = useStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = isLogin ? email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1) : name;
    login(email, finalName);
    toast.success(`Welcome to PraMuse, ${finalName}!`);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#FFF1B5]">
      {/* Animated Abstract Background Elements */}
      <motion.div 
        animate={{ 
          rotate: [0, 360], 
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-[#C1DBE8] to-[#FFF1B5] blur-[120px] opacity-70"
      />
      <motion.div 
        animate={{ 
          rotate: [360, 0], 
          scale: [1, 1.5, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-white to-[#C1DBE8] blur-[150px] opacity-80"
      />

      {/* Floating Logo Top Left */}
      <div 
        className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center gap-2 cursor-pointer z-50 mix-blend-color-burn"
        onClick={() => router.push("/")}
      >
        <div className="w-10 h-10 rounded-xl bg-[#43302E] flex items-center justify-center shadow-2xl">
          <Repeat className="text-[#FFF1B5] w-6 h-6" />
        </div>
        <span className="font-heading font-bold text-3xl text-[#43302E] tracking-tight">PraMuse</span>
      </div>

      {/* Main Glass Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="relative z-10 w-full max-w-[1000px] h-[650px] mx-4 rounded-[2.5rem] overflow-hidden flex shadow-2xl border border-white/40 bg-white/20 backdrop-blur-2xl"
      >
        
        {/* Left Side: Content/Brand area */}
        <div className="hidden md:flex flex-col justify-between w-1/2 p-16 relative bg-[#43302E]/5 border-r border-white/20">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-5xl font-heading font-bold text-[#43302E] leading-tight mb-6"
            >
              Trade Skills.<br />Build Futures.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-[#43302E]/70"
            >
              Join the exclusive network of creators and professionals exchanging value without money.
            </motion.p>
          </div>

          <div className="flex -space-x-4">
            {[1,2,3,4].map((i) => (
              <img 
                key={i} 
                src={`https://i.pravatar.cc/150?img=${i+10}`} 
                className="w-12 h-12 rounded-full border-2 border-[#FFF1B5] shadow-sm"
                alt="Member"
              />
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-[#FFF1B5] bg-[#C1DBE8] flex items-center justify-center text-[#43302E] text-xs font-bold shadow-sm">
              +10k
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-white/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-sm mx-auto"
            >
              <h3 className="font-heading text-3xl font-bold text-[#43302E] mb-2">
                {isLogin ? "Welcome back" : "Create an account"}
              </h3>
              <p className="text-[#43302E]/60 mb-8">
                {isLogin ? "Enter your details to access your dashboard." : "Start your skill exchange journey today."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#43302E]/40 group-focus-within:text-[#43302E] transition-colors" />
                    <input 
                      type="text" 
                      required
                      placeholder="Full Name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/50 border border-white focus:border-[#43302E]/30 rounded-2xl py-4 pl-12 pr-4 text-[#43302E] placeholder:text-[#43302E]/40 outline-none transition-all shadow-sm"
                    />
                  </div>
                )}
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#43302E]/40 group-focus-within:text-[#43302E] transition-colors" />
                  <input 
                    type="email" 
                    required
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/50 border border-white focus:border-[#43302E]/30 rounded-2xl py-4 pl-12 pr-4 text-[#43302E] placeholder:text-[#43302E]/40 outline-none transition-all shadow-sm"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#43302E]/40 group-focus-within:text-[#43302E] transition-colors" />
                  <input 
                    type="password" 
                    required
                    placeholder="Password" 
                    className="w-full bg-white/50 border border-white focus:border-[#43302E]/30 rounded-2xl py-4 pl-12 pr-4 text-[#43302E] placeholder:text-[#43302E]/40 outline-none transition-all shadow-sm"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#43302E] text-[#FFF1B5] py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#43302E]/90 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 mt-6"
                >
                  {isLogin ? "Sign In" : "Join the Network"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#43302E]/70 hover:text-[#43302E] font-medium transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
