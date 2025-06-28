import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Favorite, FavoriteStatus } from '@/services/favorites';
import { Button } from '@/components/button';
import { styles } from './style';

type Props = {
  item: Favorite;
  onRemove: (bookId: string) => void;
  onChangeStatus: (bookId: string, status: FavoriteStatus) => void;
};

export default function FavoriteItem({ item, onRemove, onChangeStatus }: Props) {
  return (
    <View style={styles.favoriteItem}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImage]}>
          <Ionicons name="book-outline" size={50} color="#000" />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{item.title || 'Título não disponível'}</Text>
        <Text>{item.authors || 'Autor(es) não disponível(is)'}</Text>
        <Text>Status: {item.status}</Text>
        <View style={styles.buttons}>
          <Button title="Mudar" onPress={() => onChangeStatus(item.book_id, item.status)} style={{ width: 80, height: 36 }} />
          <Button title="Remover" onPress={() => onRemove(item.book_id)} style={{ width: 80, height: 36, backgroundColor: "#FF3B30" }} />
        </View>
      </View>
    </View>
  );
}
