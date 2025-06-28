import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: 150,
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 22,
    marginBottom: 8,
    textAlign: 'center',
  },
  authors: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#444',
    textAlign: 'justify',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginTop: 10,
  },
  buyButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 8,
  },

});
