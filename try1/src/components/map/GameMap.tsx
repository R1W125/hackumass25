import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useGameStore } from '../../store/gameStore'

interface Props { gameId: string }

export const GameMap: React.FC<Props> = ({ gameId }) => {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const game = useGameStore((s) => s.games.get(gameId))

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return
    mapRef.current = L.map(containerRef.current).setView([50, -4], 5)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  useEffect(() => {
    if (!mapRef.current || !game) return
    // remove non-tile layers
    mapRef.current.eachLayer((layer) => { if (!(layer instanceof L.TileLayer)) mapRef.current?.removeLayer(layer) })

    game.factions.forEach((f) => {
      f.territories.forEach((t) => {
        if (t.boundaries && t.boundaries.length > 2) {
          const latlngs = t.boundaries.map((p) => [p.lat ?? 0, p.lng ?? 0])
          L.polygon(latlngs, { color: f.color, fillOpacity: 0.2 }).addTo(mapRef.current!)
        }
        t.cities.forEach((c) => {
          const mark = L.circle([c.position.lat ?? 0, c.position.lng ?? 0], { radius: 4000, color: f.color }).addTo(mapRef.current!)
          mark.bindPopup(`${c.name} (pop ${c.population})`)
        })
      })

      f.armies.forEach((a) => {
        const m = L.circle([a.position.lat ?? 0, a.position.lng ?? 0], { radius: 2000, color: '#f00' }).addTo(mapRef.current!)
        m.bindPopup(`${a.type} - ${a.size}`)
      })
    })
  }, [game])

  return <div ref={containerRef} className="w-full h-full min-h-[500px] rounded-lg" />
}

export default GameMap
