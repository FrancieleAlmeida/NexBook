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
    color: '#1F2937',
  },
  bookCard: {
    width: 140,
    marginRight: 14,
    backgroundColor: '#FFFFFF',
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
  bookTitle: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 8,
    color: '#111827',
  },
  bookAuthors: {
    color: '#6B7280',
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
