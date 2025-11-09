// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import { initialGameState } from "../components/Gamestate";
import useGameUpdates from "../components/useGameUpdates";

export default function Home({ session }) {
  const [games, setGames] = useState([]);
  const [newGameLoading, setNewGameLoading] = useState(false);
  const [numFactions, setNumFactions] = useState(4); // default number of factions
  const userId = session.user.id;
  const navigate = useNavigate();

  const { sendMessage, connected, initData } = useGameUpdates("ws://localhost:8080");

  // Load existing games from Supabase
  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching games:", error);
        return;
      }

      setGames(
        data.map((d) => ({
          ...d,
          name: `Game ${d.game_id.substring(0, 6)}`,
        }))
      );
    };

    fetchGames();
  }, [userId]);

  // Watch for new game creation from WebSocket
  useEffect(() => {
    if (!initData || initData.owner !== userId) return;

    const { game_id, faction_id } = initData;

    supabase
      .from("players")
      .insert([{ user_id: userId, game_id, faction_id }])
      .then(({ error }) => {
        if (error) console.error("Supabase insert failed:", error);
        else {
          setGames((prev) => [
            ...prev,
            {
              id: Date.now(),
              user_id: userId,
              game_id,
              faction_id,
              created_at: new Date().toISOString(),
              name: `Game ${game_id.substring(0, 6)}`,
            },
          ]);
          setNewGameLoading(false);
        }
      });
  }, [initData, userId]);

  const handleNewGame = () => {
    if (!connected) {
      alert("WebSocket not connected. Try again in a moment.");
      return;
    }
    setNewGameLoading(true);
    sendMessage({
      type: "chat",
      sender: "You",
      prompt: {
        type: "new_game",
        user: userId,
        num_factions: numFactions, // send the number of factions to the server
      },
    });
  };

  return (
    <div style={{ maxWidth: 1000, margin: "2rem auto", padding: "1rem" }}>
      {/* Profile Section */}
      <section style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h2>Profile</h2>
        <p>Email: {session.user.email}</p>
        <p>User ID: {userId}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </section>

      {/* Join Existing Games Section */}
      <section style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h2>Join Existing Games</h2>
        {games.length === 0 ? (
          <p>No games joined yet.</p>
        ) : (
          games.map((game) => (
            <button
              key={`${game.id}-${new Date(game.created_at).getTime()}`}
              onClick={() =>
                navigate("/game", {
                  state: { game_id: game.game_id, faction_id: game.faction_id },
                })
              }
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Join {game.name} (Faction {game.faction_id})
            </button>
          ))
        )}
      </section>

      {/* Start New Game Section */}
      <section style={{ marginBottom: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h2>Start New Game</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Number of Factions:{" "}
            <input
              type="number"
              min={2}
              max={10}
              value={numFactions}
              onChange={(e) => setNumFactions(Number(e.target.value))}
              style={{ width: "60px", padding: "0.25rem" }}
            />
          </label>
        </div>
        <button
          onClick={handleNewGame}
          disabled={newGameLoading}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            opacity: newGameLoading ? 0.6 : 1,
          }}
        >
          {newGameLoading ? "Starting..." : "Start New Game"}
        </button>
      </section>

      {/* Map Preview Section */}
      <section style={{ border: "1px solid #ccc", padding: "1rem" }}>
        <h2>Current World Map</h2>
        <p style={{ marginBottom: "1rem", color: "#555" }}>
          This is a static preview of the game map.
        </p>
        <Map gameState={initialGameState} />
      </section>
    </div>
  );
}
