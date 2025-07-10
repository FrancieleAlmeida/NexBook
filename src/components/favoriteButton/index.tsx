import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Menu, IconButton } from 'react-native-paper';

import { useAuth } from '@/contexts/AuthContext';
import { getFavoritesByUser, addOrUpdateFavorite, removeFavorite, FavoriteStatus, Favorite, } from '@/services/favorites';
import { supabase } from '@/lib/supabase';
import { styles } from './style';

type BookInfo = {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
};

type Props = {
  book: BookInfo;
};

const FavoriteButton = ({ book }: Props) => {
  const { user } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useState<FavoriteStatus | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchStatus = async () => {
      const favorites: Favorite[] = await getFavoritesByUser(user.id);
      const found = favorites.find((f) => f.book_id === book.id);
      if (found) setFavoriteStatus(found.status);
      else setFavoriteStatus(null);
    };

    fetchStatus();
  }, [user?.id, book.id]);

  const toggleFavorite = async (status: FavoriteStatus) => {
    if (!user) return;

    if (favoriteStatus === status) {
      await removeFavorite(user.id, book.id);
      setFavoriteStatus(null);
    } else {
      await addOrUpdateFavorite(supabase, user.id, book, status);
      setFavoriteStatus(status);
    }

    setMenuVisible(false);
  };

  const statusColors: Record<FavoriteStatus, string> = {
    concluido: '#4CAF50',
    futuramente: '#FFA500',
    lendo: '#1E90FF',
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton
            icon={favoriteStatus ? 'bookmark' : 'bookmark-outline'}
            iconColor={favoriteStatus ? statusColors[favoriteStatus] : '#fff'}
            size={40}
            onPress={() => setMenuVisible(true)}
          />

        }
      >
        <Menu.Item
          onPress={() => toggleFavorite('concluido')}
          title="✅ Concluído"
        />
        <Menu.Item
          onPress={() => toggleFavorite('futuramente')}
          title="🕒 Ler futuramente"
        />
        <Menu.Item
          onPress={() => toggleFavorite('lendo')}
          title="📖 Lendo recentemente"
        />
      </Menu>
    </View>
  );
};


export default FavoriteButton;
