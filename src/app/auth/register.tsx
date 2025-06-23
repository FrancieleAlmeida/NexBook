import { View, Text } from 'react-native';

import { Input } from '../components/input';
import { Button } from '../components/button';
import { styles } from './style';

export default function Register() {
  return (
    <View style={styles.container}>
      <Text>Cadastre-se</Text>
      <Input place='User' />
      <Input place='Nome' />
      <Input place='email' />
      <Input place='senha' />
      <Button title='Cadastrar' />
    </View>
  );
}
