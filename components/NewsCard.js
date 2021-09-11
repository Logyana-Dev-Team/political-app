import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SIZES } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const NewsCard = ({ id, title, desc, link, timestamp }) => {
  const navigation = useNavigation();
  // const len = desc.length;
  let data = timestamp.split("T")[0];
  let dateFormat = data.split("-");
  // 2021-0-21
  let yy = dateFormat[0];
  let dd = dateFormat[2];
  let mm = dateFormat[1];
  let maxLength = 120;
  let shortTitle = desc.substr(0, maxLength);
  // console.log(shortTitle);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("InformationDetailScreen", {
          title,
          desc,
          link,
          timestamp,
        })
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0, 0.5, 0.99]}
        colors={["#EB361E", "#F59815", "#EEE50E"]}
        style={styles.CarouselBody}
      >
        <View style={{ width: "100%" }}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={styles.CarouselBodyTextHeader}>{title}</Text>
            <Text
              style={{ fontSize: 15, color: "white", fontWeight: "bold" }}
            >{`${dd}/${mm}/${yy}`}</Text>
          </View>
          <Text style={styles.CarouselBodyText}>{shortTitle}.....</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  CarouselBody: {
    // borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 100,
    borderRadius: SIZES.padding,
    margin: SIZES.padding,
    padding: SIZES.padding,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    // elevation: 7,
  },
  CarouselBodyTextHeader: {
    fontSize: SIZES.h3,
    fontWeight: "bold",
    color: "white",
    flexShrink: 1,
  },
  CarouselBodyText: {
    fontSize: SIZES.body3,
    color: "white",
    // fontWeight: "bold",
  },
});
