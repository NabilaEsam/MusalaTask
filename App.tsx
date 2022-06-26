import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { I18nManager } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import "./i18n/index";
import AppContext from "./Context/AppContext";
// import { AppearanceProvider } from "react-native-appearance";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<any>(
    colorScheme === "dark" ? "dark" : "light"
  );
  console.log("colorScheme: ", colorScheme);
  const isDarkMode = colorScheme === "dark";
  console.log("isDarkMode: ", isDarkMode);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider
        value={{
          themeMode,
          setThemeMode,
        }}
      >
        <SafeAreaProvider>
          <Navigation colorScheme={themeMode} />
          <StatusBar />
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}
