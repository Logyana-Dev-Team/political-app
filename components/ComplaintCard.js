import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

const ComplaintCard = ({
  type,
  name,
  id,
  complaint,
  images,
  desc,
  timestamp,
}) => {
  const [LangContext, setLangContext] = useState({
    theme: true,
    fontSize: 15,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await AsyncStorage.getItem("lang");
      if (response !== null && response === "mar") {
        setLangContext({ ...LangContext, theme: true });
      } else if (response !== null && response === "eng") {
        setLangContext({ ...LangContext, theme: false });
      }
    }
    fetchData();
  }, []);
  let data = timestamp.split("T")[0];
  let dateFormat = data.split("-");
  const navigation = useNavigation();
  return (
    <View style={styles.Card}>
      <View style={styles.upperBody}>
        <Image
          source={{ uri: `${images[0].filename}` }}
          resizeMode="contain"
          style={styles.upperBodyImage}
        />
      </View>
      <View style={styles.lowerBody}>
        <View style={styles.rowContainer}>
          <Text style={styles.lowerBodyText}>
            {LangContext.theme ? "तक्रारीचा प्रकार: " : "Complaint Type"}
          </Text>
          <Text style={styles.lowerBodyDetail}>{type}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.lowerBodyText}>
            {LangContext.theme ? "तक्रारकर्ता: " : "Complaint By"}
          </Text>
          <Text style={styles.lowerBodyDetail}>{name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.lowerBodyText}>
            {LangContext.theme ? "तक्रार: " : "Complaint By"}
          </Text>
          <Text style={styles.lowerBodyDetail}>{complaint}</Text>
        </View>
        <View style={styles.solutionText}>
          <Text style={styles.upperBodyText}>
            {LangContext.theme ? "निवारण" : "Solution"}
          </Text>
          <Text style={styles.descText}>{desc}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Card: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.padding,
    marginHorizontal: SIZES.padding * 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.darkgray,
  },
  upperBody: {
    width: "100%",
    height: 200,
    padding: 5,
  },
  upperBodyImage: {
    height: 200,
    width: "100%",
    borderRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  upperBodyText: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  lowerBody: {
    padding: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  rowContainer: {
    flexDirection: "row",
    height: 45,
    color: "#fff",
    borderBottomColor: "#80838a",
    borderBottomWidth: 1,
    width: 300,
  },
  lowerBodyTitle: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: "bold",
    color: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  lowerBodyDetail: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 15,
    marginVertical: 5,
    color: "#000",
  },
  lowerBodyButton: {
    width: 100,
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerBodyText: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 15,
    marginVertical: 5,
    fontWeight: "bold",
    color: "black",
  },
  solutionText: {
    marginVertical: 10,
  },
  descText: {
    textAlign: "center",
    fontSize: 17,
    paddingHorizontal: 15,
    marginVertical: 5,
    color: "#000",
  },
});

export default ComplaintCard;
