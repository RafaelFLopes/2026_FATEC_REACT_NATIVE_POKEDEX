import { AuthProvider } from "@/context/AuthContext";
import { ScreenLayout } from "@/components/screen-layout";
import { Slot } from "expo-router";

export default function Root() {
    return (
        <AuthProvider>
            <ScreenLayout>
                <Slot />
            </ScreenLayout>
        </AuthProvider>
    );
}
