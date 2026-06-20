import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Alert } from '@/components/alert';
import { Card } from '@/components/card';
import { Pokeball } from '@/components/pokeball';
import { SpinningPokeball } from '@/components/pokeball/spinning';

const BREAKPOINT = 900;

export default function IndexWeb() {
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
  const { width } = useWindowDimensions();
  const isTwoColumn = width >= BREAKPOINT;

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

  const formPanel = (
    <View style={[styles.rightPanel, !isTwoColumn && styles.rightPanelSingle]}>
      <View style={styles.headerSection}>
        <Text style={styles.eyebrow}>— MUNDO POKÉMON —</Text>
        <Text style={styles.title}>POKÉDEX</Text>
        <Text style={styles.subtitle}>Bem-vindo, Treinador!</Text>
      </View>

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
      </Card>

      {/* Link para cadastro aparece apenas na versão coluna única */}
      {!isTwoColumn && (
        <Button
          title="CRIAR CONTA"
          onPress={() => router.push('/register')}
          style={styles.registerButtonSingle}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <SpinningPokeball size={500} duration={20000} style={styles.pokeball1} />
      <SpinningPokeball size={220} duration={12000} style={styles.pokeball2} />

      {isTwoColumn ? (
        <View style={styles.columns}>

          {/* PAINEL ESQUERDO */}
          <View style={styles.leftPanel}>
            <Text style={styles.heroEyebrow}>— NOVO POR AQUI? —</Text>
            <Text style={styles.heroHeading}>Comece sua jornada</Text>
            <Text style={styles.heroDesc}>
              Registre-se como treinador e capture todos os 151 Pokémon da primeira geração.
            </Text>
            <View style={styles.imageWrap}>
              <Image
                source={require('@assets/images/login-image.png')}
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>
            <Button
              title="CRIAR CONTA"
              onPress={() => router.push('/register')}
              style={styles.heroButton}
            />
          </View>

          {/* PAINEL DIREITO */}
          {formPanel}
        </View>
      ) : (
        formPanel
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

  pokeball1: {
    position: 'absolute',
    top: -180,
    right: -180,
    opacity: 0.06,
  },
  pokeball2: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    opacity: 0.05,
  },

  columns: {
    flex: 1,
    flexDirection: 'row',
  },

  // ── PAINEL ESQUERDO ──────────────────────────────────────
  leftPanel: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#1E1E45',
    backgroundColor: '#12122A',
    padding: 28,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrap: {
    width: 500,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: 500,
    height: 500,
  },
  heroEyebrow: {
    color: '#E53935',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 3,
  },
  heroHeading: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroDesc: {
    color: '#9090B0',
    fontSize: 13,
    lineHeight: 20,
  },
  heroButton: {
    backgroundColor: '#E53935',
    marginTop: 4,
  },

  // ── PAINEL DIREITO ───────────────────────────────────────
  rightPanel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
    paddingHorizontal: 48,
    paddingVertical: 48,
  },
  rightPanelSingle: {
    flex: 1,
    paddingHorizontal: 32,
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
    maxWidth: 440,
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
    width: '100%',
    marginTop: 4,
  },
  registerButtonSingle: {
    backgroundColor: '#1E1E45',
    width: '100%',
    maxWidth: 440,
  },
});
