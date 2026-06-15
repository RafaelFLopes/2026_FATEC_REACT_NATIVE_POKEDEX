import { View, Text, StyleSheet } from 'react-native';

interface StatCardProps {
    value: string;
    label: string;
    color: string;
}

export function StatCard({ value, label, color }: StatCardProps) {
    return (
        <View style={[styles.container, { borderColor: color }]}>
            <Text style={[styles.value, { color }]}>{value || '0'}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D1F',
        borderRadius: 12,
        borderWidth: 1,
        paddingVertical: 14,
        paddingHorizontal: 8,
        alignItems: 'center',
        gap: 4,
    },
    value: {
        fontSize: 26,
        fontWeight: '900',
        letterSpacing: 1,
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: '#9090B0',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
});
