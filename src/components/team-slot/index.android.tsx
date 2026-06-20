import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getColor } from '@/constants/colors';
import { TeamSlotProps } from './types';

function TypeBadge({ type }: { type: string }) {
    const { accent } = getColor([type]);
    return (
        <View style={[expandedStyles.typeBadge, { backgroundColor: accent + '22', borderColor: accent + '55' }]}>
            <Text style={[expandedStyles.typeBadgeText, { color: accent }]}>
                {type.toUpperCase()}
            </Text>
        </View>
    );
}

export default function TeamSlotAndroid({ pokemon, onRemove, swapMode, variant = 'compact' }: TeamSlotProps) {

    // ─── EXPANDED (carrossel) ────────────────────────────────────────────
    if (variant === 'expanded') {
        if (!pokemon) {
            return (
                <View style={[expandedStyles.slot, expandedStyles.slotEmpty]}>
                    <Text style={expandedStyles.emptyMark}>?</Text>
                    <Text style={expandedStyles.emptyLabel}>Slot vazio</Text>
                </View>
            );
        }

        const colors = getColor(pokemon.tipos);
        const isSwappable = swapMode && onRemove;

        const expandedInner = (
            <>
                <View style={[expandedStyles.wash, { backgroundColor: colors.bg }]} />
                <Image
                    source={{ uri: pokemon.imagem }}
                    style={expandedStyles.image}
                    resizeMode="contain"
                />
                <Text style={expandedStyles.name} numberOfLines={1}>
                    {pokemon.nome.toUpperCase()}
                </Text>
                <View style={expandedStyles.typesRow}>
                    {pokemon.tipos.map(t => <TypeBadge key={t} type={t} />)}
                </View>
                {isSwappable && (
                    <Text style={[expandedStyles.swapIcon, { color: '#E15610' }]}>⟳ Toque para substituir</Text>
                )}
            </>
        );

        if (isSwappable) {
            return (
                <TouchableOpacity
                    onPress={onRemove}
                    activeOpacity={0.7}
                    style={[expandedStyles.slot, expandedStyles.slotFilled, { borderColor: '#E15610' }]}
                >
                    {expandedInner}
                </TouchableOpacity>
            );
        }

        return (
            <View style={[expandedStyles.slot, expandedStyles.slotFilled, { borderColor: colors.accent + '99' }]}>
                {expandedInner}
            </View>
        );
    }

    // ─── COMPACT (fileira — comportamento original) ──────────────────────
    if (!pokemon) {
        return (
            <View style={[styles.slot, styles.slotEmpty]}>
                <Text style={styles.emptyMark}>?</Text>
            </View>
        );
    }

    const colors = getColor(pokemon.tipos);
    const isSwappable = swapMode && onRemove;

    const inner = (
        <>
            <View style={[styles.wash, { backgroundColor: colors.bg }]} />
            <Image
                source={{ uri: pokemon.imagem }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.name} numberOfLines={1}>
                {pokemon.nome.toUpperCase()}
            </Text>
            {isSwappable && (
                <Text style={[styles.remove, { color: '#E15610' }]}>⟳</Text>
            )}
        </>
    );

    if (isSwappable) {
        return (
            <TouchableOpacity
                onPress={onRemove}
                activeOpacity={0.7}
                style={[styles.slot, styles.slotFilled, { borderColor: '#E15610' }]}
            >
                {inner}
            </TouchableOpacity>
        );
    }

    return (
        <View style={[styles.slot, styles.slotFilled, { borderColor: colors.accent + '99' }]}>
            {inner}
        </View>
    );
}

// ─── compact styles ───────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    slot: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 4,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 80,
    },
    slotFilled: {
        backgroundColor: '#12122A',
    },
    slotEmpty: {
        borderColor: '#1E1E45',
        borderStyle: 'dashed',
        backgroundColor: 'rgba(255,255,255,0.02)',
    },
    wash: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.25,
        borderRadius: 10,
    },
    image: {
        width: 44,
        height: 44,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 7,
        fontWeight: '800',
        letterSpacing: 0.5,
        textAlign: 'center',
        marginTop: 2,
    },
    remove: {
        fontSize: 8,
        fontWeight: '900',
        marginTop: 2,
        opacity: 0.8,
    },
    emptyMark: {
        color: '#3A3A5A',
        fontSize: 22,
        fontWeight: '900',
    },
});

// ─── expanded styles (carrossel) ─────────────────────────────────────────────
const expandedStyles = StyleSheet.create({
    slot: {
        alignSelf: 'stretch',
        borderRadius: 14,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 16,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 190,
        gap: 8,
    },
    slotFilled: {
        backgroundColor: '#12122A',
    },
    slotEmpty: {
        borderColor: '#1E1E45',
        borderStyle: 'dashed',
        backgroundColor: 'rgba(255,255,255,0.02)',
        gap: 6,
    },
    wash: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.18,
        borderRadius: 14,
    },
    image: {
        width: 96,
        height: 96,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 1,
        textAlign: 'center',
    },
    typesRow: {
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    typeBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
    },
    typeBadgeText: {
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.8,
    },
    swapIcon: {
        fontSize: 12,
        fontWeight: '900',
        opacity: 0.9,
        marginTop: 4,
        letterSpacing: 0.5,
    },
    emptyMark: {
        color: '#3A3A5A',
        fontSize: 40,
        fontWeight: '900',
    },
    emptyLabel: {
        color: '#3A3A5A',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
});
