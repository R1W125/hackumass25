import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LobbyPage from './pages/LobbyPage'
import GamePage from './pages/GamePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LobbyPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </Router>
  )
}

export default App
