import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Botao from '../../components/Botao';


export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=65' }}
        style={styles.avatar}
      />

      <Text style={styles.name}>Isabelle Rancan</Text>
      <Text style={styles.email}>isabelle@email.com</Text>

      <View>
        <Botao titulo="Sair" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#101923',
    color: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
});
