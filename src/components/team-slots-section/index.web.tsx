import { View, StyleSheet } from 'react-native';
import { TeamSlot } from '@/components/team-slot';
import { TeamSlotsSectionProps } from './types';

export default function TeamSlotsSectionWeb({ team, swapMode, onSlotSwap, maxTeam }: TeamSlotsSectionProps) {
    return (
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
    );
}

const styles = StyleSheet.create({
    slotsRow: {
        flexDirection: 'row',
        gap: 8,
    },
});
