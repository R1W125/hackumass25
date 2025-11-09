import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { WebSocketProvider } from "./assets/context/WebSocketContext";
import Home from "./pages/Home";
import Game from "./pages/Game";

function App() {
  const [session, setSession] = useState(null);

  // Check session on mount and subscribe to auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div style={{ maxWidth: 400, margin: "2rem auto", textAlign: "center" }}>
        <h1>Welcome to My App</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          redirectTo={window.location.origin}
        />
        <p style={{ marginTop: "1rem" }}>Or sign in with your email/password</p>
      </div>
    );
  }

  // Replace with your WebSocket server URL
  const wsUrl = "ws://localhost:8080";

  return (
    <WebSocketProvider url={wsUrl}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home session={session} />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
