import { View, Image, Text, StyleSheet } from 'react-native';
import { ScreenHeaderProps } from './types';

export default function ScreenHeader({ capturedCount }: ScreenHeaderProps) {
    return (
        <View style={styles.header}>
            <Image
                source={require('@assets/images/logo-pokemon.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            {capturedCount !== undefined && (
                <Text style={styles.badge}>{capturedCount} capturados</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 16,
        backgroundColor: '#12122A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#1E1E45',
    },
    logo: {
        width: 160,
        height: 52,
    },
    badge: {
        position: 'absolute',
        right: 16,
        color: '#2ECC71',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
    },
});
