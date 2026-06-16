import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getColor } from '@/constants/colors';
import { styles } from './styles';
import { PokemonCardProps } from './types';
import { Poder } from '@/@types/pokemon';

const STAT_ABBR: Record<string, string> = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    speed: 'SPD',
};

export default function PokemonCardIOS({ pokemon, onPress, selected, onCapture, captured }: PokemonCardProps) {
    const colors = getColor(pokemon.tipos);
    const borderColor = selected ? colors.accent : colors.accent + '66';

    const inner = (
        <>
            <View style={[styles.cardWash, { backgroundColor: colors.bg }]} />
            {selected && <View style={styles.selectedGlow} />}

            <View style={styles.topRow}>
                <View style={[styles.imageWrap, {
                    backgroundColor: colors.accent + '18',
                    borderColor: colors.accent + '45',
                }]}>
                    <Image source={{ uri: pokemon.imagem }} style={styles.image} resizeMode="contain" />
                </View>

                <View style={styles.headerInfo}>
                    <View style={styles.nameRow}>
                        <Text style={styles.pokemonName} numberOfLines={1}>
                            {pokemon.nome.toUpperCase()}
                        </Text>
                        <Text style={[styles.pokemonIndex, { color: colors.accent }]}>
                            #{pokemon.index}
                        </Text>
                    </View>

                    <View style={styles.typesRow}>
                        {pokemon.tipos.map((type) => {
                            const tc = getColor([type]);
                            return (
                                <View key={type} style={[styles.typeBadge, {
                                    backgroundColor: tc.accent + '22',
                                    borderColor: tc.accent + '55',
                                }]}>
                                    <Text style={[styles.typeBadgeText, { color: tc.accent }]}>
                                        {type.toUpperCase()}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.accent + '35' }]} />

            <View style={styles.powersSection}>
                <Text style={[styles.powersLabel, { color: colors.accent + 'CC' }]}>PODERES</Text>
                <View style={styles.statsGrid}>
                    {pokemon.poderes.map((poder: Poder) => (
                        <View key={poder.nome} style={styles.statRow}>
                            <Text style={styles.statName}>
                                {STAT_ABBR[poder.nome] ?? poder.nome.toUpperCase().slice(0, 6)}
                            </Text>
                            <View style={styles.statBarBg}>
                                <View style={[styles.statBarFill, {
                                    width: `${Math.min((poder.forca / 150) * 100, 100)}%` as any,
                                    backgroundColor: colors.accent,
                                }]} />
                            </View>
                            <Text style={[styles.statValue, { color: colors.accent }]}>
                                {poder.forca}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>

            {onCapture !== undefined && (
                <View style={[styles.captureRow, { borderTopColor: colors.accent + '25' }]}>
                    {captured ? (
                        <View style={styles.capturedBadge}>
                            <Text style={styles.capturedBadgeText}>✓ CAPTURADO</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            onPress={onCapture}
                            activeOpacity={0.7}
                            style={[styles.captureBtn, { backgroundColor: colors.accent }]}
                        >
                            <Text style={styles.captureBtnText}>CAPTURAR</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.75}
                style={[styles.card, { borderColor }]}
            >
                {inner}
            </TouchableOpacity>
        );
    }

    return (
        <View style={[styles.card, { borderColor }]}>
            {inner}
        </View>
    );
}
