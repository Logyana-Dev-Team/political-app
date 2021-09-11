import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { COLORS, SIZES } from "../constants/theme";
import {
  Entypo,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FontAwesome } from "react-native-vector-icons";

const Header = ({ title, navigation }) => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      {/* dont use style: flex=1  */}
      <View style={styles.headerContent}>
        <TouchableOpacity>
          {title === "अंबरनाथ कांबळे" ? (
            <Entypo
              name="menu"
              size={30}
              color="rgba(248, 110, 11, 0.79)"
              onPress={openMenu}
            />
          ) : (
            <Ionicons
              name="arrow-back"
              size={30}
              color="black"
              onPress={() => navigation.navigate("HomeScreen")}
            />
          )}
        </TouchableOpacity>
        <View style={styles.headerMiddleBody}>
          {title === "सरकारी  योजना" ? (
            <Image
              source={require("../assets/Images/yojanaIcon.png")}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
                borderRadius: 10,
              }}
            />
          ) : title === "सूचना" ? (
            <MaterialIcons
              name="notifications-active"
              size={22}
              color="black"
              style={{ justifyContent: "center", alignItems: "center" }}
            />
          ) : title === "आमचे कार्य" ? (
            <Image
              source={require("../assets/Images/AamcheKaryaIcon.png")}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
                borderRadius: 10,
              }}
            />
          ) : title === "तक्रार" ? (
            <Image
              source={require("../assets/Images/feedbackLogo.png")}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                // borderRadius: 10,
              }}
            />
          ) : title === "बातम्या" ? (
            <FontAwesome name="newspaper-o" size={25} color="#15C012" />
          ) : title === "गॅलरी" ? (
            <FontAwesome name="photo" size={25} color="red" />
          ) : title === "नोटिफिकेशन्स" ? (
            <MaterialIcons
              name="notifications-active"
              size={22}
              color="black"
              style={{ justifyContent: "center", alignItems: "center" }}
            />
          ) : title === "नौकरी संदर्भ" ? (
            <Image
              source={require("../assets/Images/job.png")}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
              }}
            />
          ) : title === "तक्रार निवारण" ? (
            <MaterialCommunityIcons
              name="message-draw"
              size={22}
              color="#15C012"
            />
          ) : null}

          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
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

export default Header;
