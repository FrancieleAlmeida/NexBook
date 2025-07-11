import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 10,
    borderRadius: 8,
  },
  thumbnail: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: '#2A2A2E',
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#A1A1AA',
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 8,
    justifyContent: "flex-end",
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
