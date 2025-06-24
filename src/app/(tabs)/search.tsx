import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../components/button';


export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const mockBooks = [
    {
      id: '1',
      title: 'Harry Potter e a Pedra Filosofal',
      author: 'J.K. Rowling',
      image: 'https://via.placeholder.com/100x150.png?text=Harry',
    },
    {
      id: '2',
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      image: 'https://via.placeholder.com/100x150.png?text=Hobbit',
    },
    {
      id: '3',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      image: 'https://via.placeholder.com/100x150.png?text=Casmurro',
    },
    {
      id: '4',
      title: '1984',
      author: 'George Orwell',
      image: 'https://via.placeholder.com/100x150.png?text=1984',
    },
    {
      id: '5',
      title: 'Orgulho e Preconceito',
      author: 'Jane Austen',
      image: 'https://via.placeholder.com/100x150.png?text=Orgulho',
    },
    {
      id: '6',
      title: 'Harry Potter e o Cálice de Fogo',
      author: 'J.K. Rowling',
      image: 'https://via.placeholder.com/100x150.png?text=Harry',
    },
  ];

  const handleSearch = () => {
    setHasSearched(true);

    const resultadosFiltrados = mockBooks.filter((livro) =>
      livro.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(resultadosFiltrados);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do livro"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Buscar Livro" onPress={handleSearch} />

      {hasSearched && results.length === 0 && (
        <Text style={styles.noResults}>
          Nenhum resultado encontrado para: "{searchTerm}"
        </Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#101923',
  },
  input: {
    backgroundColor: '#223449',
    color: '#fff',
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  resultItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#101923',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  noResults: {
    textAlign: 'center',
    color: '#999',
    marginTop: 16,
    fontStyle: 'italic',
  },
});
