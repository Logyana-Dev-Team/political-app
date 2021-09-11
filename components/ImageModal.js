import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { Entypo } from "react-native-vector-icons";

const ImageModal = () => {
  return (
    <View style={{ backgroundColor:"red",height:100,width:100,backgroundColor:"transparent" }}>
      {/* <Modal> */}
        <View >
          <Entypo name="cross" color="white" size={35}/>
          <Text>Image Asel</Text>
        </View>
      {/* </Modal> */}
    </View>
  );
};

export default ImageModal;

const styles = StyleSheet.create({});
