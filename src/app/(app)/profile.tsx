import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Card } from '@/components/card';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { StatCard } from '@/components/stat-card';
import { useAuth } from '@/context/AuthContext';
import { getStats } from '@/integration/authIntegration';

export default function Profile() {
    const { user, userId, signOut } = useAuth();
    const [name, setName] = useState(user ?? '');
    const [nivel, setNivel] = useState('');
    const [vitorias, setVitorias] = useState('');
    const [derrotas, setDerrotas] = useState('');
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

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

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Card style={styles.card}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={require('@assets/images/image-login.png')}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                        <Text style={styles.username}>{user}</Text>
                    </View>

                    {editMode && (
                        <>
                            <Text style={styles.label}>Nome</Text>
                            <Input
                                placeholder="Seu nome"
                                value={name}
                                onChangeText={setName}
                            />
                        </>
                    )}

                    {loading ? (
                        <ActivityIndicator size="small" color="#E53935" style={{ marginVertical: 16 }} />
                    ) : (
                        <>
                            <Text style={styles.sectionTitle}>ESTATÍSTICAS</Text>
                            <View style={styles.statsRow}>
                                <StatCard value={nivel} label="Nível" color="#F1C40F" />
                                <StatCard value={vitorias} label="Vitórias" color="#2ECC71" />
                                <StatCard value={derrotas} label="Derrotas" color="#E53935" />
                            </View>
                        </>
                    )}

                    <View style={styles.actionsRow}>
                        {editMode ? (
                            <>
                                <View style={styles.btnWrapper}>
                                    <Button title="SALVAR" onPress={() => setEditMode(false)} style={styles.btnSave} />
                                </View>
                                <View style={styles.btnWrapper}>
                                    <Button title="CANCELAR" onPress={() => { setName(user ?? ''); setEditMode(false); }} style={styles.btnCancel} />
                                </View>
                            </>
                        ) : (
                            <>
                                <View style={styles.btnWrapper}>
                                    <Button title="EDITAR" onPress={() => setEditMode(true)} style={styles.btnEdit} />
                                </View>
                                <View style={styles.btnWrapper}>
                                    <Button title="SAIR" onPress={signOut} style={styles.btnLogout} />
                                </View>
                            </>
                        )}
                    </View>
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

    scroll: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },

    card: {
        width: '100%',
    },

    avatarWrapper: {
        alignItems: 'center',
        gap: 8,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#E53935',
        backgroundColor: '#FFF',
    },

    username: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
        letterSpacing: 1,
    },

    label: {
        color: '#9090B0',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
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

    actionsRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 4,
    },
    btnWrapper: {
        flex: 1,
    },

    btnEdit: {
        backgroundColor: '#1E1E45',
    },
    btnLogout: {
        backgroundColor: '#E53935',
    },
    btnSave: {
        backgroundColor: '#2ECC71',
    },
    btnCancel: {
        backgroundColor: '#1E1E45',
    },
});
