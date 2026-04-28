"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Search, Filter, Star, Clock, ArrowRightLeft, BookOpen, User } from "lucide-react";
import Image from "next/image";

// Mock Data
const MOCK_SKILLS = [
  {
    id: 1,
    provider: "Lena K.",
    avatar: "https://i.pravatar.cc/150?u=lena",
    trustScore: 4.9,
    offering: "Advanced Python Programming",
    seeking: "Acoustic Guitar Basics",
    category: "Development",
    level: "Expert",
    availability: "Evenings & Weekends",
  },
  {
    id: 2,
    provider: "Pranav M.",
    avatar: "https://i.pravatar.cc/150?u=pranav",
    trustScore: 4.7,
    offering: "UI/UX Design Systems",
    seeking: "Fitness & Nutrition Coaching",
    category: "Design",
    level: "Advanced",
    availability: "Weekdays",
  },
  {
    id: 3,
    provider: "Maya T.",
    avatar: "https://i.pravatar.cc/150?u=maya",
    trustScore: 5.0,
    offering: "Spoken English & Public Speaking",
    seeking: "Video Editing (Premiere Pro)",
    category: "Communication",
    level: "Expert",
    availability: "Flexible",
  },
  {
    id: 4,
    provider: "David R.",
    avatar: "https://i.pravatar.cc/150?u=david",
    trustScore: 4.5,
    offering: "Digital Marketing & SEO",
    seeking: "Webflow Development",
    category: "Marketing",
    level: "Intermediate",
    availability: "Weekends",
  },
  {
    id: 5,
    provider: "Sarah W.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    trustScore: 4.8,
    offering: "Portrait Photography",
    seeking: "Spanish Conversation",
    category: "Creative",
    level: "Advanced",
    availability: "Mornings",
  },
  {
    id: 6,
    provider: "Alex J.",
    avatar: "https://i.pravatar.cc/150?u=alex",
    trustScore: 4.6,
    offering: "React & Next.js Setup",
    seeking: "Logo & Brand Identity",
    category: "Development",
    level: "Intermediate",
    availability: "Evenings",
  }
];

const CATEGORIES = ["All", "Development", "Design", "Communication", "Marketing", "Creative"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = MOCK_SKILLS.filter(skill => {
    const matchesCategory = activeCategory === "All" || skill.category === activeCategory;
    const matchesSearch = skill.offering.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.seeking.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen relative flex flex-col pt-24 pb-20 px-4 md:px-12 max-w-7xl mx-auto w-full">
      {/* Background elements */}
      <div className="fixed top-0 left-[-20%] w-[50%] h-[50%] rounded-full bg-secondary/40 blur-[120px] -z-10" />
      <div className="fixed bottom-0 right-[-10%] w-[40%] h-[40%] rounded-full bg-white/60 blur-[100px] -z-10" />

      {/* Header */}
      <div className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4"
        >
          Explore the Marketplace
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-primary/70 max-w-2xl"
        >
          Find the perfect partner to exchange skills with. Search by what you want to learn or what you can offer.
        </motion.p>
      </div>

      {/* Search & Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 mb-10 sticky top-24 z-20"
      >
        <div className="glass flex items-center p-2 rounded-2xl flex-1 shadow-sm">
          <Search className="w-5 h-5 text-primary/50 ml-3 mr-2" />
          <input 
            type="text" 
            placeholder="Search skills (e.g., Python, Guitar, Design)..." 
            className="bg-transparent border-none outline-none flex-1 py-2 pr-4 text-primary placeholder:text-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="glass p-2 rounded-2xl flex items-center gap-2 overflow-x-auto no-scrollbar">
          <div className="px-3 text-primary/50 flex items-center shrink-0">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
                activeCategory === category 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "hover:bg-white/40 text-primary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Skill Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredSkills.length > 0 ? (
          filteredSkills.map(skill => (
            <motion.div 
              key={skill.id} 
              variants={itemVariants}
              className="glass p-6 rounded-[1.5rem] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white/50 border border-white/50 relative">
                    <Image 
                      src={skill.avatar} 
                      alt={skill.provider} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">{skill.provider}</h4>
                    <div className="flex items-center text-xs font-medium text-primary/60 bg-white/40 px-2 py-0.5 rounded-md w-fit mt-1">
                      <Star className="w-3 h-3 text-[#D4AF37] mr-1 fill-current" />
                      {skill.trustScore} Trust Score
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/50 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                  {skill.category}
                </div>
              </div>

              <div className="space-y-4 mb-6 flex-1">
                <div>
                  <p className="text-xs text-primary/50 font-medium uppercase tracking-wider mb-1 flex items-center">
                    <BookOpen className="w-3 h-3 mr-1" /> Offering
                  </p>
                  <p className="font-heading font-semibold text-lg text-primary leading-tight">
                    {skill.offering}
                  </p>
                  <p className="text-sm text-primary/70 mt-1">{skill.level} Level</p>
                </div>
                
                <div className="w-full flex items-center opacity-30">
                  <div className="flex-1 h-px bg-primary"></div>
                  <ArrowRightLeft className="w-4 h-4 mx-2 text-primary" />
                  <div className="flex-1 h-px bg-primary"></div>
                </div>

                <div>
                  <p className="text-xs text-primary/50 font-medium uppercase tracking-wider mb-1 flex items-center">
                    <Search className="w-3 h-3 mr-1" /> Seeking
                  </p>
                  <p className="font-heading font-semibold text-lg text-[#8A5A53] leading-tight">
                    {skill.seeking}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-primary/10 flex items-center justify-between mt-auto">
                <div className="flex items-center text-xs text-primary/60 font-medium">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {skill.availability}
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md">
                  Request Swap
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center opacity-60">
            <Search className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-heading font-semibold text-primary">No skills found</h3>
            <p className="text-primary/70 mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
