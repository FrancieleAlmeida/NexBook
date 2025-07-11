import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { ImageBackground } from 'react-native';


import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { styles } from './_style';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

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
    <ImageBackground 
    source={require('../../../assets/images/imagem_fundo.png')} 
    style={styles.background}
    resizeMode="cover"
  >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: '#008400' }]}>Nex</Text>
            <Text style={styles.title}>Book</Text>
          </View>
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
            formProps={{ name: "email", control, rules: { required: "Informe o email" } }}
            inputProps={{ placeholder: "Email" }} />
          <Input
            icon='key'
            formProps={{ name: "senha", control, rules: { required: "Informe a senha" } }}
            inputProps={{ placeholder: "Senha" }} />
          {isSubmitting ? (
            <ActivityIndicator size="large" color="#008400" />
          ) : (
            <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
