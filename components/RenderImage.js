import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import { SIZES } from "../constants/theme";
import { Entypo } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImageZoom from "react-native-image-pan-zoom";
import { Dimensions } from "react-native";

const RenderImage = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", borderWidth: 0,justifyContent: "flex-start"}}>
      {/* <Text>abc</Text> */}

      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> */}

      <ImageZoom
        cropWidth={Dimensions.get("window").width}
        cropHeight={route.params.screen === 'newsScreen' ? Dimensions.get("window").height+100 : Dimensions.get("window").height}
        imageWidth={Dimensions.get("window").width}
        imageHeight={Dimensions.get("window").height-(Dimensions.get("window").height/4)}
      >
        <Image
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").width,
          //   justifyContent: "center",
          // alignItems: "center",
          // alignSelf:"center"
          }}
          resizeMode="contain"
          source={{ uri: `${route.params.items}` }}
        />
      </ImageZoom>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default RenderImage;

const styles = StyleSheet.create({});
