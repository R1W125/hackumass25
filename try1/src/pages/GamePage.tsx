import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GameMap } from '../components/map/GameMap'
import { EventLog } from '../components/ui/EventLog'
import { CommandInput } from '../components/ui/CommandInput'
import { useGameStore } from '../store/gameStore'
import MockGameWebSocket from '../services/mockWebsocket'

export const GamePage: React.FC = () => {
  const { gameId = '' } = useParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [ws, setWs] = useState<any | null>(null)
  const updateGameState = useGameStore((s) => s.updateGameState)
  const addEvent = useGameStore((s) => s.addEvent)

  useEffect(() => {
    // For local testing we use the MockWebSocket. In production replace with real GameWebSocket.
    const userId = 'demo-user'
    const factionId = 'demo-faction'
    const websocket = new MockGameWebSocket(gameId, userId, factionId)
    websocket.connect()

    websocket.onMessage('init', (message: any) => {
      updateGameState(gameId, message.payload)
    })

    websocket.onMessage('update', (message: any) => {
      updateGameState(gameId, message.payload)
    })

    websocket.onMessage('event', (message: any) => {
      addEvent(gameId, message.payload)
    })

    setWs(websocket)

    return () => websocket.disconnect()
  }, [gameId])

  const handleCommand = (command: string) => {
    if (!ws) return
    setIsProcessing(true)
    ws.sendPrompt(command)
    setTimeout(() => setIsProcessing(false), 500)
  }

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        <div className="lg:col-span-2 bg-gray-800 rounded-lg overflow-hidden">
          <GameMap gameId={gameId} />
        </div>

        <div className="flex flex-col gap-4">
          <EventLog gameId={gameId} />
          <div className="mt-auto">
            <CommandInput onSendCommand={handleCommand} isProcessing={isProcessing} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamePage
