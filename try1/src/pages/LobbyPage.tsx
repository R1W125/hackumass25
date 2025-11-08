import React, { useEffect, useState } from 'react'
import sampleGame from '../sample-data/games'
import GameCard from '../components/ui/GameCard'
import { useUserStore } from '../store/userStore'

export const LobbyPage: React.FC = () => {
  const [games, setGames] = useState([sampleGame])
  const setUserGames = useUserStore((s) => s.setGames)

  useEffect(() => {
    // Map sample game into user's games (for demo purposes)
    setUserGames(games.map((g) => ({ gameId: g.id, factionId: g.factions[0].id, name: g.factions[0].name })))
  }, [games])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Game Lobby</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {games.map((g) => (
          <GameCard game={g} key={g.id} />
        ))}
      </div>
    </div>
  )
}

export default LobbyPage
