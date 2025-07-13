import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Favorite, FavoriteStatus } from '@/services/favorites';
import { Button } from '@/components/button';
import { styles } from './style';
import { useRouter } from 'expo-router';

type Props = {
  item: Favorite;
  onRemove: (bookId: string) => void;
  onChangeStatus: (bookId: string, status: FavoriteStatus) => void;
};

export default function FavoriteItem({ item, onRemove, onChangeStatus }: Props) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.navigate({ pathname: '/pages/BookDetails', params: { id: item.book_id } })}
      style={({ pressed }) => [styles.favoriteItem, pressed && { opacity: 0.7 }]}
    >
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImage]}>
          <Ionicons name="book-outline" size={50} color="#FFFFFF" />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{item.title || 'Título não disponível'}</Text>
        <Text style={styles.secondaryText}>{item.authors || 'Autor(es) não disponível(is)'}</Text>
        <Text style={styles.secondaryText}>Status: {item.status}</Text>

        <View style={styles.buttons}>
          <Button
            title="Mudar"
            onPress={(e) => {
              e.stopPropagation?.();
              onChangeStatus(item.book_id, item.status);
            }}
            style={{
              width: 80,
              height: 36,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <Button
            title="Remover"
            onPress={(e) => {
              e.stopPropagation?.();
              onRemove(item.book_id);
            }}
            style={{
              width: 80,
              height: 36,
              backgroundColor: '#FF3B30',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
          />
        </View>
      </View>
    </Pressable>
  );
}
