import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
<<<<<<< Updated upstream
=======
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: false }} />
      <Stack.Screen name="pages/BookDetails" options={{ headerShown: true }} />
>>>>>>> Stashed changes
    </Stack>
  );
}
