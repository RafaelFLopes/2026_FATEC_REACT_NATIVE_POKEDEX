import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Card } from '@/components/card';
import { Pokeball } from '@/components/pokeball';
import { Button } from '@/components/button';
import { StatCard } from '@/components/stat-card';
import { ScreenHeader } from '@/components/screen-header';
import { useAuth } from '@/context/AuthContext';
import { getStats } from '@/integration/authIntegration';

export default function ProfileWeb() {
    const { user, userId, signOut } = useAuth();
    const [nivel, setNivel] = useState('');
    const [vitorias, setVitorias] = useState('');
    const [derrotas, setDerrotas] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStats() {
            if (!userId) return;
            try {
                const data = await getStats(userId);
                setNivel(data.level ?? '0');
                setVitorias(data.vitorias ?? '0');
                setDerrotas(data.derrotas ?? '0');
            } catch (e) {
                console.error('Erro ao carregar perfil:', e);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, [userId]);

    return (
        <View style={styles.container}>
            <ScreenHeader />
            <ScrollView contentContainerStyle={styles.content}>
                <Card style={styles.card}>
                    <View style={styles.avatarWrapper}>
                        <Pokeball size={80} />
                        <Text style={styles.username}>{user}</Text>
                        <Text style={styles.trainerTag}>TREINADOR</Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>ESTATÍSTICAS</Text>

                    {loading ? (
                        <ActivityIndicator size="small" color="#E53935" />
                    ) : (
                        <View style={styles.statsRow}>
                            <StatCard value={nivel} label="Nível" color="#F1C40F" />
                            <StatCard value={vitorias} label="Vitórias" color="#2ECC71" />
                            <StatCard value={derrotas} label="Derrotas" color="#E53935" />
                        </View>
                    )}

                    <View style={styles.divider} />

                    <Button title="SAIR" onPress={signOut} style={styles.btnLogout} />
                </Card>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D1F',
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    card: {
        width: '100%',
        maxWidth: 520,
    },
    avatarWrapper: {
        alignItems: 'center',
        gap: 8,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 1,
    },
    trainerTag: {
        color: '#E53935',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 3,
    },
    divider: {
        height: 1,
        backgroundColor: '#1E1E45',
    },
    sectionTitle: {
        color: '#9090B0',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 8,
    },
    btnLogout: {
        backgroundColor: '#E53935',
    },
});
