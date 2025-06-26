import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  bookCard: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 1,
  },
  thumbnail: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
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
    color: '#111827',
  },
  bookAuthors: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
});
