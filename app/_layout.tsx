import { Stack } from 'expo-router';
import { AppContext, AppContextType } from '../context/AppContext';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase';

export default function RootLayout() {
  const [context, setContext] = useState<AppContextType>({
    habitsArr: [],
    inputValue: '',
    isActive: false,
  });

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AppContext.Provider value={[context, setContext]}>
      <Stack screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="auth" />
        )}
      </Stack>
    </AppContext.Provider>
  );
} 