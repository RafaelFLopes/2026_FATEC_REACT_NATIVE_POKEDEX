import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Alert } from '@/components/alert';
import { Card } from '@/components/card';
import { Pokeball } from '@/components/pokeball';
import { SpinningPokeball } from '@/components/pokeball/spinning';
import { PokemonMascot } from '@/components/pokemon-mascot';

export default function RegisterWeb() {
  const [name, setName] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: '',
    message: '',
    type: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const { signUp } = useAuth();

  function showAlert(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') {
    setAlertData({ title, message, type });
    setIsAlertVisible(true);
  }

  async function handleRegister() {
    if (!name || !senha || !confirmarSenha) {
      showAlert('Campos obrigatórios', 'Preencha todos os campos.', 'warning');
      return;
    }
    if (senha !== confirmarSenha) {
      showAlert('Senhas diferentes', 'As senhas não coincidem.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(name, senha);
      showAlert('Conta criada!', 'Cadastro realizado com sucesso. Faça login para continuar.', 'success');
      setTimeout(() => router.back(), 1800);
    } catch (e: any) {
      showAlert('Erro no cadastro', e?.response?.data?.message ?? 'Não foi possível criar a conta.', 'error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <SpinningPokeball size={400} duration={18000} style={styles.pokeball1} />
      <SpinningPokeball size={200} duration={11000} style={styles.pokeball2} />

      <View style={styles.center}>
        <View style={styles.headerSection}>
          <Text style={styles.eyebrow}>— MUNDO POKÉMON —</Text>
          <Text style={styles.title}>POKÉDEX</Text>
          <Text style={styles.subtitle}>Crie sua conta, Treinador!</Text>
        </View>

        <PokemonMascot />

        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Pokeball size={26} />
            <Text style={styles.cardTitle}>Criar Conta</Text>
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
          <Input
            placeholder="Confirmar Senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholderTextColor="#888"
          />

          <Button
            title={isLoading ? 'Cadastrando...' : '⚡  CADASTRAR'}
            onPress={handleRegister}
            style={styles.registerButton}
          />

        </Card>

        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Voltar para login</Text>
        </TouchableOpacity>
      </View>

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
    top: -150,
    right: -150,
    opacity: 0.07,
  },
  pokeball2: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    opacity: 0.06,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 48,
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
    width: 480,
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

  registerButton: {
    backgroundColor: '#E53935',
    width: '100%',
    marginTop: 4,
  },
  backLink: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  backLinkText: {
    color: '#9090B0',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
