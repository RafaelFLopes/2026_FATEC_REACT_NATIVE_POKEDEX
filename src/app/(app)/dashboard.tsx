import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { PokemonList } from '@/components/pokemon-list';
import { Alert } from '@/components/alert';
import { getPokemons } from '@/integration/pokemonIntegration';
import { addCaptured, getTeam } from '@/integration/teamIntegration';
import { useAuth } from '@/context/AuthContext';
import { Pokemon } from '@/@types/pokemon';

export default function Dashboard() {
    const { userId } = useAuth();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [capturedIds, setCapturedIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({
        title: '',
        message: '',
        type: 'success' as 'success' | 'error' | 'warning' | 'info',
    });

    function showAlert(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') {
        setAlertData({ title, message, type });
        setIsAlertVisible(true);
    }

    useEffect(() => {
        async function loadData() {
            try {
                const [pokemonData, teamData] = await Promise.all([
                    getPokemons(151),
                    userId ? getTeam(userId) : Promise.resolve({ team: [], capture: [] }),
                ]);
                setPokemons(pokemonData);
                // backend armazena IDs numéricos ("1", "25") — normalizar para comparação
                const ids = teamData.capture.map(p => parseInt(p.index, 10).toString());
                setCapturedIds(ids);
            } catch (e) {
                console.error('Erro ao carregar pokémons:', e);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [userId]);

    async function handleCapture(pokemon: Pokemon) {
        if (!userId) return;
        const numericId = parseInt(pokemon.index, 10).toString();
        if (capturedIds.includes(numericId)) return;
        try {
            await addCaptured(userId, numericId);
            setCapturedIds(prev => [...prev, numericId]);
            showAlert('Capturado!', `${pokemon.nome.toUpperCase()} foi capturado!`, 'success');
        } catch (e) {
            showAlert('Erro', 'Não foi possível capturar o pokémon.', 'error');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('@assets/images/logo-pokemon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                {userId && (
                    <Text style={styles.capturedCount}>
                        {capturedIds.length} capturados
                    </Text>
                )}
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#E53935" />
                    <Text style={styles.loadingText}>Carregando Pokédex...</Text>
                </View>
            ) : (
                <PokemonList
                    data={pokemons}
                    capturedIds={capturedIds}
                    onCapture={userId ? handleCapture : undefined}
                />
            )}

            <Alert
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                visible={isAlertVisible}
                onClose={() => setIsAlertVisible(false)}
            />
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
        flexDirection: 'row',
        justifyContent: 'center',
    },

    logo: {
        width: 180,
        height: 60,
    },

    capturedCount: {
        position: 'absolute',
        right: 16,
        color: '#2ECC71',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
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
