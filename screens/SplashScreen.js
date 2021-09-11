import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

const SplashScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#dbd000" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../assets/Images/Person5.jpeg")}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: "#dbd000",
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: "white",
            },
          ]}
        >
          निखिल उल्हास भगत
        </Text>
        <Text style={styles.text}>नगरसेवक</Text>
        <Text style={styles.text}>तळेगाव दाभाडे नगरपरिषद</Text>

        <View style={styles.button}>
          <Text style={{...styles.text,fontSize:24}}>साइन इन करा</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <View style={styles.signIn}>
              <MaterialIcons name="navigate-next" color="black" size={45} />
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
  title: {
    //   color: '#05375a',
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.lightGray,
    marginTop: 5,
    fontSize: 20,
  },
  button: {
    // alignItems: "flex-end",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    marginTop: 30,
  },
  signIn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 120,
    backgroundColor: "white",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
