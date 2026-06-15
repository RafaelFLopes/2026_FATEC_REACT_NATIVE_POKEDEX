import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PokemonList } from '@/components/pokemon-list';
import { TeamSlot } from '@/components/team-slot';
import { Alert } from '@/components/alert';
import { getPokemons } from '@/integration/pokemonIntegration';
import { getTeam, updateTeam, addCaptured } from '@/integration/teamIntegration';
import { useAuth } from '@/context/AuthContext';
import { Pokemon } from '@/@types/pokemon';

const MAX_TEAM = 5;

function toNumericId(index: string): string {
    return parseInt(index, 10).toString();
}

export default function Team() {
    const { userId } = useAuth();
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [team, setTeam] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({
        title: '',
        message: '',
        type: 'error' as 'success' | 'error' | 'warning' | 'info',
    });

    function showAlert(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') {
        setAlertData({ title, message, type });
        setIsAlertVisible(true);
    }

    useEffect(() => {
        async function loadData() {
            try {
                const [pokemonData, teamData] = await Promise.all([
                    getPokemons(25),
                    userId ? getTeam(userId) : Promise.resolve({ team: [], capture: [] }),
                ]);
                setPokemons(pokemonData);
                setTeam(teamData.team.slice(0, MAX_TEAM));
            } catch (e) {
                console.error('Erro ao carregar dados:', e);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [userId]);

    async function togglePokemon(pokemon: Pokemon) {
        const isSelected = team.some(p => p.index === pokemon.index);

        if (isSelected) {
            try {
                if (userId) await updateTeam(userId, toNumericId(pokemon.index));
                setTeam(prev => prev.filter(p => p.index !== pokemon.index));
            } catch (e) {
                showAlert('Erro', 'Não foi possível remover o pokémon do time.');
            }
        } else if (team.length < MAX_TEAM) {
            try {
                if (userId) {
                    await addCaptured(userId, toNumericId(pokemon.index));
                    await updateTeam(userId, undefined, toNumericId(pokemon.index));
                }
                setTeam(prev => [...prev, pokemon]);
            } catch (e) {
                showAlert('Erro', 'Não foi possível adicionar o pokémon ao time.');
            }
        }
    }

    async function removePokemon(pokemon: Pokemon) {
        try {
            if (userId) await updateTeam(userId, toNumericId(pokemon.index));
            setTeam(prev => prev.filter(p => p.index !== pokemon.index));
        } catch (e) {
            showAlert('Erro', 'Não foi possível remover o pokémon do time.');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MEU TIME</Text>
                <Text style={styles.headerSub}>{team.length}/{MAX_TEAM} POKÉMONS</Text>
            </View>

            <View style={styles.teamSection}>
                <View style={styles.slotsRow}>
                    {Array.from({ length: MAX_TEAM }).map((_, i) => (
                        <TeamSlot
                            key={team[i]?.index ?? `empty-${i}`}
                            pokemon={team[i]}
                            onRemove={() => team[i] && removePokemon(team[i])}
                        />
                    ))}
                </View>
            </View>

            <View style={styles.sectionLabel}>
                <Text style={styles.sectionLabelText}>ESCOLHA SEUS POKÉMONS</Text>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#E53935" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ) : (
                <PokemonList
                    data={pokemons}
                    onPressItem={togglePokemon}
                    selectedIds={team.map(p => p.index)}
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
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 2,
    },
    headerSub: {
        color: '#9090B0',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
    },

    teamSection: {
        backgroundColor: '#12122A',
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
    },
    slotsRow: {
        flexDirection: 'row',
        gap: 8,
    },

    sectionLabel: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
    },
    sectionLabelText: {
        color: '#9090B0',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
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
