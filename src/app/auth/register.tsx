import { View, Text } from 'react-native';
import { router } from 'expo-router';

import { Button } from '../components/button';
import { styles } from './style';

export default function Register() {
  return (
    <View style={styles.container}>
      <Text>Cadastre-se</Text>
      <Button title='Cadastrar' />
    </View>
  );
}
