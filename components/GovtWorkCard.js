import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { WebView } from "react-native-webview";

const GovtWorkCard = ({ title, desc, id, image, video, timestamp }) => {
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
  let data = timestamp.split("T")[0];
  let dateFormat = data.split("-");
  // 2021-0-21
  let yy = dateFormat[0];
  let dd = dateFormat[2];
  let mm = dateFormat[1];
  const navigation = useNavigation();
  const splitLink = (link) => {
    // console.log(link);
    let yt_link = link.split("=")[1];
    return yt_link;
  };
  return (
    <View style={styles.Card}>
      <View style={styles.upperBody}>
        <Image
          source={{ uri: `${image[0].filename}` }}
          resizeMode="contain"
          style={styles.upperBodyImage}
        />
      </View>
      <View style={styles.lowerBody}>
        <Text style={styles.lowerBodyTitle}>{title}</Text>
        {/* <Text style={{color:COLORS.darkgray,fontSize:16}}>{`${dd}/${mm}/${yy}`}</Text> */}
        <Text style={styles.lowerBodyDetail}>{desc}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GovtWorkDetailScreen", {
              title,
              desc,
              image,
              video,
              dateFormat,
            })
          }
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.padding,
    marginHorizontal: SIZES.padding * 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    // elevation: 1,
    // use to lift component.. it create shadow on touchable icons
    borderRadius: 10,
    borderColor: COLORS.darkgray,
  },
  upperBody: {
    width: "100%",
    height: 200,
    padding: 5,
    // borderWidth: 1,
  },
  upperBodyImage: {
    height: 200,
    width: "100%",
    borderRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  lowerBody: {
    // borderWidth: 1,
    // width: "100%",
    padding: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerBodyTitle: {
    fontSize: 22,
    marginVertical: 5,
    fontWeight: "bold",
  },
  lowerBodyDetail: {
    // marginVertical: 2,
    textAlign: "center",
    fontSize: 18,
    // borderWidth:1,
    paddingBottom: 10,
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

export default GovtWorkCard;
