import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { PokemonList } from '@/components/pokemon-list';
import { TeamSlotsSection } from '@/components/team-slots-section';
import { Alert } from '@/components/alert';
import { getTeam, updateTeam } from '@/integration/teamIntegration';
import { useAuth } from '@/context/AuthContext';
import { Pokemon } from '@/@types/pokemon';

const MAX_TEAM = 5;

function toNumericId(index: string): string {
    return parseInt(index, 10).toString();
}

export default function Team() {
    const { userId } = useAuth();
    const [captured, setCaptured] = useState<Pokemon[]>([]);
    const [team, setTeam] = useState<Pokemon[]>([]);
    const [selectedCapture, setSelectedCapture] = useState<Pokemon | null>(null);
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

    useFocusEffect(
        useCallback(() => {
            let active = true;
            async function loadData() {
                setLoading(true);
                try {
                    const teamData = userId
                        ? await getTeam(userId)
                        : { team: [], capture: [] };
                    if (active) {
                        setTeam(teamData.team.slice(0, MAX_TEAM));
                        setCaptured(teamData.capture);
                    }
                } catch (e) {
                    console.error('Erro ao carregar time:', e);
                } finally {
                    if (active) setLoading(false);
                }
            }
            loadData();
            return () => { active = false; };
        }, [userId])
    );

    async function handleCapturedPress(pokemon: Pokemon) {
        const numericId = toNumericId(pokemon.index);
        const isInTeam = team.some(p => toNumericId(p.index) === numericId);
        if (isInTeam) return;

        if (team.length < MAX_TEAM) {
            // Slot vazio disponível — adiciona diretamente
            try {
                if (userId) await updateTeam(userId, undefined, numericId);
                setTeam(prev => [...prev, pokemon]);
                setCaptured(prev => prev.filter(p => toNumericId(p.index) !== numericId));
            } catch (e) {
                showAlert('Erro', 'Não foi possível adicionar ao time.');
            }
        } else {
            // Time cheio — seleciona para trocar
            if (selectedCapture && toNumericId(selectedCapture.index) === numericId) {
                setSelectedCapture(null);
            } else {
                setSelectedCapture(pokemon);
            }
        }
    }

    async function handleSlotSwap(slotPokemon: Pokemon) {
        if (!selectedCapture || !userId) return;
        const removeId = toNumericId(slotPokemon.index);
        const addId = toNumericId(selectedCapture.index);
        try {
            await updateTeam(userId, removeId, addId);
            setTeam(prev => {
                const without = prev.filter(p => toNumericId(p.index) !== removeId);
                return [...without, selectedCapture];
            });
            setCaptured(prev => {
                const withoutAdded = prev.filter(p => toNumericId(p.index) !== addId);
                return [...withoutAdded, slotPokemon];
            });
            setSelectedCapture(null);
            showAlert('Sucesso!', `${selectedCapture.nome.toUpperCase()} entrou no time!`, 'success');
        } catch (e) {
            showAlert('Erro', 'Não foi possível substituir o pokémon.');
        }
    }

    const teamNumericIds = team.map(p => toNumericId(p.index));
    const selectedId = selectedCapture ? toNumericId(selectedCapture.index) : null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MEU TIME</Text>
                <Text style={styles.headerSub}>{team.length}/{MAX_TEAM} POKÉMONS</Text>
            </View>

            {selectedCapture && (
                <View style={styles.swapBanner}>
                    <Text style={styles.swapBannerText} numberOfLines={1}>
                        Substituir por{' '}
                        <Text style={styles.swapBannerName}>
                            {selectedCapture.nome.toUpperCase()}
                        </Text>
                        {' '}— clique em um slot
                    </Text>
                    <TouchableOpacity onPress={() => setSelectedCapture(null)} style={styles.swapCancel}>
                        <Text style={styles.swapCancelText}>✕</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.teamSection}>
                <TeamSlotsSection
                    team={team}
                    swapMode={!!selectedCapture}
                    onSlotSwap={handleSlotSwap}
                    maxTeam={MAX_TEAM}
                />
            </View>

            <View style={styles.sectionLabel}>
                <Text style={styles.sectionLabelText}>
                    POKÉMONS CAPTURADOS ({captured.length})
                </Text>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#E53935" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ) : captured.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>⚪</Text>
                    <Text style={styles.emptyTitle}>Nenhum pokémon capturado</Text>
                    <Text style={styles.emptySubtitle}>
                        Vá até a Pokédex e capture pokémons para montar seu time!
                    </Text>
                </View>
            ) : (
                <PokemonList
                    data={captured}
                    onPressItem={handleCapturedPress}
                    selectedIds={selectedId ? [...teamNumericIds, selectedId] : teamNumericIds}
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

    swapBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#1A1A3E',
        borderBottomWidth: 1,
        borderBottomColor: '#E15610',
    },
    swapBannerText: {
        color: '#9090B0',
        fontSize: 12,
        flex: 1,
    },
    swapBannerName: {
        color: '#E15610',
        fontWeight: '900',
    },
    swapCancel: {
        paddingLeft: 12,
        paddingVertical: 4,
    },
    swapCancelText: {
        color: '#E53935',
        fontSize: 16,
        fontWeight: '900',
    },

    teamSection: {
        backgroundColor: '#12122A',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
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

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        gap: 12,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 8,
    },
    emptyTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1,
        textAlign: 'center',
    },
    emptySubtitle: {
        color: '#9090B0',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
    },
});
