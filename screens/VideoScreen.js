import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SIZES } from "../constants/theme";
import { WebView } from "react-native-webview";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const VideoScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log("work");
    axios
      .get("/videos")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);

        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const splitLink = (link) => {
    // console.log(link);
    let yt_link = link.split("=")[1];
    return yt_link;
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 5,
      }}
    >
      <ScrollView>
        {data.map((item) => {
          return (
            <View
              style={{ width: SIZES.width - 20, height: 250, marginBottom: 10 }}
              key={item._id}
            >
              <WebView
                style={{ backgroundColor: "white" }}
                source={{
                  html: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${splitLink(
                    item.link
                  )}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
