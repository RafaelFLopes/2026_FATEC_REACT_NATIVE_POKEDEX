import { FlatList, StyleSheet } from 'react-native';
import { PokemonCard } from '@/components/pokemon-card';
import { PokemonListProps } from './types';

export default function PokemonListIOS({ data, onPressItem, selectedIds }: PokemonListProps) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.index}
            numColumns={1}
            renderItem={({ item }) => (
                <PokemonCard
                    pokemon={item}
                    onPress={onPressItem ? () => onPressItem(item) : undefined}
                    selected={selectedIds?.includes(item.index)}
                />
            )}
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
