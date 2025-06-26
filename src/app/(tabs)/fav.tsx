import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import {
  getFavoritesByUser,
  Favorite,
  FavoriteStatus,
  removeFavorite,
  updateFavoriteStatus, // função que vamos criar abaixo
} from '@/services/favorites';

type Props = {};

export default function FavoritesScreen(props: Props) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const favs = await getFavoritesByUser(user.id);
      setFavorites(favs);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar favoritos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleRemove = (bookId: string) => {
    Alert.alert('Remover favorito', 'Deseja remover este livro dos favoritos?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          if (!user) return;
          try {
            await removeFavorite(user.id, bookId);
            fetchFavorites();
          } catch {
            Alert.alert('Erro', 'Não foi possível remover o favorito');
          }
        },
      },
    ]);
  };

  const handleChangeStatus = async (bookId: string, currentStatus: FavoriteStatus) => {
    if (!user) return;
    const statusCycle: FavoriteStatus[] = ['concluido', 'futuramente', 'lendo'];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];

    try {
      await updateFavoriteStatus(user.id, bookId, nextStatus);
      fetchFavorites();
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o status');
    }
  };

  const renderItem = ({ item }: { item: Favorite }) => (
    <View style={styles.favoriteItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.bookId}>ID do livro: {item.book_id}</Text>
        <Text>Status: {item.status}</Text>
      </View>

      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => handleChangeStatus(item.book_id, item.status)}
      >
        <Text style={styles.statusButtonText}>Mudar status</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.book_id)}>
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Você precisa estar logado para ver os favoritos.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>Você ainda não tem favoritos.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  bookId: {
    fontWeight: 'bold',
  },
  statusButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  statusButtonText: {
    color: '#fff',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
