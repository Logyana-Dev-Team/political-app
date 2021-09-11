import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";

import NewsCard from "../components/NewsCard";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const InformationScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    axios
      .get("suchana")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  function Header() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "transparent",
          marginBottom: 5,
          paddingVertical: 10,
        }}
      >
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
      style={{ flex: 1, paddingHorizontal: 10, marginVertical: 10 }}
    >
      {Header()}
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <NewsCard
              id={item._id}
              title={item.title}
              desc={item.desc}
              link={item.link}
              timestamp={item.createdAt}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: "row",
    // marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
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

export default InformationScreen;
