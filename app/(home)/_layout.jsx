import { Tabs } from "expo-router";

export default function HomeScreen() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="profile" options={{ title: "Profile" }}/>
        </Tabs>
    );
}