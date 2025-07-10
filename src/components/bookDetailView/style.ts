import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#0C0C0E',
  },
  thumbnail: {
    width: 150,
    height: 220,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#2A2A2E',
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
    color: '#FFFFFF',
  },
  authors: {
    fontSize: 16,
    color: '#A1A1AA',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#A1A1AA',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'justify',
    marginVertical: 12,
  },
  button: {
    backgroundColor: '#008400',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 10,
  },
  buyButton: {
    backgroundColor: '#0AAB3C',
  },
  buttonText: {
    color: '#FFFFFF',
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
