import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import BookDetailView from '@/components/bookDetailView';
import { getBookDetails } from '@/services/api';

type Book = Parameters<typeof BookDetailView>[0]['book'];

export default function BookDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  function stripHtml(html: string): string {
    return html.replace(/<[^>]+>/g, '');
  }

  useEffect(() => {
    if (!id) return;

    async function fetchBook() {
      setLoading(true);
      try {
        const data = await getBookDetails(id);
        if (!data) return;

        const volume = data.volumeInfo;
        const saleInfo = data.saleInfo;

        setBook({
          id,
          title: volume.title || 'Título indisponível',
          authors: volume.authors || ['Autor desconhecido'],
          description: volume.description ? stripHtml(volume.description) : 'Sem descrição.',
          thumbnail: volume.imageLinks?.thumbnail || null,
          publisher: volume.publisher || null,
          publishedDate: volume.publishedDate || null,
          pageCount: volume.pageCount || null,
          averageRating: volume.averageRating || null,
          ratingsCount: volume.ratingsCount || null,
          language: volume.language || null,
          categories: volume.categories || null,
          previewLink: volume.previewLink || null,
          buyLink: saleInfo?.buyLink || null,
          maturityRating: volume.maturityRating || null,
        });
      } catch (error) {
        console.error('Erro ao carregar livro:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#008400" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.centered}>
        <Text>Livro não encontrado.</Text>
      </View>
    );
  }

  return <BookDetailView book={book} />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
