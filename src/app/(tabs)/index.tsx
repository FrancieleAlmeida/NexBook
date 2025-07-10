import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, } from 'react-native';
import { categories, publishers, authors } from '@/constants/bookSections';
import BooksSection from '@/components/booksSection';


export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: '#008400' }]}>Nex</Text>
          <Text style={styles.title}>Book</Text>
        </View>

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
    paddingTop: 50,
    backgroundColor: '#0C0C0E',
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});