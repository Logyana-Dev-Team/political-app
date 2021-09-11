import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, SafeAreaView, Linking } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, SIZES } from "../constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-community/async-storage";

const InformationDetailScreen = ({ route, navigation }) => {
  const [LangContext, setLangContext] = useState({
    theme: true,
    fontSize: 15,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await AsyncStorage.getItem("lang");
      if (response !== null && response === "mar") {
        setLangContext({ ...LangContext, theme: true });
      } else if (response !== null && response === "eng") {
        setLangContext({ ...LangContext, theme: false });
      }
    }
    fetchData();
  }, []);
  let data = route.params.timestamp.split("T")[0];
  let dateFormat = data.split("-");
  let yy = dateFormat[0];
  let dd = dateFormat[2];
  let mm = dateFormat[1];
  function Header() {
    return (
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <View style={styles.headerContent}>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              onPress={navigation.goBack}
            />
          </TouchableOpacity>
          <View style={styles.headerMiddleBody}>
            <MaterialIcons
              name="notifications-active"
              size={22}
              color="black"
              style={{ justifyContent: "center", alignItems: "center" }}
            />
            <Text style={styles.text}>
              {LangContext.theme ? "नागरिकांसाठी सूचना" : "Information"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        // borderWidth: 1,
      }}
    >
      {Header()}
      <View
        style={{
          marginHorizontal: SIZES.padding,
          marginBottom: 10,
          borderRadius: 10,
          borderWidth: 0.5,
        }}
      >
        <ScrollView>
          <View style={{ padding: SIZES.padding }}>
            <Text
              style={{
                alignSelf: "flex-end",
                color: COLORS.darkgray,
              }}
            >
              {`${dd}/${mm}/${yy}`}
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {route.params.title}
            </Text>
          </View>
          <View
            style={{
              // borderWidth: 1,
              padding: SIZES.padding,
              paddingHorizontal: 20,
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
                colors={["#EB361E", "#F59815", "#EEE50E"]}
                style={styles.lowerBodyButton}
              >
                <Text style={styles.lowerBodyButtonText}>
                  {LangContext.theme ? "पहा" : "View"}{" "}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default InformationDetailScreen;

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    // marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    margin: 10,
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
    width: 90,
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerBodyButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingVertical: 2,
  },
});
