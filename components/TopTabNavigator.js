import React, { useEffect, useState } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GalleryScreen, VideoScreen } from "../screens";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
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
  return (
    <Tab.Navigator
      initialRouteName="GalleryScreen"
      tabBarOptions={{
        activeTintColor: COLORS.black,
        indicatorStyle: {
          backgroundColor: COLORS.black,
          height: 3,
        },
        labelStyle: {
          fontWeight: "bold",
          fontSize: 15,
        },
        showIcon: true,
      }}
    >
      <Tab.Screen
        name="GalleryScreen"
        options={{ title: LangContext.theme ? "फोटो" : "Photo" }}
        component={GalleryScreen}
      />
      <Tab.Screen
        name="VideoScreen"
        options={{ title: LangContext.theme ? "विडिओ" : "Video" }}
        component={VideoScreen}
      />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
