import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const theme = useColorScheme();
  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen
          name="new"
          options={{
            title: "New Task",
            presentation: "modal",
            headerLargeTitleEnabled: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
