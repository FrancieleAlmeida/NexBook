import { View, Text, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Input } from "./components/input";

import { Button } from './components/button';
import { styles } from './auth/style';
import { useForm } from 'react-hook-form';




export default function Index() {
  const { control, handleSubmit } = useForm()

  function handleLogin(data: any) {
    console.log(data)
    router.navigate("/(tabs)");
  };
  function handleRegister() {
    router.navigate("/auth/register");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Input
        icon='user'
        formProps={{ name: "user", control }}
        inputProps={{ placeholder: "Usuario" }} />
      <Input
        icon='key'
        formProps={{ name: "senha", control }}
        inputProps={{ placeholder: "senha", onSubmitEditing: handleSubmit(handleLogin) }} />
      <Button title="Entrar" onPress={handleSubmit(handleLogin)} />
      <Button title="Cadastre-se" onPress={handleRegister} />
    </View>
  );
}
