import React from 'react';
import {  View,  Text,  Image,  ScrollView,  TouchableOpacity,  Linking,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import FavoriteButton from '@/components/favoriteButton';
import { styles } from './style';

type Props = {
  book: {
    id: string;
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
};

export default function BookDetailView({ book }: Props) {
  const openLink = (url: string | null) => {
    if (url) Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0C0C0E' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.favoriteButton}>
          <FavoriteButton book={book} />
        </View>
        <View style={styles.header}>
          {book.thumbnail ? (
            <Image source={{ uri: book.thumbnail }} style={styles.thumbnail} />
          ) : (
            <View style={[styles.thumbnail, styles.noImage]}>
              <Ionicons name="book-outline" size={130} color="#000" />
            </View>
          )}
        </View>

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
          <TouchableOpacity style={styles.button} onPress={() => openLink(book.previewLink)}>
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
    </View>
  );
}

