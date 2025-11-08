import type { GameState, Faction, City, Territory, Army, Resource } from '../types/game'

const makePos = (lat: number, lng: number) => ({ x: 0, y: 0, lat, lng })

const sampleGame: GameState = {
  id: 'sample-game-1',
  turn: 1,
  timestamp: Date.now(),
  activePlayer: 'faction-1',
  eventLog: [
    { id: 'e1', type: 'system', description: 'Game created', timestamp: Date.now(), affectedEntities: [] },
  ],
  factions: [
    {
      id: 'faction-1',
      name: 'Northlandia',
      color: '#1f77b4',
      territories: [
        {
          id: 't1',
          name: 'Northern Plains',
          boundaries: [makePos(50, -5), makePos(51, -4), makePos(50.5, -3)],
          ownerId: 'faction-1',
          cities: [
            { id: 'c1', name: 'Rivermount', position: makePos(50.2, -4.2), population: 12000, isCapital: true, resources: [], ownerId: 'faction-1' },
          ],
          resources: [],
        },
      ],
      armies: [
        { id: 'a1', position: makePos(50.3, -4.1), size: 500, ownerId: 'faction-1', type: 'infantry', status: 'idle' },
      ],
      resources: [],
    },
    {
      id: 'faction-2',
      name: 'Southmarch',
      color: '#ff7f0e',
      territories: [
        {
          id: 't2',
          name: 'Southern Hills',
          boundaries: [makePos(48, -2), makePos(49, -1), makePos(48.5, 0)],
          ownerId: 'faction-2',
          cities: [
            { id: 'c2', name: 'Harborview', position: makePos(48.4, -1.2), population: 8000, isCapital: true, resources: [], ownerId: 'faction-2' },
          ],
          resources: [],
        },
      ],
      armies: [
        { id: 'a2', position: makePos(48.5, -1.1), size: 300, ownerId: 'faction-2', type: 'archers', status: 'idle' },
      ],
      resources: [],
    },
  ],
}

export default sampleGame
