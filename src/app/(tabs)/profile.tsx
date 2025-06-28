import React from 'react';
import {  View,  Text,  Image,  StyleSheet,  Alert,  TouchableOpacity,  ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

type ProfileOptionProps = {
  icon: React.ComponentProps<typeof Ionicons>['name']; 
  label: string;
  onPress: () => void;
  color?: string;
};

export default function ProfileScreen() {
  const { setAuth, user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    setAuth(null);
    if (error) {
      Alert.alert('Erro', 'Erro ao sair da conta, tente novamente.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header} />
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=65' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.user_metadata.name || 'Usuário'}</Text>
        <Text style={styles.username}>@{user?.user_metadata.username || 'usuario'}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.actions}>
          <ProfileOption
            icon="bookmarks-outline"
            label="Meus Favoritos"
            onPress={() => router.push('/(tabs)/fav')}
          />
          <ProfileOption icon="log-out-outline" label="Sair da conta" onPress={handleLogout} color="#FF3B30" />
        </View>
      </View>
    </ScrollView>
  );
}

function ProfileOption({ icon, label, onPress, color = '#333' }: ProfileOptionProps) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Ionicons name={icon} size={24} color={color} style={{ marginRight: 16 }} />
      <Text style={[styles.optionText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: '#f1f4f8',
  },
  header: {
    height: 100,
    backgroundColor: '#000',
  },
  profileCard: {
    marginTop: -60,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  username: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  email: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
    marginBottom: 16,
  },
  actions: {
    width: '100%',
    marginTop: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
