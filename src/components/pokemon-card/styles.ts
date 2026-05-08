import { StyleSheet } from 'react-native';

export const DARK_BG = '#0D0D1F';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 5,
  },
  card: {
    backgroundColor: DARK_BG,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  topSection: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  number: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 'bold',
    fontSize: 11,
  },
  topEmoji: {
    fontSize: 18,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
  },
  glowRingOuter: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
  },
  glowRingInner: {
    position: 'absolute',
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 1.5,
  },
  image: {
    width: 82,
    height: 82,
    zIndex: 1,
  },
  defaultDivider: {
    height: 4,
  },
  bottomSection: {
    backgroundColor: DARK_BG,
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 6,
  },
  name: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
