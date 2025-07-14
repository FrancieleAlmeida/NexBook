import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { ImageBackground } from 'react-native';


import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { styles } from './style';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const { control, handleSubmit, formState: { isSubmitting, errors } } = useForm()
  const { setAuth } = useAuth();

  async function handleRegister(data: any) {
    const { email, senha, name, user } = data

    const { data: sessionData, error } = await supabase.auth.signUp({
      email: email,
      password: senha,
      options: {
        data: {
          name: name,
          username: user,
        }
      }
    });

    if (error) {
      Alert.alert("error", error.message)
      return
    }
    if (!error) {
      Alert.alert("Cadastro realizado", "Redirecionado para a home");
      router.replace("/(tabs)");
    }
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
            formProps={{ name: "user", control, rules: { required: "Informe o usuario ", minLength: { value: 3, message: "O usuario deve ter pelo menos 3 dígitos" } } }}
            inputProps={{ placeholder: "Usuario" }}
            errorMessage={errors.user?.message as string} />

          <Input
            icon='user'
            formProps={{ name: "name", control, rules: { required: "Informe o nome", minLength: { value: 3, message: "O nome deve ter pelo menos 3 " } } }}
            inputProps={{ placeholder: "Nome" }}
            errorMessage={errors.name?.message as string} />

          <Input
            icon="mail"
            formProps={{
              name: "email",
              control,
              rules: {
                required: "Informe o email",
                pattern: {
                  value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i,
                  message: "Email inválido",
                },
              },
            }}
            inputProps={{ placeholder: "Email" }}
            errorMessage={errors.email?.message as string}

          />

          <Input
            icon='key'
            formProps={{ name: "senha", control, rules: { required: "Informe a senha", minLength: { value: 6, message: "A senha deve ter pelo menos 6 dígitos." } } }}
            inputProps={{ placeholder: "Senha", secureTextEntry: true }}
            errorMessage={errors.senha?.message as string} />
          {isSubmitting ? (
            <ActivityIndicator size="large" color="#008400" />
          ) : (
            <Button title="Cadastrar" onPress={handleSubmit(handleRegister,)} />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
