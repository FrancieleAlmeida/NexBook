import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 12,
    color: '#FFFFFF', // título branco
  },
  bookCard: {
    width: 140,
    marginRight: 14,
    backgroundColor: '#1F1F1F', // fundo escuro do card
    borderRadius: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 190,
    borderRadius: 10,
    backgroundColor: '#2A2A2E', // fundo da imagem fallback
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#A1A1AA',
    fontSize: 12,
  },
  bookTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 8,
    color: '#FFFFFF', // título branco
  },
  bookAuthors: {
    color: '#A1A1AA', // texto secundário
    marginTop: 4,
    fontSize: 13,
  },
  loading: {
    paddingVertical: 20,
  },
  error: {
    color: 'red',
    paddingHorizontal: 16,
  },
});
  