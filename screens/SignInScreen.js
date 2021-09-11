import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from "react-native-linear-gradient";
import { AntDesign } from "react-native-vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "react-native-paper";

import { AuthContext } from "../components/context";
import { COLORS } from "../constants/theme";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState({
    mobile: "",
    password: "",
  });
  const { signIn } = React.useContext(AuthContext);

  const onSubmit = () => {
    console.log(feedData);
    if (feedData.username === "" && feedData.password === "") {
      Alert.alert("कृपया ईमेल आयडी व पासवर्ड टाका", "");
    } else {
      axios
        .post("login", feedData)
        .then(async (res) => {
          console.log(res.data);
          await AsyncStorage.setItem("token", "NewSecretToken3");
          await AsyncStorage.setItem("name", res.data.name);
          await AsyncStorage.setItem("mobile", res.data.mobile);
          signIn();
          // setLoading(false);
          // Alert.alert("Login Successfully");
          // console.log(data);
        })
        .catch(() => {
          Alert.alert("चुकीचा ईमेल व पासवर्ड", "");
          // setLoading(false)
        });
    }
    // setLoading(true);
  };
  // const [data, setData] = React.useState({
  //     username: '',
  //     password: '',
  //     check_textInputChange: false,
  //     secureTextEntry: true,
  //     isValidUser: true,
  //     isValidPassword: true,
  // });

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondary1} barStyle="light-content" />
      {/* {loading ? (
        <ActivityIndicator size="large" color="white" style={{justifyContent:"center"}} />
      ) : 
      ( */}
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.text_header}>स्वागत आहे!!!</Text>
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={[
                styles.text_footer,
                {
                  color: colors.text,
                },
              ]}
            >
              Choose your language
            </Text>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              marginTop: 20,
              padding: 10,
              borderRadius: 10,
              backgroundColor: COLORS.lightGray,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 20,
            }}
            onPress={async () => {
              await AsyncStorage.setItem("lang", "eng");
              signIn();
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
              }}
            >
              English
            </Text>
            <AntDesign
              name="right"
              size={25}
              color="black"
              // onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              marginTop: 20,
              padding: 10,
              borderRadius: 10,
              backgroundColor: COLORS.lightGray,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 20,
            }}
            onPress={async () => {
              await AsyncStorage.setItem("lang", "mar");
              signIn();
            }}
          >
            <Text
              style={{
                color: colors.text,
                fontSize: 18,
              }}
            >
              Marathi
            </Text>
            <AntDesign
              name="right"
              size={25}
              color="black"
              // onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>
        </Animatable.View>
      </View>
      {/* )} */}
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary1,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 22,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
