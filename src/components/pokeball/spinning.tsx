import { useRef, useEffect } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { Pokeball } from './index';

type Props = {
  size: number;
  duration: number;
  style?: StyleProp<ViewStyle>;
};

export function SpinningPokeball({ size, duration, style }: Props) {
  const rot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rot, { toValue: 1, duration, useNativeDriver: true })
    ).start();
  }, []);

  const rotate = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[{ transform: [{ rotate }] }, style]}>
      <Pokeball size={size} />
    </Animated.View>
  );
}
