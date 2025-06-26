import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Book = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
};

const FAVORITES_KEY = '@favorite_books';

export default function Favorites() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Erro ao carregar favoritos', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = async (id: string) => {
    Alert.alert(
      'Remover favorito',
      'Tem certeza que quer remover este livro dos favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            try {
              const newFavorites = favorites.filter(book => book.id !== id);
              setFavorites(newFavorites);
              await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
            } catch (e) {
              console.error('Erro ao remover favorito', e);
            }
          },
        },
      ]
    );
  };

  const renderBook = ({ item }: { item: Book }) => (
    <View style={styles.bookContainer}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImage]}>
          <Text style={{ color: '#aaa', fontSize: 12 }}>Sem imagem</Text>
        </View>
      )}
      <View style={styles.bookInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.authors}>{item.authors.join(', ')}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFavorite(item.id)}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Carregando favoritos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Meus Favoritos</Text>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você ainda não tem livros favoritos.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderBook}
          contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 16,
    color: '#222',
  },
  bookContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  thumbnail: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#ddd',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111',
  },
  authors: {
    color: '#666',
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});
