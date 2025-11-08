import React from 'react'
import { useGameStore } from '../../store/gameStore'

interface Props { gameId: string }

export const EventLog: React.FC<Props> = ({ gameId }) => {
  const game = useGameStore((s) => s.games.get(gameId))
  if (!game) return <div className="p-4">No game loaded</div>

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg h-[300px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Event Log</h2>
      <div className="space-y-2">
        {game.eventLog.map((event) => (
          <div key={event.id} className="p-2 rounded bg-gray-800">
            <p className="text-sm">{event.description}</p>
            <span className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventLog
