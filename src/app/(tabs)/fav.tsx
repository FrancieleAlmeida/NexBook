import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function FavoritosScreen() {
  const livrosLidos = [
    {
      id: '1',
      title: '1984',
      author: 'George Orwell',
      image: 'https://via.placeholder.com/80x120.png?text=1984',
    },
    {
      id: '2',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      image: 'https://via.placeholder.com/80x120.png?text=Casmurro',
    },
  ];

  const livrosParaLer = [
    {
      id: '3',
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      image: 'https://via.placeholder.com/80x120.png?text=Hobbit',
    },
    {
      id: '4',
      title: 'Orgulho e Preconceito',
      author: 'Jane Austen',
      image: 'https://via.placeholder.com/80x120.png?text=Orgulho',
    },
  ];

  const renderLivro = (livro: { title: string; author: string; image: string; id: string }) => (
    <View key={livro.id} style={styles.bookItem}>
      <Image source={{ uri: livro.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{livro.title}</Text>
        <Text style={styles.bookAuthor}>{livro.author}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>📖 Lidos</Text>
      {livrosLidos.map(renderLivro)}

      <Text style={styles.sectionTitle}>📚 Para Ler</Text>
      {livrosParaLer.map(renderLivro)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#101923',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
    marginBottom: 12,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 4,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
});
