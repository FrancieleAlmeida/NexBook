import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
<<<<<<< Updated upstream
import Carousel from '@/components/Carrousel';
=======
import Carousel from '../../components/Carrousel/Carrousel';
>>>>>>> Stashed changes

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.appName}>NexBook</Text>

      <Text style={styles.sectionTitle}>🎁 Novos</Text>
      <Carousel type="novos" />

      <Text style={styles.sectionTitle}>⭐ Populares</Text>
      <Carousel type="populares" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101923',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#fff',
  },
});
