// import './App.css'
// import Habits from './App/HabitList'

// function App() {

//   return (
//     <>
//       <Habits />
//     </>
//   )
// }

// export default App
import './App.css'
import Habits from './App/HabitList'
import { useState, useEffect } from 'react'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient(
  'https://oemvioekuurzhttgbxwl.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lbXZpb2VrdXVyemh0dGdieHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNzU4MzQsImV4cCI6MjA0MTc1MTgzNH0.PrjuZuR0FgRGB8_p6N-_Igwy3bZXBJPECGRVSzqh5nA'
)

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  console.log({session})

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (
      <>
        <Habits />
      </>
    )
  }
}