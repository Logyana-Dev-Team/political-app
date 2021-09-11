import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import {
  Feather,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { COLORS, SIZES } from "../constants/theme";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const ContactScreen = ({ navigation }) => {
  // const { control, handleSubmit, errors } = useForm();
  const [feedData, setFeedData] = useState({
    name: "",
    number: "",
    message: "",
  });
  const [data, setData] = useState([]);
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
    axios
      .get("mahiti")
      .then((res) => {
        // console.log(res.data);
        setData(res.data[0]);
        // console.log(data);
        setFeedData({
          name: "",
          number: "",
          message: "",
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = () => {
    if (feedData.number === "" || feedData.message === "") {
      Alert.alert("सगळे क्षेत्र अनिवार्य आहे");
    } else {
      axios
        .post("/sampark", feedData)
        .then((res) => {
          console.log(res);
          Alert.alert("संदेश पाठवला");
        })
        .catch((err) => console.log(err));
    }
  };
  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${data.number}`);
    } else {
      Linking.openURL(`telprompt:${data.number}`);
    }
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
              {LangContext.theme ? "थेट संपर्क" : "Contact Us"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      behavior="padding"
      style={{ paddingVertical: 5, backgroundColor: "white", flex: 1 }}
    >
      {Header()}
      <KeyboardAwareScrollView>
        <View style={styles.ImageContainer}>
          <Image
            source={require("../assets/Images/Person7.jpg")}
            resizeMode="cover"
            style={{
              height: 100,
              width: 100,
              borderRadius: 200,
            }}
          />
          <View style={styles.ImageIcon}>
            <Ionicons name="call" size={22} color="white" />
          </View>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.TextTitle}>
            {LangContext.theme ? "नाव" : "Name"}:
          </Text>
          <TextInput
            style={styles.MobileInputText}
            onChangeText={(e) => setFeedData({ ...feedData, name: e })}
            name="name"
            value={feedData.name}
          />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.TextTitle}>
            {LangContext.theme ? "मोबाईल नंबर " : "Mobile No."}:
          </Text>
          <TextInput
            style={styles.MobileInputText}
            onChangeText={(e) => setFeedData({ ...feedData, number: e })}
            keyboardType="numeric"
            name="number"
            value={feedData.number}
          />
        </View>
        <View style={{ marginBottom: 10, marginHorizontal: 10 }}>
          <Text style={styles.TextTitle}>
            {LangContext.theme ? "संदेश  " : "Message"}:
          </Text>
          <TextInput
            style={styles.MsgInputText}
            onChangeText={(e) => setFeedData({ ...feedData, message: e })}
            name="message"
            value={feedData.message}
          />
        </View>
        <TouchableOpacity
          style={{ alignSelf: "center", marginVertical: 20 }}
          onPress={() => onSubmit()}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0.0, 0.5, 0.99]}
            colors={["#F22323", "#D31616", "#B50909"]}
            style={styles.lowerBodyButton}
          >
            <Text style={styles.lowerBodyButtonText}>
              {LangContext.theme ? "पाठवा" : "Send"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
  ImageContainer: {
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  ImageIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25D366",
    position: "absolute",
    top: 70,
    left: "55%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
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
    backgroundColor: "#F1F1F1",
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
    backgroundColor: "#F1F1F1",
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
    height: 60,
    width: "100%",
    // position: "absolute",
    bottom: 5,
    borderWidth: 1,
    marginVertical: 15,
    backgroundColor: "black",
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

export default ContactScreen;
