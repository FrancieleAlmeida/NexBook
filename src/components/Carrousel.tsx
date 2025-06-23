import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
};

const mockData = {
  novos: [
    {
      id: '1',
      title: 'Novo Livro 1',
      author: 'Autor 1',
      image: 'https://via.placeholder.com/100x150.png?text=Livro+1',
    },
    {
      id: '2',
      title: 'Novo Livro 2',
      author: 'Autor 2',
      image: 'https://via.placeholder.com/100x150.png?text=Livro+2',
    },
    {
      id: '3',
      title: 'Novo Livro 3',
      author: 'Autor 3',
      image: 'https://via.placeholder.com/100x150.png?text=Livro+3',
    },
  ],
  populares: [
    {
      id: '4',
      title: 'Livro Popular 1',
      author: 'Famoso 1',
      image: 'https://via.placeholder.com/100x150.png?text=Popular+1',
    },
    {
      id: '5',
      title: 'Livro Popular 2',
      author: 'Famoso 2',
      image: 'https://via.placeholder.com/100x150.png?text=Popular+2',
    },
    {
      id: '6',
      title: 'Livro Popular 3',
      author: 'Famoso 3',
      image: 'https://via.placeholder.com/100x150.png?text=Popular+3',
    },
  ],
};

type Props = {
  type: 'novos' | 'populares';
};

export default function Carousel({ type }: Props) {
  const books = mockData[type];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>{item.author}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    marginRight: 16,
    width: 100,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  author: {
    fontSize: 12,
    color: '#555',
  },
});
