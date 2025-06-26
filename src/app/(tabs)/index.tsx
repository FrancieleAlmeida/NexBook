import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import { categories, publishers, authors } from '@/constants/bookSections';
import BooksSection from '@/components/booksSection';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>NextBook</Text>

        {categories.map(({ title, query }) => (
          <BooksSection key={title} title={title} query={query} />
        ))}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Principais Editoras</Text>
          {publishers.map(({ name, query }) => (
            <BooksSection key={name} title={name} query={query} />
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Principais Autores</Text>
          {authors.map(({ name, query }) => (
            <BooksSection key={name} title={name} query={query} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 20,
    color: '#111827',
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#1F2937',
  },
});
