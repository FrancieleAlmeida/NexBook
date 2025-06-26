import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';

import { searchBooks, Book } from '@/services/api';

export default function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 20;

  const debounceTimeout = useRef<number | null>(null);

  const fetchBooks = async (searchTerm: string, loadMore = false, index = 0) => {
    if (!searchTerm.trim()) {
      setBooks([]);
      setLoading(false);
      return;
    }

    if (loading || loadingMore) return;

    loadMore ? setLoadingMore(true) : setLoading(true);
    setError(null);

    try {
      const newBooks = await searchBooks(searchTerm, index, maxResults);
      if (loadMore) {
        setBooks(prev => [...prev, ...newBooks]);
      } else {
        setBooks(newBooks);
      }
      setStartIndex(index + maxResults);
    } catch {
      setError('Erro ao buscar livros');
      if (!loadMore) setBooks([]);
    } finally {
      loadMore ? setLoadingMore(false) : setLoading(false);
    }
  };


  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setStartIndex(0);
      fetchBooks(query, false, 0);
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const renderBook = ({ item }: { item: Book }) => (
    <Pressable
      onPress={() => router.push({ pathname: '/(tabs)/BookDetails', params: { id: item.id } })}
      style={({ pressed }) => [styles.bookCard, pressed && { opacity: 0.7 }]}
    >
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImage]}>
          <Text style={styles.noImageText}>Sem imagem</Text>
        </View>
      )}
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.bookAuthors} numberOfLines={1}>{item.authors.join(', ')}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar livros..."
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      {loading && !loadingMore && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        onEndReached={() => fetchBooks(query, true, startIndex)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#007AFF" /> : null}
        ListEmptyComponent={
          !loading && query.trim() !== '' ? (
            <Text style={styles.noResults}>Nenhum livro encontrado.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 10,
  },
  searchInput: {
    height: 50,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  bookCard: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  thumbnail: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  bookTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
  },
  bookAuthors: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#6B7280',
  },
});
