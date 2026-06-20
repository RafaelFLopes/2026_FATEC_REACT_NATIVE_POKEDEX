import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { PokemonList } from '@/components/pokemon-list';
import { Alert } from '@/components/alert';
import { ScreenHeader } from '@/components/screen-header';
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
                const captureIds = teamData.capture.map(p => parseInt(p.index, 10).toString());
                const teamIds = teamData.team.map(p => parseInt(p.index, 10).toString());
                setCapturedIds([...new Set([...captureIds, ...teamIds])]);
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
            <ScreenHeader capturedCount={userId ? capturedIds.length : undefined} />

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
