import React, { useState } from "react";

export default function ChatBox({ webhookUrl = "https://webhook.site/3fffba0d-22bb-4926-8a53-0fb3f827e3fd" }) {
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const payload = {
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    console.log("Sending payload:", payload); // debug log

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log("Message sent, response status:", res.status);
    } catch (err) {
      console.error("Failed to send message:", err);
    }

    setMessage(""); // clear input
  };

  return (
    <form onSubmit={sendMessage} style={{ display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />
      <button type="submit" style={{ padding: "8px 16px" }}>Send</button>
    </form>
  );
}
