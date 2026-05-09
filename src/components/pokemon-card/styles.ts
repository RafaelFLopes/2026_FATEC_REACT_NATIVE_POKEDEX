import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,

    borderLeftWidth: 6,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  image: {
    width: 100,
    height: 100,
  },

  content: {
    flex: 1,
    gap: 8,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121214',
  },

  typeBadge: {
    alignSelf: 'flex-start',
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
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
});
