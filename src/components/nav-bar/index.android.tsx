import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Svg, Path } from 'react-native-svg';
import { NavBarProps } from './types';

function PokedexIcon({ color }: { color: string }) {
    return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
            <Path
                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,6A6,6 0 0,1 18,12H14A2,2 0 0,0 12,10A2,2 0 0,0 10,12H6A6,6 0 0,1 12,6M12,14A2,2 0 0,0 14,12H18A6,6 0 0,1 12,18A6,6 0 0,1 6,12H10A2,2 0 0,0 12,14Z"
                fill={color}
            />
        </Svg>
    );
}

function TeamIcon({ color }: { color: string }) {
    return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
            <Path
                d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"
                fill={color}
            />
        </Svg>
    );
}

function ProfileIcon({ color }: { color: string }) {
    return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
            <Path
                d="M12,12C14.21,12 16,10.21 16,8S14.21,4 12,4 8,5.79 8,8 9.79,12 12,12M12,14C9.33,14 4,15.34 4,18V20H20V18C20,15.34 14.67,14 12,14Z"
                fill={color}
            />
        </Svg>
    );
}

const TAB_CONFIG: Record<string, { label: string; Icon: React.FC<{ color: string }> }> = {
    dashboard: { label: 'Pokédex', Icon: PokedexIcon },
    team:      { label: 'Time',    Icon: TeamIcon },
    profile:   { label: 'Perfil',  Icon: ProfileIcon },
};

export default function NavBarAndroid({ state, navigation }: NavBarProps) {
    const { bottom } = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingBottom: bottom }]}>
            {state.routes.map((route, index) => {
                const config = TAB_CONFIG[route.name];
                if (!config) return null;

                const isActive = state.index === index;
                const color = isActive ? '#E53935' : '#9090B0';
                const { label, Icon } = config;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isActive && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        activeOpacity={0.7}
                        style={styles.tab}
                    >
                        <Icon color={color} />
                        <Text style={[styles.label, { color }]}>{label}</Text>
                        {isActive && <View style={[styles.indicator, { backgroundColor: '#E53935' }]} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#12122A',
        borderTopWidth: 1,
        borderTopColor: '#1E1E45',
        elevation: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        gap: 4,
        position: 'relative',
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        left: '25%',
        right: '25%',
        height: 2,
        borderRadius: 1,
    },
});
