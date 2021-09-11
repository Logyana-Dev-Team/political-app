import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Linking } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

const GovtPlanDetailScreen = ({ route }) => {
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
  let data = route.params.timestamp.split("T")[0];
  let dateFormat = data.split("-");
  // 2021-0-21
  let yy = dateFormat[0];
  let dd = dateFormat[2];
  let mm = dateFormat[1];
  // console.log(dd)
  // console.log(mm)
  // console.log(yy)
  // console.log(data);
  // console.log(data);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        // borderWidth: 1,
      }}
    >
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginBottom: 10,
          borderRadius: 10,
          // shadowColor: "black",
          // shadowOffset: { width: 0, height: 2 },
          // shadowOpacity: 0.5,
          // shadowRadius: 1,
          borderColor: COLORS.darkgray,
          borderWidth: 1,
          // elevation: 2,
        }}
      >
        <ScrollView>
          <View style={{ padding: SIZES.padding }}>
            {/* <Text
              style={{
                alignSelf: "flex-end",
                letterSpacing: 1,
                color: COLORS.darkgray,
              }}
            >
              {`${dd}/${mm}/${yy}`}
            </Text> */}
          </View>
          <View
            style={{
              // borderWidth: 1,
              padding: SIZES.padding,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {route.params.title}
            </Text>
          </View>
          <View
            style={{
              // borderWidth: 1,
              padding: SIZES.padding,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, letterSpacing: 2 }}>
              {route.params.desc}
            </Text>
          </View>
          {route.params.link === "" ? null : (
            <TouchableOpacity
              onPress={() => Linking.openURL(route.params.link)}
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default GovtPlanDetailScreen;

const styles = StyleSheet.create({
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
