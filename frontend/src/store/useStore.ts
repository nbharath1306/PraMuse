import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Skill = {
  id: number | string;
  provider: string;
  avatar: string;
  trustScore: number;
  offering: string;
  seeking: string;
  category: string;
  level: string;
  availability: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  trustScore: number;
};

export type Request = {
  id: number;
  fromUser: string;
  avatar: string;
  skillId: number | string;
  skillOffering: string;
  status: "pending" | "accepted" | "declined";
};

export type ActiveSwap = {
  id: number;
  partnerName: string;
  partnerAvatar: string;
  skillExchanged: string;
  status: "active" | "completed";
};

export type Message = {
  id: number;
  swapId: number;
  senderId: string; // 'me' or 'partner'
  text: string;
  timestamp: string;
};

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  skills: Skill[];
  requests: Request[];
  activeSwaps: ActiveSwap[];
  messages: Message[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (data: { name: string; email: string; avatar: string }) => void;
  addSkill: (skill: Omit<Skill, "id" | "provider" | "avatar" | "trustScore">) => void;
  deleteSkill: (id: number | string) => void;
  addRequest: (request: Omit<Request, "id" | "status">) => void;
  acceptRequest: (id: number) => void;
  completeSwap: (id: number, rating: number) => void;
  sendMessage: (swapId: number, text: string) => void;
}

const INITIAL_SKILLS: Skill[] = [
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
  }
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      skills: INITIAL_SKILLS,
      requests: [
        { id: 101, fromUser: "Sarah W.", avatar: "https://i.pravatar.cc/150?u=sarah", skillId: 1, skillOffering: "Advanced Python Programming", status: "pending" }
      ],
      activeSwaps: [],
      messages: [],
      login: (email, name = "New User") => 
        set({ 
          user: { 
            id: Math.random().toString(36).substr(2, 9), 
            name, 
            email, 
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=43302E&color=FFF1B5&bold=true`,
            trustScore: 5.0
          }, 
          isAuthenticated: true 
        }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => set((state) => {
        if (!state.user) return state;
        return {
          user: { ...state.user, name: data.name, email: data.email, avatar: data.avatar }
        };
      }),
      addSkill: (skillData) => 
        set((state) => {
          if (!state.user) return state;
          const newSkill: Skill = {
            ...skillData,
            id: Date.now(),
            provider: state.user.name,
            avatar: state.user.avatar,
            trustScore: state.user.trustScore,
          };
          return { skills: [newSkill, ...state.skills] };
        }),
      deleteSkill: (id) => set((state) => ({ skills: state.skills.filter(s => s.id !== id) })),
      addRequest: (reqData) => set((state) => ({ 
        requests: [{ ...reqData, id: Date.now(), status: "pending" }, ...state.requests] 
      })),
      acceptRequest: (id) => set((state) => {
        const req = state.requests.find(r => r.id === id);
        if (!req) return state;
        const newSwapId = Date.now();
        const newSwap: ActiveSwap = {
          id: newSwapId,
          partnerName: req.fromUser,
          partnerAvatar: req.avatar,
          skillExchanged: req.skillOffering,
          status: "active"
        };
        const initialMessage: Message = {
          id: Date.now() + 1,
          swapId: newSwapId,
          senderId: 'partner',
          text: `Hi there! Thanks for accepting my swap request for ${req.skillOffering}. When would you like to start?`,
          timestamp: new Date().toISOString()
        };
        return {
          requests: state.requests.filter(r => r.id !== id),
          activeSwaps: [newSwap, ...state.activeSwaps],
          messages: [...state.messages, initialMessage]
        };
      }),
      completeSwap: (id, rating) => set((state) => ({
        activeSwaps: state.activeSwaps.filter(s => s.id !== id),
        user: state.user ? { 
          ...state.user, 
          // Fake trust score calculation for demo
          trustScore: Number(((state.user.trustScore * 5 + rating) / 6).toFixed(1)) 
        } : null
      })),
      sendMessage: (swapId, text) => {
        const newMessage: Message = {
          id: Date.now(),
          swapId,
          senderId: 'me',
          text,
          timestamp: new Date().toISOString()
        };
        set((state) => ({ messages: [...state.messages, newMessage] }));

        // Auto-reply simulation
        setTimeout(() => {
          const replies = [
            "That sounds great! Looking forward to it.",
            "Awesome, I'll prepare some materials.",
            "Can we do a Google Meet for this?",
            "Perfect. Let's make it happen!"
          ];
          const randomReply = replies[Math.floor(Math.random() * replies.length)];
          const replyMsg: Message = {
            id: Date.now(),
            swapId,
            senderId: 'partner',
            text: randomReply,
            timestamp: new Date().toISOString()
          };
          set((state) => ({ messages: [...state.messages, replyMsg] }));
        }, 1500);
      }
    }),
    {
      name: 'pramuse-storage',
    }
  )
);
