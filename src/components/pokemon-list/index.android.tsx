import { FlatList, StyleSheet } from 'react-native';
import { PokemonCard } from '@/components/pokemon-card';
import { PokemonListProps } from './types';

export default function PokemonListAndroid({ data, onPressItem, selectedIds, capturedIds, onCapture }: PokemonListProps) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.index}
            numColumns={1}
            renderItem={({ item }) => {
                const numericId = parseInt(item.index, 10).toString();
                return (
                    <PokemonCard
                        pokemon={item}
                        onPress={onPressItem ? () => onPressItem(item) : undefined}
                        selected={selectedIds?.includes(numericId)}
                        onCapture={onCapture ? () => onCapture(item) : undefined}
                        captured={capturedIds?.includes(numericId)}
                    />
                );
            }}
            contentContainerStyle={styles.listContent}
            style={styles.list}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 10,
        paddingVertical: 12,
    },
});
