// src/pages/Game.jsx
import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import { useWebSocket } from "../assets/context/WebSocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";

export default function Game() {
  const { state } = useLocation();
  const navigate = useNavigate();
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
      if (data.type === "init") {
        setGameId(data.game_id);
        setFactionId(data.faction_id);
        setGameState(data.gameState);
      }

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

  const handleFullTestUpdate = () => {
    sendMessage({ prompt: { type: "message", game_id: gameId, text: "/test_full" } });
  };

  const handleEndTurn = () => {
    sendMessage({ prompt: { type: "message", game_id: gameId, faction_id: factionId, text: "/end_turn" } });
  }


  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      {/* Sticky Back button */}
      <div
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: "0.5rem 0",
          zIndex: 100,
          borderBottom: "1px solid #ccc",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#f44336",
            color: "white",
            cursor: "pointer",
          }}
        >
          🔙 Back
        </button>
      </div>

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

      <button
        onClick={handleFullTestUpdate}
        style={{
            margin: "1rem",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#f57c00",
            color: "white",
            cursor: "pointer",
        }}
        >
        🔄 Full Test Update
      </button>

      


      <div style={{ marginTop: "1rem" }}>
        <Map gameState={gameState} />
      </div>

      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
        <ChatBox sendMessage={sendMessage} selectedGame={{ game_id: gameId, faction_id: factionId }} />
      </div>

      <button
        onClick={handleEndTurn}
        style={{
            margin: "1rem",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#f57c00",
            color: "white",
            cursor: "pointer",
        }}
        >
        End Turn
      </button>

    </div>
  );
}
