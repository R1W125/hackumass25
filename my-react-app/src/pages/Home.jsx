// import { useState } from 'react'
// import { supabase } from '../supabaseClient'

// export default function Home({ session }) {
//   const [games, setGames] = useState([]) // placeholder for current games

//   const userId = session.user.id

//   const handleNewGame = async () => {
//     // Example: create a new game and add current user as player
//     const { data: newGame, error: gameError } = await supabase
//       .from('games')
//       .insert({ name: 'New Game' })
//       .select()
//       .single()

//     if (gameError) {
//       console.error('Error creating game:', gameError)
//       return
//     }

//     const { error: playerError } = await supabase.from('players').insert({
//       user_id: userId,
//       game_id: newGame.id,
//       faction_id: 1, // default faction
//     })

//     if (playerError) {
//       console.error('Error joining game:', playerError)
//       return
//     }

//     // Update current games list
//     setGames([...games, newGame])
//   }

//   return (
//     <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
//       {/* Profile Section */}
//       <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
//         <h2>Profile</h2>
//         <p>Email: {session.user.email}</p>
//         <p>User ID: {userId}</p>
//         <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
//       </section>

//       {/* Current Games Section */}
//       <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
//         <h2>Current Games</h2>
//         {games.length === 0 ? (
//           <p>No games joined yet.</p>
          
//         ) : (
//           <ul>
//             {games.map((game) => (
//               <li key={game.id}>{game.name}</li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* New Game Button */}
//       <section>
//         <button
//           onClick={handleNewGame}
//           style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
//         >
//           New Game
//         </button>
//       </section>
//     </div>
//   )
// }


import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Home({ session }) {
  const [games, setGames] = useState([]) // placeholder for current games
  const userId = session.user.id
  const navigate = useNavigate()

  const handleNewGame = async () => {
    const { data: newGame, error: gameError } = await supabase
      .from('games')
      .insert({ name: 'New Game' })
      .select()
      .single()

    if (gameError) {
      console.error('Error creating game:', gameError)
      return
    }

    const { error: playerError } = await supabase.from('players').insert({
      user_id: userId,
      game_id: newGame.id,
      faction_id: 1, // default faction
    })

    if (playerError) {
      console.error('Error joining game:', playerError)
      return
    }

    setGames([...games, newGame])
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
      {/* Profile Section */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Profile</h2>
        <p>Email: {session.user.email}</p>
        <p>User ID: {userId}</p>
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      </section>

      {/* Current Games Section */}
      <section style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Current Games</h2>
        {games.length === 0 ? (
          <p>No games joined yet.</p>
        ) : (
          <ul>
            {games.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        )}
      </section>

      {/* New Game Button */}
      <section style={{ marginTop: '1rem' }}>
        <button
          onClick={handleNewGame}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer', marginRight: '1rem' }}
        >
          New Game
        </button>

        {/* 👇 Added button to navigate to Game page */}
        <button
          onClick={() => navigate('/game')}
          style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}
        >
          Go to Game Page
        </button>
      </section>
    </div>
  )
}
