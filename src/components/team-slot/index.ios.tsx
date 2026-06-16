import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getColor } from '@/constants/colors';
import { TeamSlotProps } from './types';

export default function TeamSlotIOS({ pokemon, onRemove, swapMode }: TeamSlotProps) {
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
