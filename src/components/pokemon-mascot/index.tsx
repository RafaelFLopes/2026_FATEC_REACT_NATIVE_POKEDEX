import { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

export function PokemonMascot() {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1600, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.7],
  });
  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.15],
  });

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.glowCircle, { opacity: glowOpacity, transform: [{ scale: glowScale }] }]}
      />
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  glowCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F9A825',
  },
  image: {
    width: 170,
    height: 170,
    zIndex: 1,
  },
});
