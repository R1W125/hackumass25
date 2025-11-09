// import React, { useMemo } from "react";

// export default function Map({ gameState }) {
//   // Helper function to safely extract coordinates from any array
//   const safeExtract = (items, key = "coords") => {
//     if (!Array.isArray(items)) return [];
//     return items.flatMap((i) => {
//       // Try coords directly
//       if (Array.isArray(i[key])) return [i[key]];
//       // Try outline (array of arrays)
//       if (Array.isArray(i.outline)) return i.outline;
//       return [];
//     });
//   };

//   // Collect all coordinates safely
//   const allCoords = useMemo(() => {
//     return [
//       ...safeExtract(gameState.continents),
//       ...safeExtract(gameState.territory),
//       ...safeExtract(gameState.cities),
//       ...safeExtract(gameState.ports),
//       ...safeExtract(gameState.ships),
//       ...safeExtract(gameState.armies),
//     ];
//   }, [gameState]);

//   // Get max X and Y for autoscaling
//   const { maxX, maxY } = useMemo(() => {
//     let maxX = 1,
//       maxY = 1;
//     for (const coord of allCoords) {
//       if (!Array.isArray(coord)) continue;
//       const [x, y] = coord;
//       if (typeof x === "number" && x > maxX) maxX = x;
//       if (typeof y === "number" && y > maxY) maxY = y;
//     }
//     return { maxX, maxY };
//   }, [allCoords]);

//   // SVG dimensions
//   const width = 600;
//   const height = 600;
//   const scale = Math.min(width / (maxX + 2), height / (maxY + 2));
//   const project = ([x, y]) => [x * scale, y * scale];

//   return (
//     <svg
//       width={width}
//       height={height}
//       style={{
//         border: "2px solid #ccc",
//         backgroundColor: "#f8f9fa",
//         borderRadius: "8px",
//       }}
//     >
//       {/* Continents */}
//       {Array.isArray(gameState.continents) &&
//         gameState.continents.map((continent, i) => (
//           <polygon
//             key={`continent-${i}`}
//             points={
//               Array.isArray(continent.outline)
//                 ? continent.outline
//                     .map((p) => project(p).join(","))
//                     .join(" ")
//                 : ""
//             }
//             fill="#c2e7d9"
//             stroke="#4d8061"
//             strokeWidth="2"
//           />
//         ))}

//       {/* Territories */}
//       {Array.isArray(gameState.territory) &&
//         gameState.territory.map((t, i) => (
//           <polygon
//             key={`territory-${i}`}
//             points={
//               Array.isArray(t.outline)
//                 ? t.outline.map((p) => project(p).join(",")).join(" ")
//                 : ""
//             }
//             fill="none"
//             stroke="#999"
//             strokeDasharray="4"
//             strokeWidth="1.5"
//           />
//         ))}

//       {/* Cities */}
//       {Array.isArray(gameState.cities) &&
//         gameState.cities.map((city) => {
//           const [x, y] = project(city.coords || [0, 0]);
//           return (
//             <circle
//               key={city.city_id}
//               cx={x}
//               cy={y}
//               r={city.isCapital ? 8 : 5}
//               fill={city.isCapital ? "#ff5555" : "#5555ff"}
//               stroke="#333"
//             />
//           );
//         })}

//       {/* Ports */}
//       {Array.isArray(gameState.ports) &&
//         gameState.ports.map((port) => {
//           const [x, y] = project(port.coords || [0, 0]);
//           return (
//             <rect
//               key={port.port_id}
//               x={x - 4}
//               y={y - 4}
//               width={8}
//               height={8}
//               fill="#ffaa00"
//               stroke="#333"
//             />
//           );
//         })}

//       {/* Ships */}
//       {Array.isArray(gameState.ships) &&
//         gameState.ships.map((ship) => {
//           const [x, y] = project(ship.coords || [0, 0]);
//           return (
//             <text key={ship.fleet_id} x={x + 5} y={y} fontSize="10" fill="#0077cc">
//               🚢{ship.number}
//             </text>
//           );
//         })}

