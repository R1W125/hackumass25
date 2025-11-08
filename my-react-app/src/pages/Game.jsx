import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import ChatBox from "../components/ChatBox";
import { initialGameState } from "../components/Gamestate";


export default function Game() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState(initialGameState);

  return (
    <div style={{ textAlign: "center", padding: "1rem" }}>
      <h2>Game: {gameState.game_id}</h2>
      

      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        ⬅️ Back to Home
      </button>

      <Map gameState={gameState} />

        <ChatBox gameId={gameState.game_id} />
    </div>
  );
}
