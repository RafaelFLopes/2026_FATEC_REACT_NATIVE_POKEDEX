import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#12122A',
    borderRadius: 12,
    padding: 12,
    margin: 6,

    flexDirection: 'column',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },

  image: {
    width: 90,
    height: 90,
  },

  content: {
    width: '100%',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },

  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  typeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 12,
    color: '#9090B0',
    lineHeight: 16,
    textAlign: 'center',
  },
});
