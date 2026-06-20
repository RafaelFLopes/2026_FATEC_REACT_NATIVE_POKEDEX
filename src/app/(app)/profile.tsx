import { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Button } from '@/components/button';
import { SpinningPokeball } from '@/components/pokeball/spinning';
import { useAuth } from '@/context/AuthContext';
import { getStats } from '@/integration/authIntegration';

function StatRow({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <View style={styles.statRow}>
            <View style={[styles.statAccent, { backgroundColor: color }]} />
            <View style={styles.statInfo}>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
            <Text style={[styles.statValue, { color }]}>{value || '0'}</Text>
        </View>
    );
}

export default function Profile() {
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
            <View style={styles.header}>
                <Image
                    source={require('@assets/images/logo-pokemon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <SpinningPokeball
                        size={200}
                        duration={12000}
                        style={styles.heroDecoration}
                    />
                    <View style={styles.avatar}>
                        <Text style={styles.avatarLetter}>
                            {(user ?? '?')[0].toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.username}>{user}</Text>
                    <Text style={styles.trainerTag}>— TREINADOR —</Text>
                </View>

                <View style={styles.sectionLabel}>
                    <Text style={styles.sectionLabelText}>ESTATÍSTICAS</Text>
                </View>

                {loading ? (
                    <View style={styles.loadingArea}>
                        <ActivityIndicator size="large" color="#E53935" />
                    </View>
                ) : (
                    <>
                        <StatRow label="NÍVEL" value={nivel} color="#F1C40F" />
                        <StatRow label="VITÓRIAS" value={vitorias} color="#2ECC71" />
                        <StatRow label="DERROTAS" value={derrotas} color="#E53935" />
                    </>
                )}

                <View style={styles.logoutWrapper}>
                    <Button title="SAIR" onPress={signOut} style={styles.btnLogout} />
                </View>
            </ScrollView>
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
        width: 160,
        height: 48,
    },
    hero: {
        backgroundColor: '#12122A',
        alignItems: 'center',
        paddingVertical: 32,
        overflow: 'hidden',
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
    },
    heroDecoration: {
        position: 'absolute',
        right: -60,
        top: -30,
        opacity: 0.05,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#1E1E45',
        borderWidth: 3,
        borderColor: '#E53935',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    avatarLetter: {
        fontSize: 38,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    username: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 1,
        marginBottom: 6,
    },
    trainerTag: {
        color: '#E53935',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 3,
    },
    sectionLabel: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
    },
    sectionLabelText: {
        color: '#9090B0',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
    },
    loadingArea: {
        paddingVertical: 40,
        alignItems: 'center',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#12122A',
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
    },
    statAccent: {
        width: 4,
        alignSelf: 'stretch',
        borderRadius: 2,
    },
    statInfo: {
        flex: 1,
        paddingLeft: 14,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '800',
        color: '#9090B0',
        letterSpacing: 2,
    },
    statValue: {
        fontSize: 28,
        fontWeight: '900',
    },
    logoutWrapper: {
        marginTop: 24,
        marginHorizontal: 16,
        marginBottom: 32,
    },
    btnLogout: {
        backgroundColor: '#E53935',
    },
});
