import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'

interface UserState {
  user: User | null
  setUser: (u: User | null) => void
  games: Array<{ gameId: string; factionId: string; name: string }>
  setGames: (g: Array<{ gameId: string; factionId: string; name: string }>) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
  games: [],
  setGames: (g) => set({ games: g }),
}))
