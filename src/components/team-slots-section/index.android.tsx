import { useState } from 'react';
import {
    View, ScrollView, Dimensions, StyleSheet,
    NativeSyntheticEvent, NativeScrollEvent,
} from 'react-native';
import { TeamSlot } from '@/components/team-slot';
import { TeamSlotsSectionProps } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TeamSlotsSectionNative({ team, swapMode, onSlotSwap, maxTeam }: TeamSlotsSectionProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    function handleScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
        const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
        setActiveIndex(index);
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScrollEnd}
                bounces={false}
            >
                {Array.from({ length: maxTeam }).map((_, i) => {
                    const slotPokemon = team[i];
                    return (
                        <View key={slotPokemon?.index ?? `empty-${i}`} style={styles.slide}>
                            <TeamSlot
                                pokemon={slotPokemon}
                                onRemove={slotPokemon && swapMode ? () => onSlotSwap(slotPokemon) : undefined}
                                swapMode={swapMode}
                                variant="expanded"
                            />
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.dotsRow}>
                {Array.from({ length: maxTeam }).map((_, i) => (
                    <View
                        key={i}
                        style={[styles.dot, i === activeIndex && styles.dotActive]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // margem negativa cancela o paddingHorizontal: 12 do container pai em team.tsx
    container: {
        marginHorizontal: -12,
    },
    slide: {
        width: SCREEN_WIDTH,
        paddingHorizontal: 12,
    },
    dotsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        paddingTop: 10,
        paddingBottom: 2,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#3A3A5A',
    },
    dotActive: {
        width: 18,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#E53935',
    },
});
