import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { JobNavigator } from "./StackNavigator";

const JobCard = ({
  id,
  title,
  posts,
  salary,
  place,
  desc,
  link,
  timestamp,
}) => {
  let data = timestamp.split("T")[0];
  let dateFormat = data.split("-");
  let yy = dateFormat[0];
  let dd = dateFormat[2];
  let mm = dateFormat[1];
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginHorizontal: 10 }}
      onPress={() =>
        navigation.navigate("JobDetailScreen", {
          title,
          posts,
          salary,
          place,
          desc,
          link,
          timestamp,
        })
      }
    >
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.0, 0.55, 0.99]}
        colors={["#02cc17", "#23fa39", "#42f554"]}
        style={styles.CarouselBody}
      >
        <View
          style={{
            justifyContent: "flex-end",
            marginBottom: 5,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              alignSelf: "flex-end",
              marginRight: 10,
              marginTop: 10,
              color: "white",
              fontWeight: "bold",
            }}
          >{`${dd}/${mm}/${yy}`}</Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.CarouselBodyText}>{title}</Text>
          <Text
            style={{
              ...styles.CarouselBodyText,
              fontSize: 18,
              fontWeight: "normal",
              paddingBottom: 10,
            }}
          >
            {desc}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  CarouselBody: {
    justifyContent: "center",
    minHeight: 100,
    borderWidth: 0.5,
    borderRadius: SIZES.padding,
    marginVertical: SIZES.padding,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 0,
  },
  CarouselBodyText: {
    fontSize: SIZES.h2,
    color: "white",
    paddingHorizontal: SIZES.padding,
    fontWeight: "bold",
    width: "80%",
  },
});
