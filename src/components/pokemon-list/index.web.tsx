import { FlatList, View, StyleSheet, useWindowDimensions } from 'react-native';
import { PokemonCard } from '@/components/pokemon-card';
import { PokemonListProps } from './types';

function getColumns(width: number): number {
    if (width < 600) return 1;
    if (width < 900) return 2;
    if (width < 1200) return 3;
    return 4;
}

export default function PokemonListWeb({ data, onPressItem, selectedIds, capturedIds, onCapture }: PokemonListProps) {
    const { width } = useWindowDimensions();
    const numColumns = getColumns(width);

    return (
        <View style={styles.wrapper}>
            <FlatList
                key={numColumns}
                data={data}
                keyExtractor={(item) => item.index}
                numColumns={numColumns}
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
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
    },
    list: {
        flex: 1,
        width: '100%',
        maxWidth: 1200,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});
