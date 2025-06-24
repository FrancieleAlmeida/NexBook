import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';



import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { styles } from './style';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm()

  async function handleRegister(data: any) {
    const { email, senha, name, user } = data

    if ((!name || name.length < 3) || (!user || user.length < 3)) {
      Alert.alert('Campo Obrigatorio', 'Nome e usurio deve ter pelo menos 3 letras');
      return;
    }
    const { error } = await supabase.auth.signUp({
      email: email,
      password: senha,
      options: {
        data: {
          name: name,
          user: user,
        }
      }
    })

    if (error) {
      Alert.alert("error", error.message)
      return
    }
    Alert.alert("Cadastro realizado", "Usuário cadastrado!.");
    router.replace("/auth/login");

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
        formProps={{ name: "email", control, rules: { required: "Informe o email" } }}
        inputProps={{ placeholder: "Email" }} />
      <Input
        icon='key'
        formProps={{ name: "senha", control, rules: { required: "Informe a senha" } }}
        inputProps={{ placeholder: "Senha" }} />
      {isSubmitting ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <Button title="Cadastrar" onPress={handleSubmit(handleRegister)} />
      )}
    </View>
  );
}
