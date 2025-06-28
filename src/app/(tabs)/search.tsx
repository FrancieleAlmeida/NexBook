import React, { useState, useEffect, useRef } from 'react';
import {
  TextInput, FlatList, Text, StyleSheet, ActivityIndicator, SafeAreaView, NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { searchBooks, Book } from '@/services/api';
import BookItem from '@/components/bookItem';

const MAX_RESULTS = 20;
const SEARCH_DEBOUNCE_DELAY = 1000;

export default function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const fetchBooks = async (searchTerm: string, loadMore = false, index = 0) => {
    if (!searchTerm.trim() || loading || loadingMore) return;

    loadMore ? setLoadingMore(true) : setLoading(true);
    setError(null);

    try {
      const newBooks = await searchBooks(searchTerm, index, MAX_RESULTS);
      setBooks((prev) => (loadMore ? [...prev, ...newBooks] : newBooks));
      setStartIndex(index + MAX_RESULTS);

      if (!loadMore) {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }
    } catch {
      setError('Erro ao buscar livros');
      if (!loadMore) setBooks([]);
    } finally {
      loadMore ? setLoadingMore(false) : setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setStartIndex(0);
      fetchBooks(query, false, 0);
    }, SEARCH_DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  const handleSubmit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    fetchBooks(query, false, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar livros..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />

      {loading && !loadingMore && (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        ref={flatListRef} 
        data={books}
        keyExtractor={(item, index) => item.id + '-' + index} 
        renderItem={({ item }) => <BookItem item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        removeClippedSubviews
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum && !loadingMore && books.length >= MAX_RESULTS) {
            fetchBooks(query, true, startIndex);
            setOnEndReachedCalledDuringMomentum(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? (
          <ActivityIndicator size="small" color="#007AFF" />
        ) : null}
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
