import { useEffect, useRef, useState } from "react";

export default function useGameUpdates(wsUrl) {
  const [initData, setInitData] = useState(null);
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  useEffect(() => {
    if (!wsUrl) return;

    const connect = () => {
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        setConnected(true);
        console.log("✅ WebSocket connected");
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📩 Received:", data);

          if (data.type === "init") {
            setInitData(data);
          } else if (data.type === "update") {
            setInitData((prev) => {
              if (!prev?.gameState) return prev;
              const updated = { ...prev, gameState: { ...prev.gameState } };

              if (data.class === "provinces") {
                const idx = updated.gameState.provinces.findIndex(
                  (p) => p.province_id === data.id
                );
                if (idx !== -1) {
                  updated.gameState.provinces[idx] = {
                    ...updated.gameState.provinces[idx],
                    ...data.updates,
                  };
                }
              }
              return updated;
            });
          }
        } catch (err) {
          console.error("❌ Failed to parse message:", err);
        }
      };

      ws.current.onerror = console.error;

      ws.current.onclose = () => {
        setConnected(false);
        reconnectTimeout.current = setTimeout(connect, 3000);
      };
    };

    connect();
    return () => {
      clearTimeout(reconnectTimeout.current);
      ws.current?.close();
    };
  }, [wsUrl]);

  const sendMessage = (data) => {
    if (ws.current?.readyState === WebSocket.OPEN) ws.current.send(JSON.stringify(data));
    else console.warn("⚠️ WS not open");
  };

  return { initData, connected, sendMessage };
}
