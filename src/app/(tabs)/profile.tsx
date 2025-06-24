import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Button } from '../../components/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { setAuth, user } = useAuth()

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null)

    if (error) {
      Alert.alert('Error', "Erro ao sair da conta, tente novamente mais tarde")
      return
    }
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/150?img=65' }}
        style={styles.avatar}
      />

      <Text style={styles.name}>{user?.user_metadata.name}</Text>
      <Text style={styles.subname}>@{user?.user_metadata.user}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
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
  subname: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
});
