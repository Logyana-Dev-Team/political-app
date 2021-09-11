import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Linking,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  Feather,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const AboutUsScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [banner, setBanner] = useState([]);
  const [profile, setProfile] = useState([]);
  const [loading, setloading] = useState(true);
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
  useEffect(() => {
    setloading(true);
    axios
      .get("mahiti")
      .then((res) => {
        // console.log(res.data);
        setData(res.data[0]);
        setloading(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    axios
      .get("banner")
      .then((res) => {
        // console.log(res.data[0]);
        setBanner(res.data[0]);
        // console.log(data);
      })
      .catch((err) => console.log(err));
    axios
      .get("profile")
      .then((res) => {
        // console.log(res.data[0]);
        setProfile(res.data[0]);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${data.number}`);
    } else {
      Linking.openURL(`telprompt:${data.number}`);
    }
  };

  const openUrl = (link) => {
    // console.log("open");
    if (link === "facebook") Linking.openURL(`${data.facebook}`);
    else if (link === "instagram") Linking.openURL(`${data.instagram}`);
    else if (link === "mail") Linking.openURL(`mailto:${data.gmail}`);
    else if (link === "whatsapp")
      Linking.openURL(
        `https://api.whatsapp.com/send?phone=+91${data.whatsapp}`
      );
  };

  function Header() {
    return (
      <SafeAreaView style={{ backgroundColor: "white" }}>
        {/* dont use style: flex=1  */}
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
            <Text style={styles.text}>
              {LangContext.theme ? "आमच्याबद्दल माहिती" : "About Us"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const AboutUsData = () => {
    return (
      <SafeAreaView
        behavior="padding"
        style={{
          paddingVertical: 5,
          backgroundColor: "white",
          flex: 1,
          position: "relative",
        }}
      >
        <ScrollView>
          {Header()}
          <ImageBackground
            source={{ uri: `${banner.filename}` }}
            resizeMode="cover"
            style={{
              justifyContent: "center",
              height: 150,
              // borderWidth:1,
              paddingVertical: 10,
            }}
          >
            <View style={styles.ImageContainer}>
              <Image
                source={{ uri: `${profile.filename}` }}
                resizeMode="cover"
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 60,
                }}
              />
            </View>
          </ImageBackground>
          <View
            style={{
              borderWidth: 0,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <TouchableOpacity onPress={() => openUrl("facebook")}>
              <Image
                source={require("../assets/Images/facebook.png")}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  margin: 7,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl("instagram")}>
              <Image
                source={require("../assets/Images/instagram.png")}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  margin: 7,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl("mail")}>
              <Image
                source={require("../assets/Images/gmail.png")}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  margin: 7,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openUrl("whatsapp")}>
              <Image
                source={require("../assets/Images/whatsapp.png")}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  margin: 7,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              borderWidth: 0,
              paddingHorizontal: 10,
              flex: 1,
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text
                style={{
                  width: "25%",
                  fontSize: LangContext.theme ? 20 : 18,
                  fontWeight: "bold",
                }}
              >
                {LangContext.theme ? "नाव" : "Name"} :
              </Text>
              <Text style={{ width: "75%", fontSize: 17 }}>{data.name}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text
                style={{
                  width: "25%",
                  fontSize: LangContext.theme ? 20 : 18,
                  fontWeight: "bold",
                }}
              >
                {LangContext.theme ? "जन्म" : "DOB"} :
              </Text>
              <Text style={{ width: "75%", fontSize: 17 }}>{data.dob}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text
                style={{
                  width: "25%",
                  fontSize: LangContext.theme ? 20 : 18,
                  fontWeight: "bold",
                }}
              >
                {LangContext.theme ? "परिचय" : "About"} :
              </Text>
              <Text style={{ width: "75%", fontSize: 17 }}>{data.desc1}</Text>
            </View>
            {data.desc2 === "" ? null : (
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
                <Text
                  style={{
                    width: "25%",
                    fontSize: LangContext.theme ? 20 : 18,
                    fontWeight: "bold",
                  }}
                >
                  {LangContext.theme ? "राजकीय कार्यकीर्द" : "Political Career"}{" "}
                  :
                </Text>
                <Text style={{ width: "75%", fontSize: 17 }}>{data.desc2}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.Footer}
            onPress={() => {
              openDial();
            }}
          >
            <View style={styles.FooterIcon}>
              <Ionicons name="call" size={22} color="white" />
            </View>
            <Text style={{ fontSize: 20, color: "white" }}>
              {LangContext.theme
                ? "अधिक माहीती साठी कॉल करा"
                : "For more info , contact us"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };
  return loading ? (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicator color="black" size="large" />
    </View>
  ) : (
    AboutUsData()
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
    elevation: 2,
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
  ImageContainer: {
    // borderWidth: 1,
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 10,
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    elevation: 1,
  },
  TextTitle: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  MobileInputText: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
  MsgInputText: {
    width: "80%",
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
  ErrorMsg: {
    color: "red",
    marginTop: 5,
    alignSelf: "flex-start",
    marginLeft: 20,
  },
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
    paddingVertical: 2,
    fontSize: 20,
  },
  Footer: {
    // height: 60,
    // position:"absolute",
    borderWidth: 1,
    marginTop: 100,
    // marginBottom: 100,
    borderWidth: 1,
    // marginVertical: 5,
    backgroundColor: "black",
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  FooterIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
});

export default AboutUsScreen;
