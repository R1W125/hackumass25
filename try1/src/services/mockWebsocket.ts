import sampleGame from '../sample-data/games'
import type { WebSocketMessage } from './websocket'

type Handler = (msg: WebSocketMessage) => void

export class MockGameWebSocket {
  private gameId: string
  private userId: string
  private factionId: string
  private handlers: Map<string, Handler> = new Map()
  private interval: any

  constructor(gameId: string, userId: string, factionId: string) {
    this.gameId = gameId
    this.userId = userId
    this.factionId = factionId
  }

  connect() {
    // Send init after a short delay
    setTimeout(() => {
      const initMsg: WebSocketMessage = {
        type: 'init',
        payload: sampleGame,
        gameId: this.gameId,
        timestamp: Date.now(),
      }
      this.emit(initMsg)
    }, 300)

    // Periodically send random events/updates
    this.interval = setInterval(() => {
      const eventMsg: WebSocketMessage = {
        type: 'event',
        payload: {
          id: `evt-${Date.now()}`,
          type: 'system',
          description: 'World agent: small meteor shower observed',
          timestamp: Date.now(),
          affectedEntities: [],
        },
        gameId: this.gameId,
        timestamp: Date.now(),
      }
      this.emit(eventMsg)
    }, 8000)
  }

  sendPrompt(prompt: string) {
    // Simulate advisor acting — create an event and an update
    const event = {
      id: `evt-prompt-${Date.now()}`,
      type: 'system',
      description: `Advisor processed prompt: ${prompt}`,
      timestamp: Date.now(),
      affectedEntities: [],
    }

    const eventMsg: WebSocketMessage = { type: 'event', payload: event, gameId: this.gameId, timestamp: Date.now() }
    this.emit(eventMsg)

    // Simulate an update: increment turn
    const update = { turn: (sampleGame.turn || 0) + 1, timestamp: Date.now() }
    const updateMsg: WebSocketMessage = { type: 'update', payload: update, gameId: this.gameId, timestamp: Date.now() }
    this.emit(updateMsg)
  }

  onMessage(type: string, handler: Handler) {
    this.handlers.set(type, handler)
  }

  emit(msg: WebSocketMessage) {
    const h = this.handlers.get(msg.type)
    if (h) h(msg)
  }

  disconnect() {
    clearInterval(this.interval)
  }
}

export default MockGameWebSocket
