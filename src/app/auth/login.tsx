import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';

import { Input } from "@/components/input";

import { Button } from '@/components/button';
import { styles } from './style';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase';




export default function Index() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm()

  async function handleLogin(data: any) {
    const { email, senha } = data
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    })
    if (error) {
      Alert.alert("Incorreto", "Informe o email e senha corretos")
      return
    }
    Alert.alert("Bem Vindo");
    router.replace("/(tabs)");
  };
  function handleRegister() {
    router.navigate("/auth/register");
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Input
        icon='mail'
        formProps={{ name: "email", control, rules: { required: "Informe o email" } }}
        inputProps={{ placeholder: "email" }} />
      <Input
        icon='key'
        formProps={{ name: "senha", control, rules: { required: "Informe a senha" } }}
        inputProps={{ placeholder: "senha" }} />
      {isSubmitting ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Entrar" onPress={handleSubmit(handleLogin)} />
      )}
      <Button title="Cadastre-se" onPress={handleRegister} />
    </View>
  );
}

