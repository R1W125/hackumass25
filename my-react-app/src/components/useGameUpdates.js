import { useEffect, useRef, useState } from "react";

export default function useGameUpdates(wsUrl) {
  const [gameState, setGameState] = useState(null);
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    if (!wsUrl) return;

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected:", wsUrl);
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📩 Received from server:", data);

        if (data.type === "init") {
          setGameState(data.gameState);
        } else if (data.type === "update") {
          setGameState((prev) => {
            if (!prev) return prev;

            const updated = { ...prev };
            const cls = data.class;
            const idKey = cls.slice(0, -1) + "_id";
            const idx = updated[cls].findIndex((x) => x[idKey] === data.id);

            if (idx !== -1) {
              updated[cls][idx] = {
                ...updated[cls][idx],
                ...data.updates,
              };
            }

            return updated;
          });
        }
      } catch (err) {
        console.error("❌ Failed to parse WebSocket message:", err);
      }
    };

    ws.current.onerror = (err) => console.error("⚠️ WebSocket error:", err);
    ws.current.onclose = () => {
      console.log("🔌 WebSocket closed");
      setConnected(false);
    };

    return () => {
      ws.current?.close();
    };
  }, [wsUrl]);

  // ✅ Send a message to the server
  const sendMessage = (data) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    } else {
      console.warn("⚠️ Tried to send message, but WebSocket is not open.");
    }
  };

  return { gameState, connected, sendMessage };
}
