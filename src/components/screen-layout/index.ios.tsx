import { View, StyleSheet } from 'react-native';
import { ScreenLayoutProps } from './types';

export default function ScreenLayoutIOS({ children }: ScreenLayoutProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1F',
  },
});
