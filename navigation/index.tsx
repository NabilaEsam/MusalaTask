/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Feather, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, I18nManager, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
  RootStackParamList,
  RootStackScreenProps,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import SettingScreen from "../screens/Setting";
import I18n from "i18next";
import AppContext from "../Context/AppContext";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const navTheme = DefaultTheme;
  navTheme.colors.background = Colors.light.background;

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : navTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false, headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ navigation }: RootStackScreenProps<"Details">) => ({
          title: I18n.t("News Detail"),
          headerTitleAlign: "center",
        })}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { themeMode } = React.useContext(AppContext);
  const activColor =
    themeMode === "dark"
      ? Colors.dark.tabIconSelected
      : Colors.light.tabIconSelected;
  const unActivColor =
    themeMode === "dark"
      ? Colors.dark.tabIconDefault
      : Colors.light.tabIconDefault;

  React.useEffect(() => {
    if (I18n.language === "en") {
      I18nManager.forceRTL(false);
    } else if (I18n.language === "ar") {
      I18nManager.forceRTL(true);
    }
  }, [I18n.language]);
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor:
          themeMode === "dark"
            ? Colors.dark.tabIconSelected
            : Colors.light.tabIconSelected,

        tabBarStyle: { paddingBottom: 10, height: 60},
        tabBarLabelStyle: {
          fontSize: 10,
          marginTop: -5,
          fontFamily: "Regular",
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: I18n.t("Home"),
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? activColor : unActivColor}
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: `${I18n.t("Setting")}`,
          headerTitleAlign: "center",
          tabBarIcon: ({ focused }) => (
            <Feather
              name="settings"
              size={24}
              color={focused ? activColor : unActivColor}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
