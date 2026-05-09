import { FlatList, StyleSheet } from 'react-native';
import { PokemonCard } from '@/components/pokemon-card';
import { PokemonListProps } from './types';

export default function PokemonListAndroid({ data }: PokemonListProps) {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => <PokemonCard pokemon={item} />}
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
