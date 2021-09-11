import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Linking,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import axios from "axios";
import { Entypo } from "react-native-vector-icons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import AsyncStorage from "@react-native-community/async-storage";
import OneSignal from "react-native-onesignal";
import { APP_ID, LIMIT, REST_API_KEY } from "../App";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [images, setImages] = useState([]);
  const [newsImages, setNewsImages] = useState([]);
  const [notifyCount, setnotifyCount] = useState(null);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [loadingSuchna, setLoadingSuchna] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [LangLoading, setLangLoading] = useState(true);
  const [LangContext, setLangContext] = useState({
    theme: true,
    fontSize: 15,
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setLangLoading(true);
    async function fetchData() {
      // You can await here
      const response = await AsyncStorage.getItem("lang");
      console.log(response);
      if (response !== null && response === "mar") {
        setLangContext({ ...LangContext, theme: true });
        setLangLoading(false);
      } else if (response !== null && response === "eng") {
        setLangContext({ ...LangContext, theme: false });
        setLangLoading(false);
      }
      // ...
    }
    fetchData();
  }, []);

  useEffect(() => {
    OneSignal.setAppId(APP_ID);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.addTrigger("level", 5);
    OneSignal.addTrigger("location_prompt", "true");
    OneSignal.setLogLevel(6, 0);
    console.log("useEffect working..");
    OneSignal.setNotificationOpenedHandler((openedEvent) => {
      console.log("OneSignal: notification opened:", openedEvent);
      // const { action, notification } = openedEvent;
      let data = openedEvent.notification.additionalData;

      let screen = openedEvent.notification.title;
      if (screen === "Government Scheme Added") {
        let title = data.title;
        let desc = data.desc;
        let link = data.link;
        let timestamp = data.createdAt;
        navigation.navigate("GovtPlanDetailScreen", {
          title,
          desc,
          link,
          timestamp,
        });
      } else if (screen === "Notification Added") {
        let title = data.title;
        let desc = data.desc;
        let link = data.link;
        let timestamp = data.createdAt;
        navigation.navigate("InformationDetailScreen", {
          title,
          desc,
          link,
          timestamp,
        });
      } else if (screen === "Our Work Added") {
        let id = data.id;
        // let image = data.image;
        // let dateFormat = data.createdAt;
        navigation.navigate("GovtWorkDetailScreen", {
          id,
        });
      }
    });

    setLoadingGallery(true);
    setLoadingSuchna(true);
    // console.log("work");
    axios
      .get("suchana")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);

        // console.log(data);
      })
      .catch((err) => console.log(err));

    axios
      .get("mahiti")
      .then((res) => {
        // console.log(res.data);
        setInfo(res.data[0]);
        setLoadingSuchna(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    axios
      .get("images")
      .then((res) => {
        // console.log(res.data);
        setImages(res.data);
        setLoadingGallery(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    axios
      .get("news")
      .then((res) => {
        // console.log(res.data);
        setNewsImages(res.data);
        setLoadingGallery(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const openUrl = (link) => {
    // console.log("open");
    if (link === "facebook") Linking.openURL(`${info.facebook}`);
    else if (link === "instagram") Linking.openURL(`${info.instagram}`);
    else if (link === "mail") Linking.openURL(`mailto:${info.gmail}`);
    else if (link === "youtube") Linking.openURL(`${info.youtube}`);
    else if (link === "whatsapp")
      Linking.openURL(
        `https://api.whatsapp.com/send?phone=+91${info.whatsapp}`
      );
  };

  const shortTitle = (desc) => {
    let maxLength = 145;
    let shortTitle = desc.substr(0, maxLength);
    return shortTitle;
  };

  const shimmerEffect = () => {
    return (
      <SkeletonPlaceholder>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              width: 100,
              height: 90,
              borderRadius: 10,
              marginRight: 10,
            }}
          ></View>
          <View
            style={{
              width: 100,
              height: 90,
              borderRadius: 10,
              marginRight: 10,
            }}
          ></View>
          <View
            style={{
              width: 100,
              height: 90,
              borderRadius: 10,
              marginRight: 10,
            }}
          ></View>
          <View
            style={{
              width: 100,
              height: 90,
              borderRadius: 10,
              marginRight: 10,
            }}
          ></View>
        </View>
      </SkeletonPlaceholder>
    );
  };

  function Header() {
    return (
      <SafeAreaView style={{ backgroundColor: "white" }}>
        {/* dont use style: flex=1  */}
        <View style={styles.headerContent}>
          <TouchableOpacity>
            <Entypo
              name="menu"
              size={35}
              color="rgba(248, 110, 11, 0.79)"
              onPress={() => navigation.openDrawer()}
            />
          </TouchableOpacity>
          <View style={styles.headerMiddleBody}>
            <Text style={styles.text}>
              {LangContext.theme ? "अंबरनाथ कांबळे" : "Ambarnath Kamble"}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("NotificationSection")}
            >
              <Ionicons
                name="notifications"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("AboutUsScreen")}
            >
              <View
                style={{
                  borderWidth: 1,
                  width: 37,
                  height: 37,
                  borderRadius: 70,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 5,
                }}
              >
                <Image
                  source={require("../assets/Images/Person7.jpg")}
                  style={{ width: 32, height: 32, borderRadius: 60 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  function Gallery() {
    return (
      <View
        style={{
          marginHorizontal: 10,
          padding: 10,
          borderBottomColor: COLORS.lightGray,
          borderBottomWidth: 2,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: COLORS.darkgray,
                marginRight: 10,
              }}
            >
              {LangContext.theme ? "गॅलरी" : "Gallery"}
            </Text>
            <FontAwesome name="photo" size={18} color="grey" />
          </View>

          <Text
            style={{ fontWeight: "bold", fontSize: 15 }}
            onPress={() =>
              navigation.navigate("GallerySection", {
                images,
              })
            }
          >
            View all
          </Text>
        </View>
        {loadingGallery ? (
          shimmerEffect()
        ) : (
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("GallerySection", {
                    images,
                  })
                }
              >
                <Image
                  source={{ uri: `${item.filename}` }}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 90,
                    marginRight: 10,
                    borderRadius: 5,
                  }}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    );
  }

  // function News() {
  //   return (
  //     <View
  //       style={{
  //         marginHorizontal: 10,
  //         padding: 10,
  //         borderBottomColor: COLORS.lightGray,
  //         borderBottomWidth: 2,
  //         paddingBottom: 20,
  //       }}
  //     >
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           marginBottom: 10,
  //         }}
  //       >
  //         <View
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "center",
  //             marginBottom: 10,
  //           }}
  //         >
  //           <Text
  //             style={{
  //               fontWeight: "bold",
  //               fontSize: 20,
  //               color: COLORS.darkgray,
  //               marginRight: 10,
  //             }}
  //           >
  //             {LangContext.theme ? "बातम्या" : "News"}
  //           </Text>
  //           <FontAwesome name="photo" size={18} color="grey" />
  //         </View>

  //         <Text
  //           style={{ fontWeight: "bold", fontSize: 15 }}
  //           onPress={() =>
  //             navigation.navigate("GallerySection", {
  //               images,
  //             })
  //           }
  //         >
  //           View all
  //         </Text>
  //       </View>
  //       {loadingGallery ? (
  //         shimmerEffect()
  //       ) : (
  //         <FlatList
  //           data={newsImages}
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           renderItem={({ item }) => (
  //             <TouchableOpacity
  //               onPress={() =>
  //                 navigation.navigate("GallerySection", {
  //                   images,
  //                 })
  //               }
  //             >
  //               <Image
  //                 source={{ uri: `${item.filename}` }}
  //                 resizeMode="cover"
  //                 style={{
  //                   width: 100,
  //                   height: 90,
  //                   marginRight: 10,
  //                   borderRadius: 5,
  //                 }}
  //               />
  //             </TouchableOpacity>
  //           )}
  //           keyExtractor={(item) => item._id}
  //         />
  //       )}
  //     </View>
  //   );
  // }

  function CanvaIcon() {
    return (
      <View style={styles.CanvaIcons}>
        <View style={{ ...styles.CanvaIconsSection, marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("GovernmentPlan")}
          >
            <View style={styles.icons}>
              <Image
                source={require("../assets/Images/yojanaIcon.png")}
                resizeMode="center"
                style={{ marginBottom: 5, width: 45, height: 45 }}
              />
              <Text style={styles.iconsText}>
                {LangContext.theme ? "शासकीय" : "Government"}
              </Text>
              <Text style={styles.iconsText}>
                {LangContext.theme ? "योजना" : "Scheme"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("FeedbackScreen")}
          >
            <View
              style={{
                ...styles.icons,
                flex: 1,
                paddingLeft: 0,
                marginRight: LangContext.theme ? 10 : 10,
              }}
            >
              <MaterialCommunityIcons
                name="message-draw"
                size={32}
                color="#eb1515"
                style={{ marginBottom: 15, marginLeft: 5 }}
              />
              <View
                style={{
                  borderWidth: 0,
                  flexDirection: LangContext.theme ? "row" : null,
                  marginRight: 5,
                }}
              >
                <Text style={{ ...styles.iconsText, marginRight: 0 }}>
                  {LangContext.theme ? "तक्रार /" : "Complaint /"}
                </Text>
                <Text
                  style={{ ...styles.iconsText, marginRight: 2, marginLeft: 2 }}
                >
                  {LangContext.theme ? "प्रस्ताव" : "Proposal"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("GovernmentWorkScreen")}
          >
            <View style={{ ...styles.icons, paddingHorizontal: 0 }}>
              <Image
                source={require("../assets/Images/AamcheKaryaIcon.png")}
                resizeMode="center"
                style={{ marginBottom: 5, width: 45, height: 45 }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={styles.iconsText}>
                  {LangContext.theme ? "आमचे" : "Our Work"}
                </Text>
                {LangContext.theme ? (
                  <Text style={styles.iconsText}>कार्य</Text>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: SIZES.padding / 2,
            marginTop: 20,
            // borderWidth: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("NewsPhotos")}>
            <View
              style={{
                ...styles.icons,
                paddingHorizontal: 15,
                marginRight: 10,
                paddingRight: LangContext.theme ? 0 : 30,
                // borderWidth:1
              }}
            >
              <FontAwesome
                name="newspaper-o"
                size={32}
                color="#15C012"
                style={{ marginBottom: 5, marginLeft: 12 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: 10,
                }}
              >
                <Text style={{ ...styles.iconsText, marginHorizontal: 4 }}>
                  {LangContext.theme ? "बातम्या" : "News"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("InformationScreen")}
          >
            <View
              style={{
                width: 100,
                height: 70,
                borderRadius: SIZES.padding,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: LangContext.theme ? 30 : 0,
                paddingRight: LangContext.theme ? 0 : 30,
              }}
            >
              <MaterialIcons
                name="notifications-active"
                size={32}
                color="#264FB7"
                style={{ marginBottom: 5 }}
              />
              <View style={{ borderWidth: 0, width: 150, marginTop: 5 }}>
                <Text style={{ ...styles.iconsText, fontSize: 16 }}>
                  {LangContext.theme ? "नागरिकांसाठी" : "Information"}
                </Text>
                <Text style={{ ...styles.iconsText, fontSize: 16 }}>
                  {LangContext.theme ? "सूचना" : "for citizens"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ComplaintScreen")}
          >
            <View
              style={{
                width: 100,
                height: 70,
                borderRadius: SIZES.padding,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: LangContext.theme ? 30 : 0,
                paddingRight: LangContext.theme ? 0 : 30,
              }}
            >
              <MaterialCommunityIcons
                name="message-draw"
                size={32}
                color="#15C012"
                style={{ marginLeft: 5 }}
              />
              <View style={{ borderWidth: 0, width: 150, marginTop: 5 }}>
                <Text style={{ ...styles.iconsText, fontSize: 16 }}>
                  {LangContext.theme ? "तक्रार" : "Complaints"}
                </Text>
                <Text style={{ ...styles.iconsText, fontSize: 16 }}>
                  {LangContext.theme ? "निवारण" : "Solved"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            margin: SIZES.padding / 2,
            marginTop: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ContactScreen")}
          >
            <View
              style={{
                ...styles.icons,
                paddingHorizontal: 15,
                marginRight: 10,
                paddingRight: LangContext.theme ? 0 : 30,
                // borderWidth:1
              }}
            >
              <Ionicons
                name="call"
                size={30}
                color="#15C012"
                style={{ marginBottom: 5, marginLeft: 12 }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: 10,
                }}
              >
                <Text style={{ ...styles.iconsText, marginHorizontal: 4 }}>
                  {LangContext.theme ? "थेट" : "Contact"}
                </Text>
                <Text style={{ ...styles.iconsText, marginHorizontal: 0 }}>
                  {LangContext.theme ? "संपर्क" : "Us"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("JobScreen")}>
            <View
              style={{
                ...styles.icons,
                marginRight: 10,
              }}
            >
              <Image
                source={require("../assets/Images/job.png")}
                resizeMode="center"
                style={{ marginBottom: 5, width: 28, height: 28 }}
              />
              <Text
                style={{
                  ...styles.iconsText,
                  // paddingHorizontal: "auto",
                  width: "100%",
                  // borderWidth:1,
                  fontSize: 15,
                  textAlign: "center",
                  paddingHorizontal: 2,
                }}
              >
                {LangContext.theme ? "नोकरीच्या" : "Jobs"}
              </Text>
              {LangContext.theme ? (
                <Text
                  style={{
                    ...styles.iconsText,
                    fontSize: 15,
                    paddingHorizontal: "auto",
                  }}
                >
                  संधी
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AboutUsScreen")}
          >
            <View
              style={{
                ...styles.icons,
                marginRight: 10,
              }}
            >
              <Ionicons
                name="person"
                size={25}
                color="#DE1E91"
                style={{ marginBottom: 5 }}
              />
              <Text
                style={{
                  ...styles.iconsText,
                  // paddingHorizontal: "auto",
                  width: "100%",
                  // borderWidth:1,
                  fontSize: 15,
                  textAlign: "center",
                  paddingHorizontal: 2,
                }}
              >
                {LangContext.theme ? "आमच्याबद्दल" : "About Us"}
              </Text>
              {LangContext.theme ? (
                <Text
                  style={{
                    ...styles.iconsText,
                    fontSize: 15,
                    paddingHorizontal: "auto",
                  }}
                >
                  माहिती
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderDate = (dateFormat) => {
    let data = dateFormat.split("-");
    // 2021-0-21
    let yy = data[0];
    let dd = data[2];
    let mm = data[1];
    return `${dd}/${mm}/${yy}`;
  };

  function CarouselContainer() {
    return (
      <View style={styles.CarouselContain}>
        <View
          style={{
            marginLeft: 10,
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: COLORS.darkgray,
            }}
          >
            {LangContext.theme ? "नागरिकांसाठी सूचना" : "Notification"}
          </Text>
          <MaterialIcons
            name="notifications-active"
            size={20}
            color="grey"
            style={{ marginLeft: 10 }}
          />
        </View>
        {loadingSuchna ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <ScrollView style={{ backgroundColor: "white", marginRight: 10 }}>
            <Swiper
              autoplay
              // horizontal={false}
              // showsVerticalScrollIndicator={true}
              alwaysBounceVertical
              height={200}
              autoplayTimeout={3}
              activeDotColor="#FF6347"
            >
              {data.map((item) => {
                return (
                  <View key={item._id} style={{ height: 150 }}>
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate("InformationScreen")}
                      style={styles.CarouselBody}
                    >
                      <LinearGradient
                        // Button Linear Gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        locations={[0.0, 0.5, 0.99]}
                        colors={["#EB361E", "#F59815", "#EEE50E"]}
                        style={{
                          flexDirection: "row",
                          height: "100%",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          borderRadius: SIZES.padding,
                          paddingHorizontal: 10,
                          // borderWidth:1
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            paddingRight: 10,
                            marginVertical: 10,
                            // borderWidth:1
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginBottom: 10,
                            }}
                          >
                            <Text style={styles.CarouselBodyTextHeader}>
                              {item.title}
                            </Text>
                            {/* <Text style={{ color: "white", fontSize: 16 }}>
                              {renderDate(item.createdAt.split("T")[0])}
                            </Text> */}
                          </View>
                          <Text style={styles.CarouselBodyText}>
                            {shortTitle(item.desc)}.....
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableWithoutFeedback>
                  </View>
                );
              })}
            </Swiper>
          </ScrollView>
        )}
      </View>
    );
  }

  function Footer() {
    return (
      <View
        style={{
          backgroundColor: "rgb(248,248,255)",
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        {/* dont use style: flex=1  */}
        <View
          style={{
            borderWidth: 0,
            flexDirection: "row",
            justifyContent: "space-around",
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
          <TouchableOpacity onPress={() => openUrl("youtube")}>
            <Image
              source={require("../assets/Images/youtube.png")}
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
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {LangLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          {Header()}
          <ScrollView>
            {CanvaIcon()}
            {Gallery()}
            {/* {News()} */}
            {CarouselContainer()}
          </ScrollView>
          {Footer()}
        </>
      )}
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
    paddingVertical: 15,
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
  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
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
  ImageSection: {
    // borderRadius:50,
    // borderWidth:1,
    marginHorizontal: 10,
  },
  CanvaIcons: {
    // borderWidth: 1,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 2,
    marginVertical: 10,
    paddingBottom: 15,
    marginHorizontal: 10,
  },
  CanvaIconsSection: {
    flexDirection: "row",
    margin: SIZES.padding / 2,
    marginTop: 20,
    // borderWidth: 1,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: "green",
  },
  icons: {
    // borderWidth: 1,
    // margin: SIZES.padding/2,
    marginHorizontal: SIZES.padding - 4,
    // width: 80,
    // height: 70,
    borderRadius: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
  iconsText: {
    fontSize: 17,
    // fontWeight: "bold",
    marginHorizontal: 10,
    color: COLORS.black,
    // borderWidth: 1,
    alignSelf: "center",
    // width:"100%",
    // padding:"auto"
  },
  CarouselContain: {
    // flex: 1,
    // height:"100%",
    // borderWidth: 1,
    // backgroundColor:"pink",
    marginBottom: 30,
    marginLeft: 10,
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  CarouselBody: {
    // borderWidth: 1,
    // borderColor:"red",
    // margin: 5,
    // height:50,
    // flex: 1,
    // flexDirection: "row",
    width: SIZES.width - 40,
    alignItems: "center",
    margin: 10,
    borderRadius: SIZES.padding,
    // minHeight: 70,
    // padding: SIZES.padding,
    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 1,
    elevation: 3,
  },
  CarouselBodyTextHeader: {
    fontSize: SIZES.h4,
    fontWeight: "bold",
    color: "white",
    justifyContent: "space-between",
  },
  CarouselBodyText: {
    fontSize: SIZES.body4,
    color: "white",
    // fontWeight: "bold",
  },
});

export default HomeScreen;
