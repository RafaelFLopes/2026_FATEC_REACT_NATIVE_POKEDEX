import { Tabs, Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";
import { NavBar } from "@/components/nav-bar";

export default function AppLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#0D0D1F' }}>
                <ActivityIndicator size="large" color="#E53935" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href="/" />;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#12122A' }} edges={['top']}>
            <Tabs
                tabBar={(props) => <NavBar {...props} />}
                screenOptions={{ headerShown: false }}
            />
        </SafeAreaView>
    );
}
