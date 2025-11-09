// src/pages/Game.jsx
import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import { useWebSocket } from "../assets/context/WebSocketContext";
import { useLocation } from "react-router-dom";

export default function Game() {
  const { state } = useLocation();
  const { game_id: initialGameId, faction_id: initialFactionId } = state || {};
  const { connected, sendMessage, addListener } = useWebSocket();

  const [gameState, setGameState] = useState(null);
  const [gameId, setGameId] = useState(initialGameId || null);
  const [factionId, setFactionId] = useState(initialFactionId || null);

  // Rejoin game whenever WebSocket reconnects
  useEffect(() => {
    if (!connected || !gameId) return;

    sendMessage({ prompt: { type: "join_game", game_id: gameId, user: factionId } });
  }, [connected, gameId, factionId, sendMessage]);

  // Listen for WebSocket messages
  useEffect(() => {
    if (!connected) return;

    const removeListener = addListener((data) => {
      // Initial game data
      if (data.type === "init") {
        setGameId(data.game_id);
        setFactionId(data.faction_id);
        setGameState(data.gameState);
      }

      // Province updates
      if (data.type === "update" && data.class === "provinces") {
        setGameState((prev) => {
          if (!prev) return prev;
          const updated = { ...prev, provinces: [...prev.provinces] };
          const idx = updated.provinces.findIndex((p) => p.province_id === data.id);
          if (idx !== -1) updated.provinces[idx] = { ...updated.provinces[idx], ...data.updates };
          return updated;
        });
      }
    });

    return () => removeListener();
  }, [connected, addListener]);

  if (!connected) return <div>🔌 Connecting to server...</div>;
  if (!gameState) return <div>⏳ Waiting for game to initialize...</div>;

  const handleTestUpdate = () => {
    sendMessage({ prompt: { type: "message", game_id: gameId, text: "/test" } });
  };

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h2>🎮 Game ID: {gameId}</h2>
      <p>🛡️ Faction: {factionId}</p>

      <button
        onClick={handleTestUpdate}
        style={{
          margin: "1rem",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#4caf50",
          color: "white",
          cursor: "pointer",
        }}
      >
        ⚔️ Test Update
      </button>

      <div style={{ marginTop: "1rem" }}>
        <Map gameState={gameState} />
      </div>
    </div>
  );
}
