import { useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, I18nManager, Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as Updates from "expo-updates";
import I18n from "i18next";
import AppContext from "../Context/AppContext";
import TextFieldComponent from "../components/TextField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function SettingScreen() {
  const [selected, setSelected] = useState(I18n.language);
  const [selectMode, setSelectMode] = useState("light");
  const { themeMode, setThemeMode } = useContext(AppContext);
  const changeLang = async (lang: any) => {
    await AsyncStorage.setItem("AppLang", lang);
    setSelected(lang);
    I18n.changeLanguage(lang);
    if (lang === "ar") {
      if (!I18nManager.isRTL) await I18nManager.allowRTL(true);
      await I18nManager.forceRTL(true);
    } else if (lang === "en") {
      await I18nManager.forceRTL(false);
    }
    Updates.reloadAsync();
  };

  const changeMode = (mode: any) => {
    setSelectMode(mode);
    setThemeMode(mode);
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log(" I18nManager: ", I18nManager.isRTL);
  //     console.log(" I18n.dir(): ", I18n.dir());
  //     if (I18n.language === "ar") {
  //       I18nManager.forceRTL(true);
  //     }
  //   }, [I18n.language])
  // );
  return (
      <View
        style={{
          marginTop: 40,
          paddingHorizontal: 20,
          backgroundColor: "transparent",
          width: "100%",
        }}
      >
          <TextFieldComponent
          customStyle={styles.head}
          txt={I18n.t("Languages")}
        />
      
        <View style={{ marginTop: 14, backgroundColor: "transparent" }}>
          <Pressable style={styles.flexView} onPress={() => changeLang("en")}>
            <TextFieldComponent
              customStyle={styles.txt1}
              txt={I18n.t("English")}
            />

            {selected === "en" && (
              <Ionicons
                name="ios-checkmark-outline"
                size={24}
                color={`${
                  themeMode === "dark" ? Colors.dark.tint : Colors.light.tint
                }`}
              />
            )}
          </Pressable>

          <Text style={styles.hrLine}></Text>

          <Pressable style={styles.flexView} onPress={() => changeLang("ar")}>
            <TextFieldComponent
              customStyle={styles.txt1}
              txt={I18n.t("Arabic")}
            />

            {selected === "ar" && (
              <Ionicons
                name="ios-checkmark-outline"
                size={24}
                color={`${
                  themeMode === "dark" ? Colors.dark.tint : Colors.light.tint
                }`}
              />
            )}
          </Pressable>
        </View>

        <View style={{ backgroundColor: "transparent", marginTop: 20 }}>
          <TextFieldComponent
            customStyle={styles.head}
            txt={I18n.t("Themes")}
          />
          <View style={{ backgroundColor: "transparent" }}>
            <Pressable
              style={styles.flexView}
              onPress={() => changeMode("light")}
            >
              <TextFieldComponent
                customStyle={styles.txt1}
                txt={I18n.t("Light")}
              />

              {selectMode === "light" && (
                <Ionicons
                  name="ios-checkmark-outline"
                  size={24}
                  color={`${
                    themeMode === "dark" ? Colors.dark.tint : Colors.light.tint
                  }`}
                />
              )}
            </Pressable>

            <Text style={styles.hrLine}></Text>

            <Pressable
              style={styles.flexView}
              onPress={() => changeMode("dark")}
            >
              <TextFieldComponent
                customStyle={styles.txt1}
                txt={I18n.t("Dark")}
              />

              {selectMode === "dark" && (
                <Ionicons
                  name="ios-checkmark-outline"
                  size={24}
                  color={`${
                    themeMode === "dark" ? Colors.dark.tint : Colors.light.tint
                  }`}
                />
              )}
            </Pressable>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  head: {
    fontFamily: "Bold",
    fontSize: 16,
  },
  flexView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    direction: I18n.language === "ar" ? "rtl" : "ltr",
  },
  txt1: {
    fontSize: 14,
    fontFamily: "Medium",
    marginVertical: 10,
  },
  txt2: {
    fontSize: 10,
    fontFamily: "Regular",
    marginBottom: 11,
  },
  hrLine: {
    width: Dimensions.get("screen").width - 50,
    height: 1,
    backgroundColor: "#F2F3F4",
  },
});
