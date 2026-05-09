import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Card } from '@/components/card';
import { Alert } from '@/components/alert';

export default function Index() {
    const [name, setName] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({
        title: '',
        message: '',
        type: 'success' as 'success' | 'error' | 'warning' | 'info',
    });

    const { signIn } = useAuth();

    function validateCredentials() {
        if (name === 'kleber' && senha === '123') {
            signIn(name);

            router.push({
                pathname: '/dashboard',
                params: { username: name },
            });
        } else {
            setAlertData({
                title: 'Erro de Login',
                message: 'Credenciais inválidas. Tente novamente.',
                type: 'error',
            });
            setIsAlertVisible(true);
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>Pokédex</Text>
                <Text style={styles.subtitle}>Bem-vindo, Treinador!</Text>
            </View>

            <Image
                source={{
                    uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
                }}
                style={styles.pokemonImage}
                resizeMode="contain"
            />

            <Card style={styles.card}>
                <Text style={styles.formTitle}>Fazer Login</Text>

                <Input
                    placeholder="Usuário"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#999"
                />
                <Input
                    placeholder="Senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                    placeholderTextColor="#999"
                />
                <Button title="Entrar" onPress={validateCredentials} style={{ marginTop: 16 }} />

                <Text style={styles.hint}>Usuário: kleber | Senha: 123</Text>
            </Card>

            <Alert
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                visible={isAlertVisible}
                onClose={() => setIsAlertVisible(false)}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF6B35',
    },

    content: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        gap: 24,
    },

    header: {
        alignItems: 'center',
        marginBottom: 8,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 4,
        textAlign: 'center',
    },

    pokemonImage: {
        width: 180,
        height: 180,
        alignSelf: 'center',
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 24,
        gap: 12,
    },

    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#121214',
        marginBottom: 12,
    },

    hint: {
        fontSize: 11,
        color: '#999',
        marginTop: 12,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});
