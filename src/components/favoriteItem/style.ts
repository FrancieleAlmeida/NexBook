import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  thumbnail: {
    width: 50,
    height: 75,
    marginRight: 10,
    borderRadius: 6,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
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
