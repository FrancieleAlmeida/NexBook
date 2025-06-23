import { View, Text } from 'react-native';
import { router } from 'expo-router';

import { Button } from '../components/button';
import { styles } from './style';

export default function Login() {

  function handleLogin() {
    router.navigate("/(tabs)");
  };
  function handleRegister() {
    router.navigate("/auth/register");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Cadastre-se" onPress={handleRegister} />
    </View>
  );
}
