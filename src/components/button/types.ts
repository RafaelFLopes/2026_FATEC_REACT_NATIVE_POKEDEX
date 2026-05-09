import { TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  style?: StyleProp<ViewStyle>;
};
