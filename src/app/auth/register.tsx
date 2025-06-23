import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';



import { Input } from '../components/input';
import { Button } from '../components/button';
import { styles } from './style';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm()

  async function handleRegister(data: any) {
    const { email, senha } = data
    const { error } = await supabase.auth.signUp({
      email: email,
      password: senha,
    })

    if (error) {
      Alert.alert("error", error.message)
      return
    }
    Alert.alert("Cadastro realizado", "Agora faça login.");
    router.replace("/");

  }

  return (
    <View style={styles.container}>
      <Text>Cadastre-se</Text>
      <Input
        icon='user'
        formProps={{ name: "user", control }}
        inputProps={{ placeholder: "Usuario" }} />
      <Input
        icon='user'
        formProps={{ name: "name", control }}
        inputProps={{ placeholder: "Nome" }} />
      <Input
        icon='mail'
        formProps={{ name: "email", control }}
        inputProps={{ placeholder: "Email" }} />
      <Input
        icon='key'
        formProps={{ name: "senha", control }}
        inputProps={{ placeholder: "Senha" }} />
      {isSubmitting ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
      )}
    </View>
  );
}
