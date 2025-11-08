import React from 'react'
import type { GameState } from '../../types/game'
import { Link } from 'react-router-dom'

interface Props {
  game: GameState
}

export const GameCard: React.FC<Props> = ({ game }) => {
  return (
    <div className="border rounded-lg p-4 bg-gray-800">
      <h3 className="text-lg font-semibold">{game.id}</h3>
      <p className="text-sm text-gray-400">Turn: {game.turn}</p>
      <div className="mt-3 flex gap-2">
        <Link to={`/game/${game.id}`} className="px-3 py-1 bg-blue-600 rounded text-white">Join</Link>
      </div>
    </div>
  )
}

export default GameCard
