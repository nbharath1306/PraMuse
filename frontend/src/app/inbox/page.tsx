"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { ArrowLeft, Check, X, MessageSquare, Repeat, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function InboxPage() {
  const { user, isAuthenticated, requests, activeSwaps, acceptRequest, completeSwap } = useStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"requests" | "swaps">("requests");
  
  // For the Review Modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSwapId, setSelectedSwapId] = useState<number | null>(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) router.push("/auth");
  }, [isAuthenticated, router]);

  if (!mounted || !user) {
    return (
      <div className="min-h-screen bg-[#FFF1B5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#43302E]/20 border-t-[#43302E] rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleAccept = (id: number) => {
    acceptRequest(id);
    toast.success("Swap Accepted! You can now chat with your partner.");
  };

  const handleCompleteClick = (id: number) => {
    setSelectedSwapId(id);
    setIsReviewModalOpen(true);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSwapId) {
      completeSwap(selectedSwapId, rating);
      toast.success("Swap completed! Review submitted.");
    }
    setIsReviewModalOpen(false);
    setSelectedSwapId(null);
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

      <main className="max-w-4xl mx-auto px-4 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-heading font-bold text-[#43302E] mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8" /> Messages & Requests
          </h1>
          <p className="text-[#43302E]/70">Manage your incoming swap requests and active partnerships.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setActiveTab("requests")}
            className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "requests" ? "bg-[#43302E] text-[#FFF1B5] shadow-lg" : "glass text-[#43302E] hover:bg-white/40"
            }`}
          >
            Pending Requests 
            {requests.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{requests.length}</span>}
          </button>
          <button 
            onClick={() => setActiveTab("swaps")}
            className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
              activeTab === "swaps" ? "bg-[#43302E] text-[#FFF1B5] shadow-lg" : "glass text-[#43302E] hover:bg-white/40"
            }`}
          >
            Active Swaps
            {activeSwaps.length > 0 && <span className="bg-[#8A5A53] text-white text-xs px-2 py-0.5 rounded-full">{activeSwaps.length}</span>}
          </button>
        </div>

        {/* Content Area */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {activeTab === "requests" && (
            requests.length > 0 ? (
              requests.map(req => (
                <div key={req.id} className="glass p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/40">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <Image src={req.avatar} alt="Avatar" width={60} height={60} className="rounded-full border-2 border-white shadow-sm" />
                    <div>
                      <h4 className="font-bold text-lg text-[#43302E]">{req.fromUser}</h4>
                      <p className="text-[#43302E]/70 text-sm">wants to swap for <span className="font-semibold text-[#8A5A53]">"{req.skillOffering}"</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => {
                        useStore.setState(state => ({ requests: state.requests.filter(r => r.id !== req.id) }));
                        toast.info("Request declined.");
                      }}
                      className="flex-1 md:flex-none px-4 py-2 rounded-xl text-red-600 bg-red-100 font-bold hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" /> Decline
                    </button>
                    <button 
                      onClick={() => handleAccept(req.id)}
                      className="flex-1 md:flex-none px-6 py-2 rounded-xl text-white bg-green-600 font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <Check className="w-4 h-4" /> Accept
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass p-12 rounded-[2rem] text-center flex flex-col items-center justify-center border border-white/40 border-dashed">
                <Clock className="w-12 h-12 text-[#43302E]/30 mb-4" />
                <h3 className="text-xl font-heading font-bold text-[#43302E] mb-2">No pending requests</h3>
                <p className="text-[#43302E]/60 max-w-sm">When someone wants to trade skills with you, it will appear here.</p>
              </div>
            )
          )}

          {activeTab === "swaps" && (
            activeSwaps.length > 0 ? (
              activeSwaps.map(swap => (
                <div key={swap.id} className="glass p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/40 border-l-4 border-l-green-500">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <Image src={swap.partnerAvatar} alt="Avatar" width={60} height={60} className="rounded-full border-2 border-white shadow-sm" />
                    <div>
                      <h4 className="font-bold text-lg text-[#43302E]">Chat with {swap.partnerName}</h4>
                      <p className="text-[#43302E]/70 text-sm">Trading: <span className="font-semibold text-[#8A5A53]">"{swap.skillExchanged}"</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button 
                      onClick={() => toast.info("Opening chat UI... (Coming soon)")}
                      className="flex-1 md:flex-none px-4 py-2 rounded-xl text-[#43302E] bg-white/60 font-bold hover:bg-white transition-colors flex items-center justify-center gap-2 border border-white"
                    >
                      <MessageSquare className="w-4 h-4" /> Chat
                    </button>
                    <button 
                      onClick={() => handleCompleteClick(swap.id)}
                      className="flex-1 md:flex-none px-6 py-2 rounded-xl text-white bg-[#43302E] font-bold hover:bg-[#43302E]/90 transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <Star className="w-4 h-4 text-[#FFF1B5]" /> Complete & Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass p-12 rounded-[2rem] text-center flex flex-col items-center justify-center border border-white/40 border-dashed">
                <MessageSquare className="w-12 h-12 text-[#43302E]/30 mb-4" />
                <h3 className="text-xl font-heading font-bold text-[#43302E] mb-2">No active swaps</h3>
                <p className="text-[#43302E]/60 max-w-sm">Accept a request or ask someone else to swap to start a partnership!</p>
              </div>
            )
          )}
        </motion.div>
      </main>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#43302E]/60 backdrop-blur-sm" onClick={() => setIsReviewModalOpen(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-md bg-[#FFF1B5] border border-white rounded-[2rem] p-8 shadow-2xl z-10"
          >
            <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-6 right-6 p-2 rounded-full bg-white/50 hover:bg-white text-[#43302E]">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-heading font-bold text-[#43302E] mb-2">Leave a Review</h2>
            <p className="text-[#43302E]/70 mb-6">How was your skill exchange experience?</p>
            
            <form onSubmit={submitReview} className="space-y-6">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    type="button" 
                    onClick={() => setRating(star)}
                    className="p-2 transition-transform hover:scale-110"
                  >
                    <Star className={`w-10 h-10 ${rating >= star ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#43302E]/20"}`} />
                  </button>
                ))}
              </div>
              <div>
                <textarea 
                  required 
                  placeholder="Write a short review about your partner..." 
                  className="w-full bg-white/60 border border-white focus:border-[#43302E]/30 rounded-2xl p-4 text-[#43302E] outline-none min-h-[120px] resize-none shadow-sm"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-[#43302E] text-[#FFF1B5] py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#43302E]/90 transition-all">
                Submit Review
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
