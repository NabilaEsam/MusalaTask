import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import Colors from "../constants/Colors";

export default function TextFieldComponent(props: any) {
  const { themeMode, setThemeMode } = useContext(AppContext);

  const defaultStyle = {
    color: themeMode === "dark" ? Colors.dark.text : Colors.light.text,
    backgroundColor:
      themeMode === "dark" ? Colors.dark.background : Colors.light.background,
  };
  return <Text style={[defaultStyle, props.customStyle]}>{props.txt}</Text>;
}

const styles = StyleSheet.create({});
