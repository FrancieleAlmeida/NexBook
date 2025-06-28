import React from 'react';
import { Pressable, Text, View, Image} from 'react-native';
import { router } from 'expo-router';

import { Book } from '@/services/api';
import { styles } from './style';
import { Ionicons } from '@expo/vector-icons';

export default function BookItem({ item }: { item: Book }) {
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/pages/BookDetails', params: { id: item.id } })}
      style={({ pressed }) => [styles.bookCard, pressed && { opacity: 0.7 }]}
    >
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImage]}>
          <Ionicons name="book-outline" size={60} color="#000" />
        </View>
      )}
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.bookAuthors} numberOfLines={1}>{item.authors.join(', ')}</Text>
      </View>
    </Pressable>
  );
}
