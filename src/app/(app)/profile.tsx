import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/card';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
    const { user, signOut } = useAuth();
    const [name, setName] = useState(user ?? '');
    const [partidas] = useState('10');
    const [vitorias] = useState('6');
    const [derrotas] = useState('4');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('@assets/images/logo-pokemon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.content}>
                <Card style={styles.card}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={require('@assets/images/image-login.png')}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </View>

                    <Text style={styles.label}>Nome</Text>
                    <Input
                        placeholder="Seu nome"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Partidas</Text>
                    <Input
                        placeholder="0"
                        value={partidas}
                        editable={false}
                    />

                    <Text style={styles.label}>Vitórias</Text>
                    <Input
                        placeholder="0"
                        value={vitorias}
                        editable={false}
                    />

                    <Text style={styles.label}>Derrotas</Text>
                    <Input
                        placeholder="0"
                        value={derrotas}
                        editable={false}
                    />
                </Card>
            </View>

            <View style={styles.footer}>
                <Button title="Sair" onPress={signOut} style={{ backgroundColor: '#E53935' }} />
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
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

    content: {
        flex: 1,
        padding: 16,
    },

    card: {
        width: '100%',
        alignSelf: 'center',
    },

    avatarWrapper: {
        alignItems: 'center',
        marginBottom: 8,
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#1E1E45',
        backgroundColor: '#FFF',
    },

    label: {
        color: '#9090B0',
        fontSize: 12,
        marginTop: 8,
        marginBottom: 6,
    },

    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#12122A',
        borderTopWidth: 1,
        borderTopColor: '#1E1E45',
    },
});
