import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';

type Book = {
  title: string;
  authors: string[];
  description: string;
  thumbnail: string | null;
  publisher: string | null;
  publishedDate: string | null;
  pageCount: number | null;
  averageRating: number | null;
  ratingsCount: number | null;
  language: string | null;
  categories: string[] | null;
  previewLink: string | null;
  buyLink: string | null;
  maturityRating: string | null;
};

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
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        const data = await res.json();

        const volume = data.volumeInfo;
        const saleInfo = data.saleInfo;

        setBook({
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
        <ActivityIndicator size="large" color="#007AFF" />
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

  const openLink = (url: string | null) => {
    if (url) Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {book.thumbnail ? (
        <Image source={{ uri: book.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImage]}>
          <Text>Sem imagem</Text>
        </View>
      )}

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.authors}>Autor(es): {book.authors.join(', ')}</Text>

      {book.publisher && <Text style={styles.info}>Editora: {book.publisher}</Text>}
      {book.publishedDate && <Text style={styles.info}>Publicado em: {book.publishedDate}</Text>}
      {book.pageCount !== null && <Text style={styles.info}>Páginas: {book.pageCount}</Text>}

      {book.averageRating !== null && (
        <Text style={styles.info}>
          Nota média: {book.averageRating} ({book.ratingsCount ?? 0} avaliações)
        </Text>
      )}

      {book.maturityRating && (
        <Text style={styles.info}>
          Classificação: {book.maturityRating === 'NOT_MATURE' ? 'Livre' : 'Adulto'}
        </Text>
      )}

      {book.language && <Text style={styles.info}>Idioma: {book.language.toUpperCase()}</Text>}

      {book.categories && (
        <Text style={styles.info}>Categorias: {book.categories.join(', ')}</Text>
      )}

      <Text style={styles.description}>{book.description}</Text>

      {book.previewLink && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => openLink(book.previewLink)}
        >
          <Text style={styles.buttonText}>Ver prévia no Google Books</Text>
        </TouchableOpacity>
      )}

      {book.buyLink && (
        <TouchableOpacity
          style={[styles.button, styles.buyButton]}
          onPress={() => openLink(book.buyLink)}
        >
          <Text style={styles.buttonText}>Comprar livro</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 150,
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  authors: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#444',
    textAlign: 'justify',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginTop: 10,
  },
  buyButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
