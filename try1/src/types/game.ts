export interface Position {
  x: number
  y: number
  lat?: number
  lng?: number
}

export interface Resource {
  id: string
  type: string
  amount: number
}

export interface City {
  id: string
  name: string
  position: Position
  population: number
  isCapital: boolean
  resources: Resource[]
  ownerId: string
}

export interface Territory {
  id: string
  name: string
  boundaries: Position[]
  ownerId: string
  cities: City[]
  resources: Resource[]
}

export interface Army {
  id: string
  position: Position
  size: number
  ownerId: string
  type: string
  status: string
}

export interface Faction {
  id: string
  name: string
  color: string
  territories: Territory[]
  armies: Army[]
  resources: Resource[]
}

export interface GameEvent {
  id: string
  type: 'combat' | 'movement' | 'disaster' | 'construction' | 'system'
  description: string
  timestamp: number
  affectedEntities: string[]
}

export interface GameState {
  id: string
  turn: number
  factions: Faction[]
  activePlayer: string
  eventLog: GameEvent[]
  timestamp: number
}
