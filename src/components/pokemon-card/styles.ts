import { StyleSheet, Platform } from 'react-native';
import { Colors } from '@/constants/colors';

const isWeb = Platform.OS === 'web';

export const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#12122A',
        borderRadius: 12,
        padding: isWeb ? 14 : 12,
        margin: isWeb ? 8 : 6,
        borderWidth: 1,
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
    },
    cardWash: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.45,
        borderRadius: 12,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingBottom: 10,
    },
    imageWrap: {
        width: 58,
        height: 58,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    image: {
        width: 50,
        height: 50,
    },
    headerInfo: {
        flex: 1,
        gap: 6,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    pokemonName: {
        color: Colors.white,
        fontSize: isWeb ? 15 : 13,
        fontWeight: '900',
        letterSpacing: 0.8,
        flexShrink: 1,
    },
    pokemonIndex: {
        fontSize: isWeb ? 12 : 11,
        fontWeight: '800',
        letterSpacing: 1,
        flexShrink: 0,
    },
    typesRow: {
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
    },
    typeBadge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
        borderWidth: 1,
    },
    typeBadgeText: {
        fontSize: isWeb ? 9 : 8,
        fontWeight: '800',
        letterSpacing: 0.8,
    },
    divider: {
        height: 1,
        marginBottom: isWeb ? 10 : 8,
    },
    powersSection: {
        gap: 6,
    },
    powersLabel: {
        fontSize: isWeb ? 9 : 8,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 2,
    },
    statsGrid: {
        gap: isWeb ? 5 : 4,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    statName: {
        color: Colors.whiteAlpha['45'],
        fontSize: isWeb ? 9 : 8,
        fontWeight: '700',
        letterSpacing: 0.5,
        width: isWeb ? 52 : 44,
    },
    statBarBg: {
        flex: 1,
        height: 4,
        backgroundColor: Colors.whiteAlpha['08'],
        borderRadius: 2,
        overflow: 'hidden',
    },
    statBarFill: {
        height: '100%',
        borderRadius: 2,
        opacity: 0.85,
    },
    statValue: {
        fontSize: isWeb ? 10 : 9,
        fontWeight: '800',
        width: isWeb ? 28 : 24,
        textAlign: 'right',
    },
});