//       {/* Armies */}
//       {Array.isArray(gameState.armies) &&
//         gameState.armies.map((army) => {
//           const [x, y] = project(army.coords || [0, 0]);
//           return (
//             <text key={army.army_id} x={x + 5} y={y - 5} fontSize="10" fill="#cc0000">
//               ⚔️{army.number}
//             </text>
//           );
//         })}
//     </svg>
//   );
// }
import React, { useMemo } from "react";

export default function Map({ gameState }) {
  const safeExtract = (items, key = "coords") => {
    if (!Array.isArray(items)) return [];
    return items.flatMap(i => {
      if (Array.isArray(i[key])) return [i[key]];
      if (Array.isArray(i.outline)) return i.outline;
      return [];
    });
  };

  const allCoords = useMemo(() => {
    return [
      ...safeExtract(gameState.continents),
      ...safeExtract(gameState.territory),
      ...safeExtract(gameState.cities),
      ...safeExtract(gameState.ports),
      ...safeExtract(gameState.ships),
      ...safeExtract(gameState.armies),
    ];
  }, [gameState]);

  const { maxX, maxY } = useMemo(() => {
    let maxX = 1, maxY = 1;
    for (const coord of allCoords) {
      if (!Array.isArray(coord)) continue;
      const [x, y] = coord;
      if (typeof x === "number" && x > maxX) maxX = x;
      if (typeof y === "number" && y > maxY) maxY = y;
    }
    return { maxX, maxY };
  }, [allCoords]);

  const width = 600;
  const height = 600;
  const scale = Math.min(width / (maxX + 2), height / (maxY + 2));
  const project = ([x, y]) => [x * scale, y * scale];

  return (
    <svg width={width} height={height} style={{ border: "2px solid #ccc", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
      {/* Continents */}
      {Array.isArray(gameState.continents) && gameState.continents.map((continent, i) => (
        <polygon
          key={`continent-${i}`}
          points={continent.outline?.map(p => project(p).join(",")).join(" ")}
          fill="#c2e7d9"
          stroke="#4d8061"
          strokeWidth="2"
        />
      ))}

      {/* Territories */}
      {Array.isArray(gameState.territory) && gameState.territory.map((t, i) => (
        <polygon
          key={`territory-${i}`}
          points={t.outline?.map(p => project(p).join(",")).join(" ")}
          fill="none"
          stroke="#999"
          strokeDasharray="4"
          strokeWidth="1.5"
        />
      ))}

      {/* Cities */}
      {Array.isArray(gameState.cities) && gameState.cities.map(city => {
        const [x, y] = project(city.coords || [0, 0]);
        return <circle key={city.city_id} cx={x} cy={y} r={city.isCapital ? 8 : 5} fill={city.isCapital ? "#ff5555" : "#5555ff"} stroke="#333" />;
      })}

      {/* Ports */}
      {Array.isArray(gameState.ports) && gameState.ports.map(port => {
        const [x, y] = project(port.coords || [0, 0]);
        return <rect key={port.port_id} x={x - 4} y={y - 4} width={8} height={8} fill="#ffaa00" stroke="#333" />;
      })}

      {/* Ships */}
      {Array.isArray(gameState.ships) && gameState.ships.map(ship => {
        const [x, y] = project(ship.coords || [0, 0]);
        return <text key={ship.fleet_id} x={x + 5} y={y} fontSize="10" fill="#0077cc">🚢{ship.number}</text>;
      })}

      {/* Armies */}
      {Array.isArray(gameState.armies) && gameState.armies.map(army => {
        const [x, y] = project(army.coords || [0, 0]);
        return <text key={army.army_id} x={x + 5} y={y - 5} fontSize="10" fill="#cc0000">⚔️{army.number}</text>;
      })}
    </svg>
  );
}
