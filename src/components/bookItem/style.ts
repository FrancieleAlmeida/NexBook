import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bookCard: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: '#1F1F1F',
    borderRadius: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  thumbnail: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#2A2A2E',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  bookTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
  },
  bookAuthors: {
    marginTop: 4,
    fontSize: 14,
    color: '#A1A1AA',
  },
});