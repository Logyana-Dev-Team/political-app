import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { APP_ID, LIMIT, REST_API_KEY } from "../App";

const NotificationScreen = ({ navigation }) => {
  const [notifyCount, setnotifyCount] = useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://onesignal.com/api/v1/notifications?app_id=${APP_ID}&limit=${LIMIT}`,
        {
          headers: {
            Authorization: `Basic ${REST_API_KEY}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data.total_count);
        setnotifyCount(res.data.total_count);
        setData(res.data.notifications);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const timeStampFunction = (createdTime) => {
    let data = createdTime.split("T")[0];
    let dateFormat = data.split("-");
    // 2021-0-21
    let yy = dateFormat[0];
    let dd = dateFormat[2];
    let mm = dateFormat[1];
    return `${dd}/${mm}/${yy}`;
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {!isLoading > 0 ? (
        <>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.data.id}
                style={{
                  // borderWidth: 1,
                  padding: 10,
                  marginBottom: 10,
                  flexDirection: "row",
                  borderBottomColor: COLORS.darkgray,
                  borderBottomWidth: 1,
                  marginHorizontal: 10,
                  borderRadius: 5,
                  marginTop: 10,
                  justifyContent: "space-between",
                }}
                onPress={() =>
                  navigation.navigate(
                    item.headings.en === "Government Scheme Added"
                      ? "GovtPlanDetailScreen"
                      : item.headings.en === "Notification Added"
                      ? "InformationDetailScreen"
                      : "GovernmentWorkScreen",
                    {
                      id:
                        item.headings.en === "Our Work Added"
                          ? item.data.id
                          : item.data._id,
                      title: item.data.title,
                      desc: item.data.desc,
                      link: item.data.link,
                      timestamp: item.data.createdAt,
                    }
                  )
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      borderWidth: 1,
                      marginRight: 10,
                      width: 50,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 25,
                      padding: 5,
                      borderColor: COLORS.darkgray,
                    }}
                  >
                    {item.headings.en === "Notification Added" ? (
                      <MaterialIcons
                        name="notifications-active"
                        size={28}
                        color={COLORS.success}
                        style={{ marginBottom: 5 }}
                      />
                    ) : item.headings.en === "Our Work Added" ? (
                      <Image
                        source={require("../assets/Images/AamcheKaryaIcon.png")}
                        resizeMode="center"
                        style={{ marginBottom: 5, width: 40, height: 40 }}
                      />
                    ) : (
                      <Image
                        source={require("../assets/Images/yojanaIcon.png")}
                        resizeMode="center"
                        style={{ marginBottom: 5, width: 40, height: 40 }}
                      />
                    )}
                  </View>
                  <View>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.headings.en}
                    </Text>
                    <Text>{item.data.title}</Text>
                  </View>
                </View>
                <View>
                  <Text>{timeStampFunction(item.data.createdAt)}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.data._id}
          />
        </>
      ) : (
        <View style={{ marginTop: 30 }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});

// import React from 'react'
// import { View, Text } from 'react-native'

// const NotificationScreen = () => {
//   return (
//     <View>
//       <Text>NotificationScreen</Text>
//     </View>
//   )
// }

// export default NotificationScreen
