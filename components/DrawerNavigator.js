import React from "react";
import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  AboutUsScreen,
  ContactScreen,
  FeedBackScreen,
  GovernmentPlanScreen,
  GovernmentWorkScreen,
  InformationScreen,
  RootStackScreen,
} from "../screens";
import {
  StackNavigator,
  GovtPlanNavigator,
  GovtWorkNavigator,
  NotificationNavigator,
  FeedbackNavigator,
  ContactUsNavigator,
  AboutUSNavigator,
} from "./StackNavigator";
import DrawerContent from "./DrawerContent";
import AsyncStorage from "@react-native-community/async-storage";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="StackScreen"
      drawerContentOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="StackScreen" component={StackNavigator} />
      <Drawer.Screen name="GovtPlan" component={GovtPlanNavigator} />
      <Drawer.Screen name="GovtWork" component={GovtWorkNavigator} />
      <Drawer.Screen name="Notification" component={InformationScreen} />
      <Drawer.Screen name="Feedback" component={FeedBackScreen} />
      <Drawer.Screen name="ContactUs" component={ContactScreen} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
