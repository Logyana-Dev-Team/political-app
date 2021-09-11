import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../constants/theme";
import axios from "axios";

const NewsPhotos = ({ navigation }) => {
  const [LangContext, setLangContext] = useState({
    theme: true,
    fontSize: 15,
  });

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await AsyncStorage.getItem("lang");
      if (response !== null && response === "mar") {
        setLangContext({ ...LangContext, theme: true });
      } else if (response !== null && response === "eng") {
        setLangContext({ ...LangContext, theme: false });
      }
      // ...
    }
    fetchData();
  }, []);
  const [images, setImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  useEffect(() => {
    axios
      .get("news")
      .then((res) => {
        // console.log(res.data);
        setImages(res.data);
        setLoadingGallery(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  function renderBody() {
    return (
      <SafeAreaView style={{ paddingBottom: 70, flex: 1 }}>
        {loadingGallery ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          <FlatList
            columnWrapperStyle={{
              justifyContent: "space-between",
              // paddingHorizontal: 10,
              // borderWidth:1
            }}
            contentContainerStyle={{ paddingTop: 5 }}
            data={images}
            renderItem={({ item }) => (
              <View
                style={{
                  marginHorizontal: 0,
                  marginBottom: 8,
                  borderRadius: 10,
                  borderColor: COLORS.darkgray,
                  borderWidth: 1,
                }}
              >
                <TouchableOpacity
                  key={item.id}
                  style={{ marginHorizontal: 0.5 }}
                  onPress={() =>
                    navigation.navigate("RenderImage", {
                      items: item.filename,
                      screen: "newsScreen",
                    })
                  }
                >
                  <Image
                    source={{ uri: `${item.filename}` }}
                    resizeMode="cover"
                    style={{
                      width: SIZES.width / 2 - 15,
                      height: 150,
                      marginRight: 0,
                      borderWidth: 1,
                      marginTop: 5,
                      marginBottom: 0,
                    }}
                  />
                </TouchableOpacity>
                {item.newslink === undefined ? null : (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(item.newslink)}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 15,
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      locations={[0.0, 0.5, 0.99]}
                      colors={["#741DE3", "#9D1DE3", "#C81DE3"]}
                      style={styles.lowerBodyButton}
                    >
                      <Text style={styles.lowerBodyButtonText}>
                        {LangContext.theme ? "अधिक माहीती" : "More Info"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            )}
            keyExtractor={(item) => item._id}
            numColumns={2}
          />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 10 }}>
      {/* {Header()} */}
      {renderBody()}
      {/* <Text>Gallery screen h</Text> */}
    </SafeAreaView>
  );
};

export default NewsPhotos;

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    // marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  headerMiddleBody: {
    flexDirection: "row",
    flex: 1,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.black,
    fontWeight: "bold",
    fontSize: SIZES.h2,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 5,
    letterSpacing: 2,
    marginLeft: 8,
    // fontFamily: 'ARMT'
  },
  lowerBodyButton: {
    width: 100,
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerBodyButtonText: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: 5,
  },
});
