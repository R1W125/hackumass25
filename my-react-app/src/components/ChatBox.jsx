import { useState } from "react";

export default function ChatBox({ sendMessage, selectedGame }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedGame) return;

    const msgObj = {
      type: "chat",
      prompt: {
        game_id: selectedGame.game_id,
        faction_id: selectedGame.faction_id,
        text: message
      },
      sender: "You"
    };

    setMessages(prev => [...prev, msgObj]);
    sendMessage(msgObj);
    setMessage("");
  };

  return (
    <div className="flex flex-col border rounded-lg p-4 w-96 h-96 bg-white/90">
      <div className="flex-1 overflow-y-auto mb-2 space-y-1">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm">
            <strong>{msg.sender}:</strong> {msg.prompt?.text || msg.text}
            <span className="text-xs text-gray-400 ml-2">
              
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button type="submit" className="bg-blue-600 text-white rounded px-4">
          Send
        </button>
      </form>
    </div>
  );
}
