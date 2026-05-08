import { useState, useRef, useEffect } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Alert } from '@/components/alert';

function Pokeball({ size }: { size: number }) {
  const half = size / 2;
  const lineH = Math.max(3, size * 0.055);
  const btnR = size * 0.15;
  const borderW = Math.max(2, size * 0.045);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: half,
        overflow: 'hidden',
        borderWidth: borderW,
        borderColor: '#0D0D1F',
      }}
    >
      <View style={{ width: size, height: half, backgroundColor: '#E53935' }} />
      <View style={{ width: size, height: half, backgroundColor: '#ECEFF1' }} />
      <View
        style={{
          position: 'absolute',
          top: half - lineH / 2,
          left: 0,
          right: 0,
          height: lineH,
          backgroundColor: '#0D0D1F',
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: half - btnR,
          left: half - btnR,
          width: btnR * 2,
          height: btnR * 2,
          borderRadius: btnR,
          backgroundColor: '#ECEFF1',
          borderWidth: borderW,
          borderColor: '#0D0D1F',
        }}
      />
    </View>
  );
}

function SpinningPokeball({
  size,
  duration,
  style,
}: {
  size: number;
  duration: number;
  style?: object;
}) {
  const rot = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rot, { toValue: 1, duration, useNativeDriver: true })
    ).start();
  }, []);

  const rotate = rot.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[{ transform: [{ rotate }] }, style]}>
      <Pokeball size={size} />
    </Animated.View>
  );
}

export default function Index() {
  const [name, setName] = useState('');
  const [senha, setSenha] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const { signIn } = useAuth();

  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1600, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  function validateCredentials() {
    if (name === 'kleber' && senha === '123') {
      signIn(name);
      router.push({ pathname: '/dashboard', params: { username: name } });
    } else {
      setAlertData({
        title: 'Erro de Login',
        message: 'Credenciais inválidas. Tente novamente.',
        type: 'error',
      });
      setIsAlertVisible(true);
    }
  }

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.7],
  });
  const glowScale = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.15],
  });

  return (
    <View style={styles.container}>
      {/* Pokebolas decorativas de fundo */}
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
        {/* Título */}
        <View style={styles.headerSection}>
          <Text style={styles.eyebrow}>— MUNDO POKÉMON —</Text>
          <Text style={styles.title}>POKÉDEX</Text>
          <Text style={styles.subtitle}>Bem-vindo, Treinador!</Text>
        </View>

        {/* Pokémon com brilho animado */}
        <View style={styles.pokemonWrapper}>
          <Animated.View
            style={[
              styles.glowCircle,
              { opacity: glowOpacity, transform: [{ scale: glowScale }] },
            ]}
          />
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
            }}
            style={styles.pokemonImage}
            resizeMode="contain"
          />
        </View>

        {/* Card de login */}
        <View style={styles.card}>
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
            title="⚡  ENTRAR"
            onPress={validateCredentials}
            style={styles.loginButton}
          />

          <Text style={styles.hint}>Usuário: kleber  |  Senha: 123</Text>
        </View>
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

  // Pokebolas de fundo
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

  // Cabeçalho
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

  // Pokémon
  pokemonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  glowCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#F9A825',
  },
  pokemonImage: {
    width: 170,
    height: 170,
    zIndex: 1,
  },

  // Card do formulário
  card: {
    width: '100%',
    backgroundColor: '#12122A',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1E1E45',
    gap: 14,
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
