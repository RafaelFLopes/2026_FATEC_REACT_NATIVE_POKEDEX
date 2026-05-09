import { View, Image, StyleSheet } from 'react-native';
import { Button } from '@/components/button';
import { PokemonList } from '@/components/pokemon-list';
import { POKEMONS } from '@/constants/pokemon';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
    const { user, signOut } = useAuth();

    return (
        <View style={styles.container}>
            <View style={styles.header } >
                <Image
                    source={require('@assets/images/logo-pokemon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <PokemonList data={POKEMONS} />

            <View style={styles.footer}>
                <Button title="Sair" onPress={signOut} style={{ backgroundColor: '#E53935' }} />
            </View>
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
        width: 180,
        height: 60,
    },

    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#12122A',
        borderTopWidth: 1,
        borderTopColor: '#1E1E45',
    },
});
