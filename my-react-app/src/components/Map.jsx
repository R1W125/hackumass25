// src/components/Map.jsx
import React, { useMemo } from "react";

export default function Map({ gameState }) {
  if (!gameState) return <div>Loading map...</div>;

  const width = 600;
  const height = 600;
  const project = ([x, y]) => [x * width, height - y * height];

  // Safe defaults for continents and provinces
  const continents = gameState.continents || [];
  const provinces = gameState.provinces || [];

  const factionColors = useMemo(() => {
    const colors = ["#e57373", "#64b5f6", "#81c784", "#fff176", "#ba68c8"];
    const map = {};
    (gameState.factions || []).forEach((f, i) => {
      map[f.faction_id] = colors[i % colors.length];
    });
    return map;
  }, [gameState.factions]);

  return (
    <svg
      width={width}
      height={height}
      style={{
        border: "2px solid #ccc",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
      }}
    >
      {continents.map((c, i) => (
        <polygon
          key={`continent-${i}`}
          points={(c.outline || []).map((p) => project(p).join(",")).join(" ")}
          fill="#c2e7d9"
          stroke="#4d8061"
          strokeWidth="2"
          opacity={0.6}
        />
      ))}

      {provinces.map((p) => (
        <polygon
          key={`province-${p.province_id}`}
          points={(p.border || []).map((pt) => project(pt).join(",")).join(" ")}
          fill={factionColors[p.faction_id] || "#ddd"}
          stroke="#333"
          strokeWidth="1.5"
          opacity={0.85}
        />
      ))}

      {provinces.map((p) => {
        const [x, y] = project(p.centroid || [0, 0]);
        const icons = [];
        if (p.city) icons.push("🏙️");
        if (p.port) icons.push("⚓");
        if (p.army) icons.push(`⚔️${p.army.numbers}`);
        if (p.fort) icons.push("🏰");

        return (
          <g key={`label-${p.province_id}`} transform={`translate(${x},${y})`}>
            {icons.length > 0 && (
              <text y={-6} textAnchor="middle" fontSize="12">
                {icons.join(" ")}
              </text>
            )}
            <text y={10} textAnchor="middle" fontSize="10" fill="#222">
              {p.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
