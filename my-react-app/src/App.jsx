// import { useState, useEffect } from 'react'
// import { supabase } from './supabaseClient'
// import { Auth } from '@supabase/auth-ui-react'
// import { ThemeSupa } from '@supabase/auth-ui-shared'

// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// // import './App.css'

// function App() {
//   const [session, setSession] = useState(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     })

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(
//       (_event, session) => setSession(session)
//     )

//     return () => subscription.unsubscribe()
//   }, [])

//   if (!session)
//     return (
//       <div style={{ padding: '2rem' }}>
//         <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
//         hello
//       </div>
//     )

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Welcome! You’re logged in ✅</h2>
//       <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
//       hello
//     </div>

//   )
// }

// export default App



// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <div>
// //         <a href="https://vite.dev" target="_blank">
// //           <img src={viteLogo} className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://react.dev" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </>
// //   )
// // }

// // export default App
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Home from './pages/Home'
import Game from './pages/Game'

function App() {
  const [session, setSession] = useState(null)

  // Check session on mount and subscribe to auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => subscription.unsubscribe()
  }, [])

  // Show login form if no session
  if (!session) {
    return (
      <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
        <h1>Welcome to My App</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          // Enable Google login here; make sure Google is enabled in Supabase dashboard
          providers={['google']}
          // Disable OAuth redirect to current page
          redirectTo={window.location.origin}
        />
        <p style={{ marginTop: '1rem' }}>Or sign in with your email/password</p>
      </div>
    )
  }

  // Show main app if logged in
  const userId = session.user.id;
  // return (
  //   <div style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
  //     <h2>Welcome! You’re logged in ✅</h2>
  //     <p>Email: {session.user.email}</p>
  //     <button
  //       onClick={() => supabase.auth.signOut()}
  //       style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
  //     >
  //       Sign Out
  //     </button>
  //   </div>
  // )
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )

  
}

export default App
