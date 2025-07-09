import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
<<<<<<< Updated upstream
import Carousel from '@/components/Carrousel';
=======
import Carousel from '../../components/Carrousel/Carrousel';
>>>>>>> Stashed changes

export default function HomeScreen() {
  return (
<<<<<<< Updated upstream
    <ScrollView style={styles.container}>
      <Text style={styles.appName}>NexBook</Text>
=======
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: '#008400' }]}>Nex</Text>
            <Text style={styles.title}>Book</Text>
            </View>
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
});
=======
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
>>>>>>> Stashed changes
