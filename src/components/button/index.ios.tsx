import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ButtonProps } from './types';

export default function ButtonIOS({ title, style, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.button, style]} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    backgroundColor: '#E15610',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
