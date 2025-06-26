import axios from 'axios';
import { API_KEY } from '@/constants/books'
const BASE_URL = 'https://www.googleapis.com/books/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    printType: 'books',
  },
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export interface Book {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string | null;
}

export const searchBooks = async (
  query: string,
  startIndex = 0,
  maxResults = 20
): Promise<Book[]> => {
  try {
    const response = await api.get('/volumes', {
      params: {
        q: query,
        startIndex,
        maxResults,
      },
    });

    if (!response.data.items) return [];

    return response.data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ['Autor desconhecido'],
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
    }));
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }
};

export const getBookDetails = async (id: string) => {
  try {
    const response = await api.get(`/volumes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar detalhes do livro:', error);
    return null;
  }
};

export default api;
