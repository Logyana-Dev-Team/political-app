import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZES } from "../constants/theme";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { WebView } from "react-native-webview";

const GovtWorkDetailScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    desc: "",
    link: "",
    video: "",
    images: [],
    createdAt: "",
  });

  const splitLink = (link) => {
    // console.log(link);
    let yt_link = link.split("=")[1];
    return yt_link;
  };

  const changeFormat = (date) => {
    let ddmmyy = date.split("T")[0];
    let dateFormat = ddmmyy.split("-");
    let yy = dateFormat[0];
    let dd = dateFormat[2];
    let mm = dateFormat[1];
    return `${dd}/${mm}/${yy}`;
  };

  if (route.params.id) {
    setLoading(true);
    axios
      .get(`karya/${route.params.id}`)
      .then((res) => {
        // console.log(res.data);
        setData({
          title: res.data.title,
          desc: res.data.title,
          link: res.data.link,
          images: res.data.images,
          video: res.data.videolink,
          createdAt: res.data.createdAt,
        });
        setLoading(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    return loading ? (
      <ActivityIndicator size="large" color="black" />
    ) : (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            //   borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <View
            style={{
              padding: SIZES.padding * 0.5,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {data.title}
            </Text>
          </View>
          <View
            style={{
              padding: SIZES.padding * 0.5,
              textAlign: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {/* <Text style={{ fontSize: 15 }}>{changeFormat(data.createdAt)}</Text> */}
          </View>
          {data.video !== "" && (
            <View>
              <View style={styles.upperBody}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={data.images}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        marginHorizontal: 10,
                        // paddingVertical:10,
                        shadowColor: "black",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                        // elevation: 1,
                        borderWidth: 0.2,
                      }}
                    >
                      <Image
                        source={{
                          uri: `${item.filename}`,
                        }}
                        resizeMode="stretch"
                        style={{
                          height: "100%",
                          width: SIZES.width - 80,
                        }}
                      />
                    </View>
                  )}
                  keyExtractor={(item) => item._id}
                />
              </View>
              <View style={styles.upperBody}>
                <View
                  style={{
                    width: SIZES.width - 70,
                    height: 250,
                    marginBottom: 10,
                    marginTop: 50,
                  }}
                  // key={item._id}
                >
                  <WebView
                    style={{ backgroundColor: "red", opacity: 0.99 }}
                    source={{
                      html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${splitLink(
                        data.video
                      )}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
                    }}
                  />
                </View>
              </View>
            </View>
          )}
          {data.video === "" && (
            <View style={styles.upperBody}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data.images}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginHorizontal: 10,
                      // paddingVertical:10,
                      shadowColor: "black",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 1,
                      // elevation: 1,
                      borderWidth: 0.2,
                    }}
                  >
                    <Image
                      source={{
                        uri: `${item.filename}`,
                      }}
                      resizeMode="stretch"
                      style={{
                        height: "100%",
                        width: SIZES.width - 80,
                      }}
                    />
                  </View>
                )}
                keyExtractor={(item) => item._id}
              />
            </View>
          )}
          <View style={{ padding: SIZES.padding * 1.5, marginTop: 20 }}>
            <Text style={{ fontSize: 16, letterSpacing: 2 }}>{data.desc}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    const news = route.params.image;
    let dateFormat = route.params.dateFormat;
    let yy = dateFormat[0];
    let dd = dateFormat[2];
    let mm = dateFormat[1];

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            //   borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: SIZES.padding,
          }}
        >
          <View
            style={{
              padding: SIZES.padding * 0.5,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {route.params.title}
            </Text>
          </View>
          <View
            style={{
              padding: SIZES.padding * 0.5,
              textAlign: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            {/* <Text style={{ fontSize: 15 }}>{`${dd}/${mm}/${yy}`}</Text> */}
          </View>

          {route.params.video !== "" && (
            <View>
              <View style={styles.upperBody}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={news}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        marginHorizontal: 10,
                        // paddingVertical:10,
                        shadowColor: "black",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.5,
                        shadowRadius: 1,
                        // elevation: 1,
                        borderWidth: 0.2,
                      }}
                    >
                      <Image
                        source={{ uri: `${item.filename}` }}
                        resizeMode="stretch"
                        style={{
                          height: "100%",
                          width: SIZES.width - 80,
                        }}
                      />
                    </View>
                  )}
                  keyExtractor={(item) => item._id}
                />
              </View>
              <View style={styles.upperBody}>
                <View
                  style={{
                    width: SIZES.width - 20,
                    height: 270,
                    marginVertical: 10,
                    marginTop: 40,
                  }}
                  // key={item._id}
                >
                  <WebView
                    style={{ backgroundColor: "white", opacity: 0.99 }}
                    source={{
                      html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${splitLink(
                        route.params.video
                      )}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
                    }}
                  />
                </View>
              </View>
            </View>
          )}
          {route.params.video === "" && (
            <View style={styles.upperBody}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={news}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginHorizontal: 10,
                      // paddingVertical:10,
                      shadowColor: "black",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.5,
                      shadowRadius: 1,
                      // elevation: 1,
                      borderWidth: 0.2,
                    }}
                  >
                    <Image
                      source={{ uri: `${item.filename}` }}
                      resizeMode="stretch"
                      style={{
                        height: "100%",
                        width: SIZES.width - 80,
                      }}
                    />
                  </View>
                )}
                keyExtractor={(item) => item._id}
              />
            </View>
          )}
          <View style={{ padding: SIZES.padding * 1.5, marginTop: 30 }}>
            <Text style={{ fontSize: 16, letterSpacing: 2 }}>
              {route.params.desc}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  Card: {
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.padding,
    marginHorizontal: SIZES.padding * 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 1,
    // use to lift component.. it create shadow on touchable icons
    borderRadius: 10,
  },
  upperBody: {
    width: "100%",
    height: SIZES.height * 0.25,
    backgroundColor: "white",
    paddingVertical: 10,
    // padding: 5,
    // borderWidth: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  upperBodyImage: {
    height: 140,
    width: "80%",
    //   borderRadius: 10,
    //   borderBottomLeftRadius:0,
    //   borderBottomRightRadius:0
  },
  lowerBody: {
    // borderWidth: 1,
    width: "100%",
    padding: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerBodyTitle: { fontSize: 22, marginVertical: 5, fontWeight: "bold" },
  lowerBodyDetail: { marginVertical: 5, textAlign: "center", fontSize: 18 },
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
    paddingVertical: 5,
  },
});

export default GovtWorkDetailScreen;
