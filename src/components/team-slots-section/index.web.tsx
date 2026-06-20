import { View, StyleSheet } from 'react-native';
import { TeamSlot } from '@/components/team-slot';
import { TeamSlotsSectionProps } from './types';

export default function TeamSlotsSectionWeb({ team, swapMode, onSlotSwap, maxTeam }: TeamSlotsSectionProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.slotsRow}>
                {Array.from({ length: maxTeam }).map((_, i) => {
                    const slotPokemon = team[i];
                    return (
                        <TeamSlot
                            key={slotPokemon?.index ?? `empty-${i}`}
                            pokemon={slotPokemon}
                            onRemove={slotPokemon && swapMode ? () => onSlotSwap(slotPokemon) : undefined}
                            swapMode={swapMode}
                        />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        width: '100%',
    },
    slotsRow: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 1200,
        paddingHorizontal: 8,
    },
});
