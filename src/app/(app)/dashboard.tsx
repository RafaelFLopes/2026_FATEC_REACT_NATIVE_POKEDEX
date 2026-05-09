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
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
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
        backgroundColor: '#F5F5F5',
    },

    header: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        backgroundColor: '#FFF',
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#121214',
    },

    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },

    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FFF',
    },
});
