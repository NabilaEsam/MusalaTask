import { useCallback, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import { NewsService } from "../APIs/NewsService";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import i18n from "i18next";
import { useFocusEffect } from "@react-navigation/native";
import TextFieldComponent from "../components/TextField";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const [news, setNews] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getAllNews = () => {
    console.log("i18n.language in news: ", i18n.language);
    let lang = i18n.language;
    setRefreshing(true);
    NewsService.getNews(lang)
      .then((res: any) => {
        console.log("res.articles: ", res.totalResults);
        setNews(res.articles);
      })
      .catch((err) => {
        console.log("error of get news: ", err);
      })
      .finally(() => setRefreshing(false));
  };

  useFocusEffect(
    useCallback(() => {
      getAllNews();
    }, [i18n.language])
  );
  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={news}
        refreshing={refreshing}
        onRefresh={getAllNews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              style={styles.card}
              onPress={() => navigation.push("Details", item)}
            >
              <Image
                source={{ uri: item.urlToImage }}
                style={styles.img_style}
              />
              <TextFieldComponent
                customStyle={styles.txt_card}
                txt={item.title}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    backgroundColor:'transparent',
    marginVertical:20
  },
  card: {
    marginBottom: 20,
  },
  img_style: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  txt_card: {
    fontFamily: "Medium",
    marginTop: 10,
    fontSize: 14,
  },
});
