import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const WebSocketContext = createContext();

export function WebSocketProvider({ url, children }) {
  const ws = useRef(null);
  const [connected, setConnected] = useState(false);

  // Refs to store listeners for messages
  const listeners = useRef([]);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connected:", url);
      setConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        listeners.current.forEach((cb) => cb(data));
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err);
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      setConnected(false);
    };

    ws.current.onerror = (err) => console.error("WebSocket error:", err);

    return () => ws.current.close();
  }, [url]);

  const sendMessage = (data) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  };

  const addListener = (cb) => {
    listeners.current.push(cb);
    return () => {
      listeners.current = listeners.current.filter((fn) => fn !== cb);
    };
  };

  return (
    <WebSocketContext.Provider value={{ ws: ws.current, connected, sendMessage, addListener }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
