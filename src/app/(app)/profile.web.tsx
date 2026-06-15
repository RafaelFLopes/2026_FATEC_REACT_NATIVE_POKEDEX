import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Card } from '@/components/card';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { StatCard } from '@/components/stat-card';
import { useAuth } from '@/context/AuthContext';
import { getStats } from '@/integration/authIntegration';

export default function ProfileWeb() {
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
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Card style={styles.card}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={require('@assets/images/image-login.png')}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                    <Text style={styles.username}>{user}</Text>
                    <Text style={styles.userTag}>TREINADOR</Text>
                </View>

                <View style={styles.divider} />

                <Text style={styles.label}>Nome de Usuário</Text>
                <View style={editMode ? undefined : styles.inputDisabled}>
                    <Input
                        placeholder="Seu nome"
                        value={name}
                        onChangeText={setName}
                        editable={editMode}
                    />
                </View>

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

                <View style={styles.actionsRow}>
                    {editMode ? (
                        <>
                            <View style={styles.btnWrapper}>
                                <Button title="SALVAR" onPress={() => setEditMode(false)} style={styles.btnSave} />
                            </View>
                            <View style={styles.btnWrapper}>
                                <Button
                                    title="CANCELAR"
                                    onPress={() => { setName(user ?? ''); setEditMode(false); }}
                                    style={styles.btnCancel}
                                />
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.btnWrapper}>
                                <Button title="EDITAR PERFIL" onPress={() => setEditMode(true)} style={styles.btnEdit} />
                            </View>
                            <View style={styles.btnWrapper}>
                                <Button title="SAIR" onPress={signOut} style={styles.btnLogout} />
                            </View>
                        </>
                    )}
                </View>
            </Card>
        </ScrollView>
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
        gap: 6,
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: '#E53935',
        backgroundColor: '#FFF',
    },

    username: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 1,
    },

    userTag: {
        color: '#E53935',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 3,
    },

    divider: {
        height: 1,
        backgroundColor: '#1E1E45',
    },

    label: {
        color: '#9090B0',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: -6,
    },

    inputDisabled: {
        opacity: 0.45,
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
