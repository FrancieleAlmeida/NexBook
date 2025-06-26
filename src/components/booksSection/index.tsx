import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { searchBooks, Book } from '@/services/api';
import { styles } from './style';

interface BooksSectionProps {
  title: string;
  query: string;
}

export default function BooksSection({ title, query }: BooksSectionProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 20;

  const fetchBooks = async (loadMore = false) => {
    if (loading || loadingMore) return;
    loadMore ? setLoadingMore(true) : setLoading(true);
    setError(null);

    try {
      const newBooks = await searchBooks(query, startIndex, maxResults);
      if (loadMore) {
        setBooks((prev) => [...prev, ...newBooks]);
      } else {
        setBooks(newBooks);
      }
      setStartIndex((prev) => prev + maxResults);
    } catch {
      setError('Erro ao buscar livros');
      if (!loadMore) setBooks([]);
    } finally {
      loadMore ? setLoadingMore(false) : setLoading(false);
    }
  };

  useEffect(() => {
    setStartIndex(0);
    fetchBooks(false);
  }, [query]);

  const renderBook = ({ item }: { item: Book }) => (
    <Pressable
      onPress={() => router.navigate({ pathname: '/(tabs)/BookDetails', params: { id: item.id } })}
      style={({ pressed }) => [styles.bookCard, pressed && { opacity: 0.7 }]}
    >
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImage]}>
          <Text style={styles.noImageText}>Sem imagem</Text>
        </View>
      )}
      <Text style={styles.bookTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.bookAuthors} numberOfLines={1}>
        {item.authors.join(', ')}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {loading && !loadingMore && <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={books}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderBook}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onEndReached={() => fetchBooks(true)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#007AFF" /> : null}
      />
    </View>
  );
}