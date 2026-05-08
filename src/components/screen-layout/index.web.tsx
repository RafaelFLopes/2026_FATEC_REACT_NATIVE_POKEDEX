import { View, StyleSheet, Platform } from 'react-native';
import { ScreenLayoutProps } from './types';

export default function ScreenLayoutWeb({ children }: ScreenLayoutProps) {
  return (
    <View style={styles.outer}>
      <View style={styles.phone}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#030310',
    alignItems: 'center',
    ...Platform.select({
      web: {
        backgroundImage:
          'radial-gradient(circle at 20% 50%, #1a0a2e 0%, #030310 60%)',
      } as any,
    }),
  },
  phone: {
    flex: 1,
    width: 430,
    backgroundColor: '#0D0D1F',
    overflow: 'hidden',
    ...Platform.select({
      web: {
        maxWidth: '100%',
        boxShadow: '0 0 60px rgba(229, 57, 53, 0.15), 0 0 120px rgba(0,0,0,0.8)',
      } as any,
    }),
  },
});
