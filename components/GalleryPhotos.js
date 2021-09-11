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
} from "react-native";
import { globalStyles } from "../constants/globalStyles";
import { COLORS, SIZES } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { FontAwesome } from "react-native-vector-icons";
import ImageZoom from "react-native-image-pan-zoom";
import { Dimensions } from "react-native";

const GalleryPhotos = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  useEffect(() => {
    let unmounted = false;
    axios
      .get("images")
      .then((res) => {
        // console.log(res.data);
        setImages(res.data);
        setLoadingGallery(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));

      return () => { unmounted = true };
  }, []);
  function renderBody() {
    return (
      <SafeAreaView style={{ paddingBottom: 70,flex:1 }}>
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
              <TouchableOpacity
                key={item.id}
                style={{ marginHorizontal: 2, marginBottom: 5 }}
                onPress={() =>
                  navigation.navigate("RenderImage", {
                    items: item.filename,
                  })
                }
              >
                <Image
                  // source={{ uri: `data:image/png;base64,${item.imageBase64}` }}
                  source={{ uri: `${item.filename}` }}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width / 2 - 15,
                    height: 150,
                    marginRight: 0,
                    borderWidth: 1,
                    marginBottom: 5,
                  }}
                />
              </TouchableOpacity>
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

export default GalleryPhotos;

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
});
