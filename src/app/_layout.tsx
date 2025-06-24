import { Stack, router } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

function MainLayout() {
  const { setAuth } = useAuth()

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {

      if (session) {
        setAuth(session.user)
        router.replace('/(tabs)')
        return
      }

      setAuth(null)
      router.replace("/auth/login")
    })
  }, [])
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: false }} />
      <Stack.Screen
        name='(tabs)/index'
        options={{ headerShown: false }} />
      <Stack.Screen
        name='(tabs)/fav'
        options={{ headerShown: false }} />
      <Stack.Screen
        name='(tabs)/profile'
        options={{ headerShown: false }} />
      <Stack.Screen
        name='(tabs)/search'
        options={{ headerShown: false }} />
      <Stack.Screen
        name='auth/register'
        options={{ headerShown: false }} />
      <Stack.Screen
        name='auth/login'
        options={{ headerShown: false }} />

    </Stack>
  );
}
