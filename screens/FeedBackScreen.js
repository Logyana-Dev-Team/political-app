import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Image,
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
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
// import * as ImagePicker from "expo-image-picker";
// import { Button } from "native-base";
import { BottomSheet } from "react-native-btr";
import axios from "axios";
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-community/async-storage";
// import PhotoUpload from "react-native-photo-upload";

export default function FeedBackScreen({ navigation }) {
  const [selectedValue, setSelectedValue] = useState("Anonymous");
  const [feedData, setFeedData] = useState({
    name: "निनावी",
    mob: "",
    subject: "",
    desc: "",
  });
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
  const [image, setImage] = useState(0);
  // const [imageData, setImageData]= useState([]);
  let ImageArray = [];
  // const { control, handleSubmit, register, errors } = useForm();
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("");
    if (feedData.name === "निनावी") {
      setFeedData({ ...feedData, name: "निनावी" });
    }
    // console.log(feedData);
    // setFeedData({...feedData,images:image})
    if (feedData.subject === "" || feedData.desc === "") {
      LangContext.theme
        ? Alert.alert("सगळे क्षेत्र अनिवार्य आहे")
        : Alert.alert("Required All Fields");
    } else {
      LangContext.theme
        ? Alert.alert("तक्रार पाठवली आहे")
        : Alert.alert("Complaint successfully sent");
      axios
        .post("/takrar", feedData)
        .then((res) => {
          console.log(res);
          setFeedData({
            name: "",
            mob: "",
            subject: "",
            desc: "",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log(blob);
    // Alert.alert("success",blob.type);
  };

  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
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
            <Image
              source={require("../assets/Images/feedbackLogo.png")}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                // borderRadius: 10,
              }}
            />
            <Text style={styles.text}>
              {LangContext.theme ? "तक्रार" : "Complaint"}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      {Header()}
      <KeyboardAwareScrollView>
        <View
          style={{
            // borderWidth: 1,
            margin: 15,
            paddingBottom: 30,
            borderRadius: 10,
            borderColor: COLORS.darkgray,
            elevation: 3,
          }}
        >
          <View style={styles.FeedbackTypeBody}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                margin: 10,
                alignSelf: "flex-start",
                marginLeft: 35,
              }}
            >
              {LangContext.theme ? "तक्रार प्रकार " : "Complaint Type"} :
            </Text>
            <View
              style={{
                // borderWidth: 2,
                width: "80%",
                borderRadius: 10,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 2,
                backgroundColor: "#F1F1F1",
              }}
            >
              <Picker
                selectedValue={selectedValue}
                style={{
                  height: 40,
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item
                  label={LangContext.theme ? "निनावी" : "Anonymous"}
                  value="Anonymous"
                />
                <Picker.Item
                  label={LangContext.theme ? "नावाने" : "Name"}
                  value="name"
                />
              </Picker>
            </View>
          </View>
          {selectedValue === "name" ? (
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                  alignSelf: "flex-start",
                  marginLeft: 35,
                }}
              >
                {LangContext.theme ? "नाव" : "Name"}:
              </Text>
              <TextInput
                style={styles.inputStyle}
                // ref={register}
                onChangeText={(e) => setFeedData({ ...feedData, name: e })}
                name="name"
                value={feedData.name}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  margin: 10,
                  alignSelf: "flex-start",
                  marginLeft: 35,
                }}
              >
                {LangContext.theme ? "मो. नंबर" : "Mobile No."}:
              </Text>
              <TextInput
                style={styles.inputStyle}
                // ref={register}
                onChangeText={(e) => setFeedData({ ...feedData, mob: e })}
                name="mob"
                value={feedData.mob}
              />
            </View>
          ) : null}
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginVertical: 10,
                alignSelf: "flex-start",
                marginLeft: 35,
              }}
            >
              {LangContext.theme ? "विषय" : "subject"}:
            </Text>
            <TextInput
              style={styles.inputStyle}
              // ref={register}
              onChangeText={(e) => setFeedData({ ...feedData, subject: e })}
              name="subject"
              value={feedData.subject}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                // margin: 10,
                alignSelf: "flex-start",
                marginLeft: 35,
                marginVertical: 10,
              }}
            >
              {LangContext.theme ? "तक्रार" : "complaint"} :
            </Text>
            <TextInput
              style={{
                width: "80%",
                height: 100,
                paddingHorizontal: 10,
                borderRadius: 10,
                shadowColor: "black",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
                elevation: 2,
                fontSize: 16,
                backgroundColor: "#F1F1F1",
                alignSelf: "center",
                // borderWidth:1,
              }}
              // ref={register}
              onChangeText={(e) => setFeedData({ ...feedData, desc: e })}
              name="desc"
              value={feedData.desc}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{ alignSelf: "center", marginVertical: 5 }}
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
              {LangContext.theme ? "पाठवा" : "send"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
      >
        {/* <View style={styles.bottomNavigationView}> */}
        <View style={styles.panel}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.panelTitle}>फोटो अपलोड करा</Text>
            <Text style={styles.panelSubtitle}>एक पर्याय निवडा</Text>
          </View>
          <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>फोटो काढा</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>फोटो गैलरी मधून निवडा</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
            <Text style={styles.panelButtonTitle}>रद्द करा</Text>
          </TouchableOpacity>
        </View>
        {/* </View> */}
      </BottomSheet>
    </View>
  );
}

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
  FeedbackTypeBody: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    // borderWidth:1
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
  bottomNavigationView: {
    backgroundColor: "#fff",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  inputStyle: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    fontSize: 16,
    backgroundColor: "#F1F1F1",
    alignSelf: "center",
  },
});
