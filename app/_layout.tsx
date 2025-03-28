import { UserWrapper } from "@/context/userContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "./global.css";

export default function RootLayout() {
  return (
    <UserWrapper>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <StatusBar backgroundColor="black" />
        <Toast />
      </SafeAreaProvider>
    </UserWrapper>
  );
}
