import { create } from 'zustand'
import type { GameState, GameEvent } from '../types/game'

interface GameStore {
  games: Map<string, GameState>
  activeGameId: string | null
  setActiveGame: (gameId: string) => void
  updateGameState: (gameId: string, update: Partial<GameState>) => void
  addEvent: (gameId: string, event: GameEvent) => void
}

export const useGameStore = create<GameStore>((set) => ({
  games: new Map(),
  activeGameId: null,
  setActiveGame: (gameId: string) => set({ activeGameId: gameId }),
  updateGameState: (gameId, update) => 
    set((state) => {
      const games = new Map(state.games)
      const current = games.get(gameId)
      if (current) {
        games.set(gameId, { ...current, ...update })
      } else {
        // If not present, treat update as initial state (cast)
        games.set(gameId, update as GameState)
      }
      return { games }
    }),
  addEvent: (gameId, event) =>
    set((state) => {
      const games = new Map(state.games)
      const current = games.get(gameId)
      if (current) {
        games.set(gameId, { ...current, eventLog: [...current.eventLog, event] })
      }
      return { games }
    }),
}))
