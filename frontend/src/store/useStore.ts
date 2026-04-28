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

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  skills: Skill[];
  pendingRequests: number;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (data: { name: string; email: string; avatar: string }) => void;
  addSkill: (skill: Omit<Skill, "id" | "provider" | "avatar" | "trustScore">) => void;
  deleteSkill: (id: number | string) => void;
  addRequest: () => void;
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
      pendingRequests: 0,
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
      addRequest: () => set((state) => ({ pendingRequests: state.pendingRequests + 1 })),
    }),
    {
      name: 'pramuse-storage',
    }
  )
);
