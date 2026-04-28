"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, UserCheck, Repeat, Star } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/60 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/40 blur-[120px] -z-10" />

      {/* Navigation */}
      <nav className="w-full flex justify-between items-center py-6 px-8 md:px-16 z-10 glass border-b border-border/50 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Repeat className="text-primary-foreground w-5 h-5" />
          </div>
          <span className="font-heading font-bold text-2xl text-primary tracking-tight">SkillLoop</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#how-it-works" className="hover:text-primary/70 transition-colors">How it works</a>
          <a href="#explore" className="hover:text-primary/70 transition-colors">Explore Skills</a>
          <a href="#community" className="hover:text-primary/70 transition-colors">Community</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-medium hover:text-primary/70 transition-colors hidden md:block">Log in</button>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl-xl font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-32 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>The new alternative economy for human skills</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary leading-tight mb-6">
            Learn by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#8A5A53]">Giving.</span><br />
            Your Talent is Currency.
          </h1>
          
          <p className="text-lg md:text-xl text-primary/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the decentralized learning network. Trade your UI Design skills for Fitness Coaching.
            Exchange Spoken English for Video Editing. No money involved, just mutual growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-full sm:w-auto glass rounded-xl-xl p-2 flex items-center max-w-md shadow-lg">
              <Search className="w-5 h-5 text-primary/50 ml-3 mr-2" />
              <input 
                type="text" 
                placeholder="What do you want to learn?" 
                className="bg-transparent border-none outline-none flex-1 py-2 pr-4 text-primary placeholder:text-primary/50 min-w-[250px]"
              />
              <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl-xl font-medium hover:bg-primary/90 transition-colors">
                Search
              </button>
            </div>
            <button className="flex items-center gap-2 font-medium px-6 py-4 hover:bg-white/20 rounded-xl-xl transition-colors">
              Offer a Skill <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl mx-auto px-4"
        >
          {[
            { icon: <UserCheck />, title: "Trust-Based Network", desc: "Every exchange is rated and reviewed. Build your reputation score." },
            { icon: <Repeat />, title: "AI Mutual Matching", desc: "Our engine finds the perfect partner who wants what you know." },
            { icon: <Star />, title: "Zero Cost Learning", desc: "Keep your wallet closed. You pay by sharing your expertise." },
          ].map((feature, i) => (
            <div key={i} className="glass p-8 rounded-xl-xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center mb-6 text-primary">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-primary">{feature.title}</h3>
              <p className="text-primary/70 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Footer minimal */}
      <footer className="py-8 text-center text-primary/60 text-sm glass mt-auto border-t border-border/50">
        <p>© 2026 SkillLoop Inc. Alternative Learning Marketplace.</p>
      </footer>
    </div>
  );
}
