import { Stack, router } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Provider as PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </PaperProvider>
  );
}

function MainLayout() {
  const { setAuth } = useAuth();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setAuth(data.session.user);
        router.replace('/(tabs)');
      } else {
        setAuth(null);
        router.replace('/auth/login');
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session.user);
        router.replace('/(tabs)');
      } else {
        setAuth(null);
        router.replace('/auth/login');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/fav" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/profile" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/search" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="pages/BookDetails" options={{ headerShown: true }} />
    </Stack>
  );
}
