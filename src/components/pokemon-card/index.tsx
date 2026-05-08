import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, Pressable } from 'react-native';
import { Pokemon } from '@/constants/pokemon';
import { styles, DARK_BG } from './styles';

const TYPE_CONFIG = {
  fire:     { color: '#FF5722', light: '#FF8A65', emoji: '🔥' },
  water:    { color: '#1E88E5', light: '#64B5F6', emoji: '💧' },
  grass:    { color: '#2E7D32', light: '#81C784', emoji: '🌿' },
  electric: { color: '#F9A825', light: '#FFF176', emoji: '⚡' },
  ice:      { color: '#0288D1', light: '#81D4FA', emoji: '❄️' },
  fighting: { color: '#B71C1C', light: '#EF9A9A', emoji: '👊' },
  poison:   { color: '#6A1B9A', light: '#CE93D8', emoji: '☠️' },
  ground:   { color: '#E65100', light: '#FFCC80', emoji: '🌍' },
  flying:   { color: '#0277BD', light: '#81D4FA', emoji: '🌬️' },
  psychic:  { color: '#AD1457', light: '#F48FB1', emoji: '🔮' },
  bug:      { color: '#558B2F', light: '#C5E1A5', emoji: '🐛' },
  rock:     { color: '#546E7A', light: '#B0BEC5', emoji: '🪨' },
  ghost:    { color: '#4527A0', light: '#B39DDB', emoji: '👻' },
  dragon:   { color: '#1565C0', light: '#90CAF9', emoji: '🐉' },
  dark:     { color: '#212121', light: '#757575', emoji: '🌑' },
  steel:    { color: '#455A64', light: '#90A4AE', emoji: '⚙️' },
  fairy:    { color: '#C2185B', light: '#F8BBD9', emoji: '✨' },
  normal:   { color: '#616161', light: '#BDBDBD', emoji: '⭐' },
} as const;

function FlameEdge({ color }: { color: string }) {
  const teeth = [14, 22, 18, 26, 16, 24, 20, 14];
  return (
    <View style={{ backgroundColor: DARK_BG, flexDirection: 'row', justifyContent: 'space-evenly', height: 28 }}>
      {teeth.map((h, i) => (
        <View
          key={i}
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: 9,
            borderRightWidth: 9,
            borderTopWidth: h,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: color,
          }}
        />
      ))}
    </View>
  );
}

function WaveEdge({ color, light }: { color: string; light: string }) {
  return (
    <View style={{ height: 22, backgroundColor: DARK_BG }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: -4,
          right: -4,
          height: 36,
          backgroundColor: color,
          borderBottomLeftRadius: 120,
          borderBottomRightRadius: 120,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 5,
          left: 12,
          right: -20,
          height: 28,
          backgroundColor: light,
          opacity: 0.4,
          borderBottomLeftRadius: 90,
          borderBottomRightRadius: 90,
        }}
      />
    </View>
  );
}

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
}

export function PokemonCard({ pokemon, index }: PokemonCardProps) {
  const config = TYPE_CONFIG[pokemon.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG.normal;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 450,
        delay: index * 90,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        delay: index * 90,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1300, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1300, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handlePressIn = () =>
    Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true }).start();

  const handlePressOut = () =>
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 3 }).start();

  const glowOpacity = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.95] });
  const glowScale = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1.10] });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] },
      ]}
    >
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={styles.card}>
          {/* Colored header */}
          <View style={[styles.topSection, { backgroundColor: config.color }]}>
            <View style={styles.topRow}>
              <Text style={styles.number}>#{pokemon.id.padStart(3, '0')}</Text>
              <Text style={styles.topEmoji}>{config.emoji}</Text>
            </View>

            {/* Pokémon image + animated glow ring */}
            <View style={styles.imageWrapper}>
              <Animated.View
                style={[
                  styles.glowRingOuter,
                  {
                    borderColor: config.light,
                    opacity: glowOpacity,
                    transform: [{ scale: glowScale }],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.glowRingInner,
                  { borderColor: config.light, opacity: glowOpacity },
                ]}
              />
              <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
            </View>
          </View>

          {/* Type-specific border decoration */}
          {pokemon.type === 'fire' && <FlameEdge color={config.color} />}
          {pokemon.type === 'water' && <WaveEdge color={config.color} light={config.light} />}
          {pokemon.type !== 'fire' && pokemon.type !== 'water' && (
            <View style={[styles.defaultDivider, { backgroundColor: config.color }]} />
          )}

          {/* Dark body */}
          <View style={styles.bottomSection}>
            <Text style={styles.name}>{pokemon.name}</Text>
            <View style={[styles.badge, { backgroundColor: config.color }]}>
              <Text style={styles.badgeText}>
                {config.emoji} {pokemon.type.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

