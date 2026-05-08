import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from '@/components/button';
import { PokemonCard } from '@/components/pokemon-card';
import { POKEMONS } from '@/constants/pokemon';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
    const { user, signOut } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Pokédex</Text>
                <Text style={styles.subtitle}>Bem-vindo, {user}!</Text>
            </View>

            <FlatList
                data={POKEMONS}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => <PokemonCard pokemon={item} index={index} />}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                scrollEnabled={true}
            />

            <View style={styles.footer}>
                <Button title="Sair" onPress={signOut} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D1F',
    },

    header: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        backgroundColor: '#12122A',
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E3F',
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    subtitle: {
        fontSize: 14,
        color: '#9090C0',
        marginTop: 4,
    },

    row: {
        paddingHorizontal: 6,
    },

    listContent: {
        paddingVertical: 10,
        paddingBottom: 20,
    },

    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#12122A',
        borderTopWidth: 1,
        borderTopColor: '#1E1E3F',
    },
});
