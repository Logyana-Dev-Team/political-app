import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import JobCard from "../components/JobCard";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const JobScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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
    }
    fetchData();
  }, []);

  useEffect(() => {
    // console.log("workingoo");
    axios
      .get("jobs")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
        setLoading(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "white" }}
    >
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <JobCard
              id={item._id}
              title={item.title}
              posts={item.posts}
              salary={item.salary}
              place={item.place}
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
});

export default JobScreen;
