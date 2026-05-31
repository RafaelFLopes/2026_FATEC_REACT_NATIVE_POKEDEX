import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { PokemonList } from '@/components/pokemon-list';
import { getPokemons } from '@/integration/pokemonIntegration';
import { Pokemon } from '@/@types/pokemon';

export default function Dashboard() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getPokemons(151);
                setPokemons(data);
            } catch (e) {
                console.error('Erro ao carregar pokémons:', e);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('@assets/images/logo-pokemon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#E53935" />
                    <Text style={styles.loadingText}>Carregando Pokédex...</Text>
                </View>
            ) : (
                <PokemonList data={pokemons} />
            )}
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
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
    },

    logo: {
        width: 180,
        height: 60,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },

    loadingText: {
        color: '#9090B0',
        fontSize: 14,
        letterSpacing: 1,
    },
});
