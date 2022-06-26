import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { Props, useContext } from "react";
import { RootStackScreenProps } from "../types";
import Colors from "../constants/Colors";
import moment from "moment";
import { useTranslation } from "react-i18next";
import TextFieldComponent from "../components/TextField";
import AppContext from "../Context/AppContext";

export default function DetailsScreen({
  navigation,
  route,
}: RootStackScreenProps<"Details">) {
  const item: any = route.params;
  const { t } = useTranslation();
  const { themeMode } = useContext(AppContext);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ position: "relative" }}>
        <Image source={{ uri: item.urlToImage }} style={styles.img_style} />
        <View style={styles.overlay}></View>
        <TextFieldComponent customStyle={styles.title_style} txt={item.title} />
      </View>
      <View style={styles.content}>
        <View>
          {/* Author */}
          <View style={styles.flex}>
            <TextFieldComponent
              customStyle={[
                styles.hint_txt,
                {
                  marginEnd: 6,
                  color:
                    themeMode === "dark" ? Colors.dark.tint : Colors.light.tint,
                },
              ]}
              txt={`${t("Author")}:`}
            />

            <TextFieldComponent
              customStyle={[
                styles.hint_txt,
                {
                  color:
                    themeMode === "dark" ? Colors.dark.tint : Colors.light.tint,
                },
              ]}
              txt={item.author}
            />
          </View>

          {/*created at */}
          <View style={styles.flex}>
            <TextFieldComponent
              customStyle={[
                styles.hint_txt,
                {
                  marginEnd: 6,
                  color:
                    themeMode === "dark" ? Colors.dark.tint : Colors.light.tint,
                },
              ]}
              txt={`${t("Published at")}:`}
            />

            <TextFieldComponent
              customStyle={[
                styles.hint_txt,
                {
                  color:
                    themeMode === "dark" ? Colors.dark.tint : Colors.light.tint,
                },
              ]}
              txt={moment(item.publishedAt).format("YYYY-MM-DD")}
            />
          </View>
        </View>
        <TextFieldComponent
          customStyle={styles.description_style}
          txt={item.content}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img_style: {
    width: "100%",
    height: 250,
  },
  overlay: {
    position: "absolute",
    top: 0,
    start: 0,
    backgroundColor: "#54545458",
    opacity: 1,
    width: "100%",
    height: 250,
  },
  title_style: {
    position: "absolute",
    bottom: 10,
    start: 20,
    color: "#fff",
    fontFamily: "Medium",
    fontSize: 14,
    opacity: 1,
    width: "90%",
    backgroundColor: "transparent",
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  hint_txt: {
    fontSize: 10,
    fontFamily: "Light",
  },
  description_style: {
    fontFamily: "Regular",
    marginTop: 16,
    fontSize: 15,
  },
});
