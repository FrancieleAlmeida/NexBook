import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Alert, Image, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { getFavoritesByUser, Favorite, FavoriteStatus, removeFavorite, updateFavoriteStatus, } from '@/services/favorites';
import FavoriteItem from '@/components/favoriteItem';



export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<{ lendo: Favorite[]; futuramente: Favorite[]; concluido: Favorite[]; }>({
    lendo: [],
    futuramente: [],
    concluido: [],
  });
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const favs = await getFavoritesByUser(user.id);
      const grouped = {
        lendo: favs.filter(f => f.status === 'lendo'),
        futuramente: favs.filter(f => f.status === 'futuramente'),
        concluido: favs.filter(f => f.status === 'concluido'),
      };
      setFavorites(grouped);
    } catch {
      Alert.alert('Erro', 'Falha ao carregar favoritos');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { fetchFavorites(); }, [user]));

  const handleRemove = async (bookId: string) => {
    if (!user) return;
    try {
      await removeFavorite(user.id, bookId);
      fetchFavorites();
    } catch {
      Alert.alert('Erro', 'Não foi possível remover o favorito');
    }
  };

  const handleChangeStatus = async (bookId: string, currentStatus: FavoriteStatus) => {
    if (!user) return;
    const statusCycle: FavoriteStatus[] = ['concluido', 'futuramente', 'lendo'];
    const next = statusCycle[(statusCycle.indexOf(currentStatus) + 1) % statusCycle.length];
    try {
      await updateFavoriteStatus(user.id, bookId, next);
      fetchFavorites();
    } catch {
      Alert.alert('Erro', 'Erro ao atualizar status');
    }
  };

  if (!user) return <View style={styles.centered}><Text>Você precisa estar logado para ver os favoritos.</Text></View>;
  if (loading) return <View style={styles.centered}><ActivityIndicator size="large" color="#008400" /></View>;

  const sections = [
    { title: '📖 Lendo recentemente', key: 'lendo' },
    { title: '🕒 Ler futuramente', key: 'futuramente' },
    { title: '✅ Concluído', key: 'concluido' },
  ] as const;

  return (
    <ScrollView contentContainerStyle={styles.list} style={{ backgroundColor: '#0C0C0E' }}>
      {sections.map(({ key, title }) => (
        <View key={key}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {favorites[key].length === 0
            ? <Text style={styles.emptyText}>Nenhum livro nesta categoria.</Text>
            : favorites[key].map(item => (
              <FavoriteItem key={item.id} item={item} onRemove={handleRemove} onChangeStatus={handleChangeStatus} />
            ))}
          <View style={styles.separator} />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#0C0C0E',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#A1A1AA',
  },
  separator: {
    height: 1,
    backgroundColor: '#2A2A2E',
    marginTop: 8,
    marginBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C0C0E',
  },
});