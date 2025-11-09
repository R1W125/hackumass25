import Map from "../components/Map";
import ChatBox from "../components/ChatBox";
import useGameUpdates from "../components/useGameUpdates";

export default function Game() {
  const { gameState, connected, sendMessage } = useGameUpdates("ws://localhost:8080");

  if (!connected) return <p>Connecting to game server...</p>;
  if (!gameState) return <p>Loading game...</p>;

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
      <Map gameState={gameState} />
      <ChatBox sendMessage={sendMessage} />
    </div>
  );
}
