import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  Share,
  Image,
} from "react-native";
import {
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Fontisto } from "react-native-vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./context";
import axios from "axios";

const DrawerContent = (props) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [link, setLink] = useState([]);
  const [LangContext, setLangContext] = useState({
    theme: true,
    fontSize: 15,
  });
  const { toggleEng, toggleMar } = React.useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(null);

  useEffect(() => {
    const _retrieveData = async () => {
      try {
        const id = await AsyncStorage.getItem("id");
        if (id !== null) {
          axios.get(`users/${id}`).then((res) => {
            setName(res.data.user.name);
            setNumber(res.data.user.mobile);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    _retrieveData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await AsyncStorage.getItem("lang");
      if (response !== null && response === "mar") {
        setLangContext({ ...LangContext, theme: true });
        setIsSwitchOn(true);
      } else if (response !== null && response === "eng") {
        setLangContext({ ...LangContext, theme: false });
        setIsSwitchOn(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("mahiti")
      .then((res) => {
        setLink(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const myCustomShare = async (link) => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onToggleSwitch = () => {
    let selectLang = !isSwitchOn;
    if (selectLang) {
      setIsSwitchOn(!isSwitchOn);
      toggleMar();
    } else {
      setIsSwitchOn(!isSwitchOn);
      toggleEng();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                paddingVertical: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginLeft: 3,
                  flexDirection: "column",
                  borderWidth: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Title style={styles.title}>{name}</Title>
                <Caption style={styles.caption}>{number}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Entypo name="home" size={20} color="black" />}
              label={LangContext.theme ? "होम" : "Home"}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={() => <Ionicons name="person" size={20} color="black" />}
              label={LangContext.theme ? "आमच्याबद्दल माहिती" : "About Us"}
              onPress={() => {
                props.navigation.navigate("AboutUs");
              }}
            />
            <DrawerItem
              icon={() => (
                <Ionicons name="hand-right" size={20} color="black" />
              )}
              label={LangContext.theme ? "शासकीय योजना" : "Government Scheme"}
              onPress={() => {
                props.navigation.navigate("GovtPlan");
              }}
            />
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons
                  name="message-draw"
                  size={20}
                  color="black"
                />
              )}
              label={
                LangContext.theme ? "तक्रार / प्रस्ताव" : "Complaint / Proposal"
              }
              onPress={() => {
                props.navigation.navigate("Feedback");
              }}
            />
            <DrawerItem
              icon={() => (
                <FontAwesome5 name="clipboard-list" size={21} color="black" />
              )}
              label={LangContext.theme ? "आमचे कार्य" : "Our Work"}
              onPress={() => {
                props.navigation.navigate("GovtWork");
              }}
            />

            <DrawerItem
              icon={() => (
                <FontAwesome name="newspaper-o" size={16} color="black" />
              )}
              label={LangContext.theme ? "बातम्या" : "News"}
              onPress={() => {
                props.navigation.navigate("NewsPhotos");
              }}
            />
            <DrawerItem
              icon={() => (
                <MaterialIcons
                  name="notifications-active"
                  size={20}
                  color="black"
                />
              )}
              label={
                LangContext.theme
                  ? "नागरिकांसाठी सूचना"
                  : "Information for citizens"
              }
              onPress={() => {
                props.navigation.navigate("Notification");
              }}
            />
            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons
                  name="message-draw"
                  size={20}
                  color="black"
                />
              )}
              label={LangContext.theme ? "तक्रार निवारण" : "Solved Complaints"}
              onPress={() => {
                props.navigation.navigate("ComplaintScreen");
              }}
            />
            <DrawerItem
              icon={() => (
                <Image
                  source={require("../assets/Images/job-black.png")}
                  resizeMode="center"
                  style={{ marginBottom: 5, width: 20, height: 20 }}
                />
              )}
              label={LangContext.theme ? "नौकरी संदर्भ" : "Jobs"}
              onPress={() => {
                props.navigation.navigate("JobScreen");
              }}
            />
            <DrawerItem
              icon={() => <Fontisto name="share-a" size={16} color="black" />}
              label={LangContext.theme ? "शेयर" : "Share"}
              onPress={() => {
                myCustomShare(link.playstore);
              }}
            />
            <DrawerItem
              icon={() => <Ionicons name="call" size={20} color="black" />}
              label={LangContext.theme ? "थेट संपर्क" : "Contact Us"}
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Language">
            <TouchableRipple>
              <View style={styles.preference}>
                <Text>English</Text>
                <Switch
                  value={isSwitchOn}
                  onValueChange={() => onToggleSwitch()}
                />
                <Text>मराठी</Text>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
        onPress={() => {
          Linking.openURL("https://www.logyana.com/");
        }}
      >
        <Text style={{ flexWrap: "wrap", fontSize: 16, fontWeight: "bold" }}>
          Designed And Developed By Logyana Solutions Pvt. Ltd
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 5,
    margin: 10,
    borderBottomColor: "#e8e8e8",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  caption: {
    fontSize: 16,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    // marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    maxWidth: 50,
    paddingHorizontal: 10,
    flexWrap: "wrap",
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
