import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ButtonProps } from './types';

export default function ButtonWeb({ title, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.button, style]} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    maxWidth: 320,
    width: '100%',
    alignSelf: 'center',
    height: 48,
    backgroundColor: '#E15610',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
