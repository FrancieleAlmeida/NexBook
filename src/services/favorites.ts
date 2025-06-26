import { supabase } from '@/constants/supabase';

export type FavoriteStatus = 'concluido' | 'futuramente' | 'lendo';

export type Favorite = {
  id: string;
  user_id: string;
  book_id: string;
  status: FavoriteStatus;
  created_at: string;
};

export async function addOrUpdateFavorite(
  userId: string,
  book: {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string | null;
  },
  status: FavoriteStatus
): Promise<void> {
  const { data: existing, error: fetchError } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .eq('book_id', book.id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw fetchError;
  }

  if (existing) {
    const { error } = await supabase
      .from('favorites')
      .update({ status })
      .eq('user_id', userId)
      .eq('book_id', book.id);

    if (error) throw error;
  } else {
    const { error } = await supabase.from('favorites').insert([
      {
        user_id: userId,
        book_id: book.id,
        status,
      },
    ]);

    if (error) throw error;
  }
}

export async function removeFavorite(userId: string, bookId: string): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('book_id', bookId);

  if (error) throw error;
}

export async function getFavoritesByUser(userId: string): Promise<Favorite[]> {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  return data || [];
}

// NOVA função para atualizar só o status, sem precisar do objeto book completo
export async function updateFavoriteStatus(
  userId: string,
  bookId: string,
  status: FavoriteStatus
): Promise<void> {
  const { error } = await supabase
    .from('favorites')
    .update({ status })
    .eq('user_id', userId)
    .eq('book_id', bookId);

  if (error) throw error;
}
