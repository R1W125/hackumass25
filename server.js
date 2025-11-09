// server.js
const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT }, () => {
  console.log(`✅ WebSocket server running at ws://localhost:${PORT}`);
});

const clients = new Set();
const games = {}; // In-memory store

function createNewGame(userId) {
  const game_id = uuidv4();
  const faction_id = "1";

  const gameState = {
    game_id,
    owner: userId,
    provinces: [
      {
        province_id: "1",
        faction_id: "1",
        centroid: [0.3, 0.5],
        border: [
          [0.1, 0.2],
          [0.3, 0.8],
          [0.5, 0.6],
          [0.4, 0.4],
        ],
        name: "Province 1",
        army: { faction_id: "1", numbers: 100 },
        fort : false,
        port : true,
        neighbors: [],
      },
      {
        province_id: "2",
        faction_id: "2",
        centroid: [0.6, 0.7],
        border: [
          [0.4, 0.6],
          [0.7, 0.8],
          [0.8, 0.6],
          [0.4, 0.4],
        ],
        name: "Province 2",
        army: { faction_id: "2", numbers: 50 },
        fort : true,
        port : false,
        neighbors: [],
      },
    ],
    continents: [
        [
            [0.0, 0.0],
            [.5, 0.0],
            [.5, .5],
            [0.0, .5]

    ]
],
    factions: [
      { faction_id: "1", is_valiable: true, is_defeated: false, turn_ended: false },
      { faction_id: "2", is_valiable: true, is_defeated: false, turn_ended: false },
    ],
  };

  games[game_id] = gameState;
  return { game_id, faction_id, gameState, owner: userId };
}

function broadcastToGame(game_id, data) {
  const msg = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.game_id === game_id) {
      client.send(msg);
    }
  });
}

wss.on("connection", (ws) => {
  console.log("🟢 Client connected");
  clients.add(ws);

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      const prompt = data.prompt || {};
      console.log("📨 Received:", data);

      if (prompt.type === "new_game") {
        const initData = createNewGame(prompt.user);
        ws.game_id = initData.game_id;
        ws.faction_id = initData.faction_id;

        ws.send(JSON.stringify({ type: "init", ...initData }));
        console.log(`🎮 New game created (${initData.game_id})`);
        return;
      }

      if (prompt.type === "join_game") {
        const { game_id, faction_id } = prompt;
        if (!games[game_id]) {
          ws.send(JSON.stringify({ type: "error", message: "Game not found." }));
          return;
        }
        ws.game_id = game_id;
        ws.faction_id = faction_id;
        ws.send(JSON.stringify({ type: "init", gameState: games[game_id], game_id, faction_id, owner: prompt.user }));
        console.log(`👥 Player joined game ${game_id}`);
        return;
      }

      if (prompt.type === "message") {
        const { game_id, text } = prompt;
        if (!games[game_id]) return;

        broadcastToGame(game_id, {
          type: "chat",
          text,
          sender: data.sender || "Player",
          time: new Date().toISOString(),
        });

        if (text === "/test") {
          const game = games[game_id];
          const [p1, p2] = game.provinces;
          const temp = p1.army.numbers;
          p1.army.numbers = p2.army.numbers;
          p2.army.numbers = temp;

          broadcastToGame(game_id, {
            type: "update",
            class: "provinces",
            id: p1.province_id,
            updates: { army: p1.army },
          });
          broadcastToGame(game_id, {
            type: "update",
            class: "provinces",
            id: p2.province_id,
            updates: { army: p2.army },
          });
          console.log("🔄 Test update broadcasted.");
        }

        if (text === "/test_full") {
            const game = games[game_id];

            // Update armies randomly
            game.provinces.forEach((p) => {
                p.army.numbers = Math.floor(Math.random() * 200);
                p.army.faction_id = Math.random() < 0.5 ? "1" : "2";
            });

            // Toggle forts, cities, ports randomly
            game.provinces.forEach((p) => {
                p.fort = Math.random() < 0.5;
                p.city = Math.random() < 0.5;
                p.port = Math.random() < 0.5;
            });

            // Change factions' turn ended state randomly
            game.factions.forEach((f) => {
                f.turn_ended = Math.random() < 0.5;
                f.is_defeated = Math.random() < 0.2;
            });

            // Broadcast updated provinces
            game.provinces.forEach((p) => {
                broadcastToGame(game_id, {
                type: "update",
                class: "provinces",
                id: p.province_id,
                updates: { ...p },
                });
            });

            console.log("🔄 Full test update broadcasted.");
            }

      }
    } catch (err) {
      console.error("❌ Error handling message:", err);
    }
  });

  ws.on("close", () => {
    console.log("🔴 Client disconnected");
    clients.delete(ws);
  });
});
