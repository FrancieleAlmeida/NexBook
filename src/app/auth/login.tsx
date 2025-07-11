import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { ImageBackground } from 'react-native';

import { Input } from "@/components/input";
import { Button } from '@/components/button';
import { styles } from './_style';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';


export default function Index() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm()
  const { setAuth } = useAuth();


  async function handleLogin(data: any) {
    const { email, senha } = data
    const { data: sessionData, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    });
    if (error) {
      Alert.alert("Incorreto", "Informe o email e senha corretos")
      return
    }
    if (sessionData?.session?.user) {
      setAuth(sessionData.session.user);
      Alert.alert("Bem Vindo");
      router.replace("/(tabs)");
    }
  };
  function handleRegister() {
    router.navigate("/auth/register");
  };

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
            icon='mail'
            formProps={{ name: "email", control, rules: { required: "Informe o email" } }}
            inputProps={{ placeholder: "email" }} />
          <Input
            icon='key'
            formProps={{ name: "senha", control, rules: { required: "Informe a senha" } }}
            inputProps={{ placeholder: "senha" }} />
          {isSubmitting ? (
            <ActivityIndicator size="large" color="#008400" />
          ) : (
            <Button title="Entrar" onPress={handleSubmit(handleLogin)} />
          )}
          <Button title="Cadastre-se" onPress={handleRegister} />
        </View>
      </View>
    </ImageBackground>
  );
}

