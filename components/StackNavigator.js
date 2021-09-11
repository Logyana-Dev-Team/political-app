import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AboutUsScreen,
  ContactScreen,
  FeedBackScreen,
  GalleryScreen,
  GovernmentPlanScreen,
  GovernmentWorkScreen,
  GovtPlanDetailScreen,
  GovtWorkDetailScreen,
  HomeScreen,
  InformationDetailScreen,
  InformationScreen,
  NotificationScreen,
  JobScreen,
  JobDetailScreen,
  ComplaintScreen,
} from "../screens";
import NewsPhotos from "./NewsPhotos";
import Header from "./Header";
import ImageModal from "./ImageModal";
import RenderImage from "./RenderImage";
import TopTabNavigator from "./TopTabNavigator";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();
const GovtPlan = createStackNavigator();
const GovtWork = createStackNavigator();
const Job = createStackNavigator();
const Notification = createStackNavigator();
const Feedback = createStackNavigator();
const ContactUs = createStackNavigator();
const AboutUS = createStackNavigator();
const Complaint = createStackNavigator();
const News = createStackNavigator();

const StackNavigator = ({ navigation }) => {
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
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          // header: () => (
          //   <Header title="निखिल उल्हास भगत" navigation={navigation} />
          // ),
        }}
      />
      <Stack.Screen
        name="GovernmentPlan"
        component={GovernmentPlanScreen}
        options={{
          headerShown: false,
          // header: () => (
          //   <Header title="सरकारी  योजना" navigation={navigation} />
          // ),
        }}
      />
      <Stack.Screen
        name="GovernmentWorkScreen"
        component={GovernmentWorkScreen}
        options={{
          // headerShown: false,
          header: () => (
            <Header
              title={LangContext.theme ? "आमचे कार्य" : "Our Work"}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="JobScreen"
        component={JobScreen}
        options={{
          header: () => (
            <Header
              title={LangContext.theme ? "नौकरी संदर्भ" : "Jobs"}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ComplaintScreen"
        component={ComplaintScreen}
        options={{
          header: () => (
            <Header
              title={LangContext.theme ? "तक्रार निवारण" : "Solved Complaints"}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedBackScreen}
        options={{
          headerShown: false,
          // header: () => <Header title="तक्रार" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="InformationScreen"
        component={InformationScreen}
        options={{
          headerShown: false,
          // header: () => <Header title="सूचना" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          headerShown: false,
          // header: () => <Header title="थेट संपर्क" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          headerShown: false,
          // header: () => (
          //   <Header title="आमच्याबद्दल माहिती" navigation={navigation} />
          // ),
        }}
      />
      <Stack.Screen
        name="GovtWorkDetailScreen"
        component={GovtWorkDetailScreen}
        options={{
          // headerShown: false,
          header: () => (
            <Header
              title={LangContext.theme ? "आमचे कार्य" : "Our Work"}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="GovtPlanDetailScreen"
        component={GovtPlanDetailScreen}
        options={{
          // headerShown: false,
          header: () => (
            <Header
              title={LangContext.theme ? "शासकीय योजना" : "Government Scheme"}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="JobDetailScreen"
        component={JobDetailScreen}
        options={{
          header: () => (
            <Header
              title={LangContext.theme ? "नौकरी संदर्भ" : "Jobs"}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="InformationDetailScreen"
        component={InformationDetailScreen}
        options={{
          headerShown: false,
          // header: () => <Header title="सूचना" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="GalleryScreen"
        component={GalleryScreen}
        options={{
          headerShown: false,
          // header: () => <Header title="सूचना" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="RenderImage"
        component={RenderImage}
        options={{
          headerShown: false,
          // header: () => <Header title="सूचना" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="ImageModal"
        component={ImageModal}
        options={{
          headerShown: false,
          // header: () => <Header title="सूचना" navigation={navigation} />,
        }}
      />
      <Stack.Screen
        name="NewsPhotos"
        component={NewsPhotos}
        options={{
          header: () => (
            <Header
              title={LangContext.theme ? "बातम्या" : "News"}
              navigation={navigation}
            />
          ),
        }}
      />
      <Stack.Screen
        name="GallerySection"
        component={TopTabNavigator}
        options={{
          header: () => (
            <Header
              title={LangContext.theme ? "गॅलरी" : "Gallery"}
              navigation={navigation}
            />
          ),
          // headerStyle: {
          //   // backgroundColor: "black",
          //   elevation: 0,
          //   shadowOpacity: 0,
          // },
          // headerTitle: "Gallery",
        }}
      />

      <Stack.Screen
        name="NotificationSection"
        component={NotificationScreen}
        options={{
          header: () => (
            <Header
              title={LangContext.theme ? "नोटिफिकेशन्स" : "Notifications"}
              navigation={navigation}
            />
          ),
          // headerStyle: {
          //   backgroundColor: COLORS.lightGray,
          // },
          // headerTitle: "Notifications",
        }}
      />
    </Stack.Navigator>
  );
};

const GovtPlanNavigator = ({ navigation }) => {
  return (
    <GovtPlan.Navigator initialRouteName="GovernmentPlan">
      <GovtPlan.Screen
        name="GovernmentPlan"
        component={GovernmentPlanScreen}
        options={{
          headerShown: false,
          // header: () => (
          //   <Header title="सरकारी  योजना" navigation={navigation} />
          // ),
        }}
      />
    </GovtPlan.Navigator>
  );
};
const GovtWorkNavigator = ({ navigation }) => {
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
    <GovtWork.Navigator initialRouteName="GovernmentWorkScreen">
      <GovtWork.Screen
        name="GovernmentWorkScreen"
        component={GovernmentWorkScreen}
        options={{
          // headerShown: false,
          header: () => (
            <Header
              title={LangContext.theme ? "आमचे कार्य" : "Our Work"}
              navigation={navigation}
            />
          ),
        }}
      />
    </GovtWork.Navigator>
  );
};
const NotificationNavigator = ({ navigation }) => {
  return (
    <Notification.Navigator initialRouteName="InformationScreen">
      <Notification.Screen
        name="InformationScreen"
        component={InformationScreen}
        options={{
          // headerShown: false,
          header: () => <Header title="सूचना" navigation={navigation} />,
        }}
      />
    </Notification.Navigator>
  );
};
const JobNavigator = ({ navigation }) => {
  return (
    <Job.Navigator initialRouteName="JobScreen">
      <Job.Screen
        name="JobScreen"
        component={JobScreen}
        options={{
          // headerShown: false,
          header: () => <Header title="नौकरी संदर्भ" navigation={navigation} />,
        }}
      />
    </Job.Navigator>
  );
};
const NewsNavigator = ({ navigation }) => {
  return (
    <News.Navigator initialRouteName="News">
      <News.Screen
        name="NewsPhotos"
        component={NewsPhotos}
        options={{
          header: () => <Header title="बातम्या" navigation={navigation} />,
        }}
      />
    </News.Navigator>
  );
};
const ComplaintNavigator = ({ navigation }) => {
  return (
    <Complaint.Navigator initialRouteName="ComplaintScreen">
      <Complaint.Screen
        name="ComplaintScreen"
        component={ComplaintScreen}
        options={{
          // headerShown: false,
          header: () => (
            <Header title="तक्रार निवारण" navigation={navigation} />
          ),
        }}
      />
    </Complaint.Navigator>
  );
};
const FeedbackNavigator = ({ navigation }) => {
  return (
    <Feedback.Navigator initialRouteName="FeedbackScreen">
      <Feedback.Screen
        name="FeedbackScreen"
        component={FeedBackScreen}
        options={{
          // headerShown: false,
          header: () => <Header title="तक्रार" navigation={navigation} />,
        }}
      />
    </Feedback.Navigator>
  );
};
const ContactUsNavigator = ({ navigation }) => {
  return (
    <ContactUs.Navigator initialRouteName="ContactScreen">
      <ContactUs.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          // headerShown: false,
          header: () => <Header title="थेट संपर्क" navigation={navigation} />,
        }}
      />
    </ContactUs.Navigator>
  );
};
const AboutUSNavigator = ({ navigation }) => {
  return (
    <AboutUS.Navigator initialRouteName="GovernmentPlan">
      <AboutUS.Screen
        name="AboutUsScreen"
        component={AboutUsScreen}
        options={{
          // headerShown: false,
          header: () => (
            <Header title="आमच्याबद्दल माहिती" navigation={navigation} />
          ),
        }}
      />
    </AboutUS.Navigator>
  );
};

export {
  StackNavigator,
  GovtPlanNavigator,
  GovtWorkNavigator,
  NotificationNavigator,
  FeedbackNavigator,
  ContactUsNavigator,
  AboutUSNavigator,
  JobNavigator,
  ComplaintNavigator,
  NewsNavigator,
};
