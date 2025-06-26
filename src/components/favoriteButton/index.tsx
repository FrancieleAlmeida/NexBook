import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import {
  addOrUpdateFavorite,
  removeFavorite,
  FavoriteStatus,
  getFavoritesByUser,
  Favorite,
} from '@/services/favorites';

type BookInfo = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
};

type Props = {
  book: BookInfo;
};

const STATUS_LABELS: Record<FavoriteStatus, string> = {
  concluido: 'Concluído',
  futuramente: 'Ler futuramente',
  lendo: 'Lendo recentemente',
};

export default function FavoriteButton({ book }: Props) {
  const { user } = useAuth();

  const [favoriteStatus, setFavoriteStatus] = useState<FavoriteStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    async function fetchFavorite() {
      setLoading(true);
      try {
        const favorites: Favorite[] = await getFavoritesByUser(user!.id);
        const fav = favorites.find((f) => f.book_id === book.id);
        if (fav) setFavoriteStatus(fav.status);
        else setFavoriteStatus(null);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorite();
  }, [user?.id, book.id]);

  const toggleFavorite = async (status: FavoriteStatus) => {
    if (!user?.id) return;
    setLoading(true);

    try {
      if (favoriteStatus === status) {
        await removeFavorite(user.id, book.id);
        setFavoriteStatus(null);
      } else {
        await addOrUpdateFavorite(user.id, book, status);
        setFavoriteStatus(status);
      }
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.notLogged}>
        <Text>Faça login para favoritar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, favoriteStatus === 'concluido' && styles.activeButton]}
        onPress={() => toggleFavorite('concluido')}
        disabled={loading}
      >
        <Feather
          name="check-circle"
          size={24}
          color={favoriteStatus === 'concluido' ? 'white' : '#007AFF'}
        />
        <Text style={[styles.label, favoriteStatus === 'concluido' && styles.activeLabel]}>
          {STATUS_LABELS['concluido']}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, favoriteStatus === 'futuramente' && styles.activeButton]}
        onPress={() => toggleFavorite('futuramente')}
        disabled={loading}
      >
        <Feather
          name="clock"
          size={24}
          color={favoriteStatus === 'futuramente' ? 'white' : '#007AFF'}
        />
        <Text style={[styles.label, favoriteStatus === 'futuramente' && styles.activeLabel]}>
          {STATUS_LABELS['futuramente']}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, favoriteStatus === 'lendo' && styles.activeButton]}
        onPress={() => toggleFavorite('lendo')}
        disabled={loading}
      >
        <Feather
          name="book"
          size={24}
          color={favoriteStatus === 'lendo' ? 'white' : '#007AFF'}
        />
        <Text style={[styles.label, favoriteStatus === 'lendo' && styles.activeLabel]}>
          {STATUS_LABELS['lendo']}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#e6f0ff',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  label: {
    marginTop: 4,
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
  },
  activeLabel: {
    color: 'white',
  },
  notLogged: {
    padding: 16,
    alignItems: 'center',
  },
});
