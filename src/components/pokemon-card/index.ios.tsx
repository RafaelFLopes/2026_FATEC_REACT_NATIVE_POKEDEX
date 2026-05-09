import { View, Text, Image } from 'react-native';
import { getPokemonTypeColor } from '@/constants/pokemon';
import { styles } from './styles';
import { PokemonCardProps } from './types';

export default function PokemonCardIOS({ pokemon }: PokemonCardProps) {
  const borderColor = getPokemonTypeColor(pokemon.type);

  return (
    <View style={[styles.card, { borderLeftWidth: 6, borderLeftColor: borderColor }]}>
      <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />

      <View style={styles.content}>
        <Text style={styles.name}>{pokemon.name}</Text>

        <View style={[styles.typeBadge, { backgroundColor: borderColor }]}>
          <Text style={styles.typeText}>
            {pokemon.type.charAt(0).toUpperCase() + pokemon.type.slice(1)}
          </Text>
        </View>

        <Text style={styles.description}>{pokemon.description}</Text>
      </View>
    </View>
  );
}
