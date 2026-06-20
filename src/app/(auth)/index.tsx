import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Alert } from '@/components/alert';
import { Card } from '@/components/card';
import { Pokeball } from '@/components/pokeball';
import { SpinningPokeball } from '@/components/pokeball/spinning';
import { PokemonMascot } from '@/components/pokemon-mascot';

export default function Index() {
  const [name, setName] = useState('');
  const [senha, setSenha] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const [isLoading, setIsLoading] = useState(false);
  const { signIn, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated]);

  async function handleLogin() {
    if (!name || !senha) {
      setAlertData({ title: 'Campos obrigatórios', message: 'Preencha usuário e senha.', type: 'warning' });
      setIsAlertVisible(true);
      return;
    }
    setIsLoading(true);
    try {
      await signIn(name, senha);
    } catch (e: any) {
      if (e?.response) {
        setAlertData({
          title: 'Erro de Login',
          message: e?.response?.data?.message ?? 'Credenciais inválidas. Tente novamente.',
          type: 'error',
        });
        setIsAlertVisible(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <SpinningPokeball size={280} duration={14000} style={styles.pokeball1} />
      <SpinningPokeball size={150} duration={9000} style={styles.pokeball2} />
      <View style={styles.pokeball3}>
        <Pokeball size={70} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.eyebrow}>— MUNDO POKÉMON —</Text>
          <Text style={styles.title}>POKÉDEX</Text>
          <Text style={styles.subtitle}>Bem-vindo, Treinador!</Text>
        </View>

        <PokemonMascot />

        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Pokeball size={26} />
            <Text style={styles.cardTitle}>Fazer Login</Text>
          </View>

          <Input
            placeholder="Usuário"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
          />
          <Input
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#888"
          />

          <Button
            title={isLoading ? 'Entrando...' : '⚡  ENTRAR'}
            onPress={handleLogin}
            style={styles.loginButton}
          />

          <Button
            title="CRIAR CONTA"
            onPress={() => router.push('/register')}
            style={styles.loginButton}
          />
        </Card>
      </ScrollView>

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

  pokeball1: {
    position: 'absolute',
    top: -100,
    right: -100,
    opacity: 0.10,
  },
  pokeball2: {
    position: 'absolute',
    bottom: 80,
    left: -60,
    opacity: 0.08,
  },
  pokeball3: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    opacity: 0.18,
  },

  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    gap: 28,
  },

  headerSection: {
    alignItems: 'center',
    gap: 6,
  },
  eyebrow: {
    color: '#E53935',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 8,
    textShadowColor: '#E53935',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  subtitle: {
    fontSize: 13,
    color: '#6060A0',
    letterSpacing: 1,
  },

  card: {
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  loginButton: {
    backgroundColor: '#E53935',
    marginTop: 4,
  },
  hint: {
    fontSize: 11,
    color: '#404060',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
