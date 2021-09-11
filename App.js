import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DrawerNavigator from "./components/DrawerNavigator";
import { enableScreens } from "react-native-screens";
import { View, ActivityIndicator, Text, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
enableScreens();
import axios from "axios";
import { RootStackScreen } from "./screens";
import { AuthContext } from "./components/context";
import AsyncStorage from "@react-native-community/async-storage";

axios.defaults.baseURL = "https://political-backend-dashboard.herokuapp.com/";

export const APP_ID = "f9e4f1cd-7b3b-4b11-889f-f56f662a90dc";
export const REST_API_KEY = "MjY2M2Y0NTgtZTU2Ni00MGQ0LWIwODUtMzU4ZWMzYzk4YzBi";
export const LIMIT = "10";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        setUserToken("NewSecretToken3");
        // await AsyncStorage.setItem('token',"secretToken")
        setIsLoading(false);
      },
      signOut: async () => {
        setUserToken(null);
        await AsyncStorage.clear();
        setIsLoading(false);
      },
      signUp: async () => {
        // setUserToken("NewSecretToken3");
        // await AsyncStorage.setItem('token',"secretToken")
        setIsLoading(false);
      },
      toggleEng: () => {
        // console.log("app lang: eng asaila pahije");
        setIsLoading(true);
        setTimeout(async () => {
          await AsyncStorage.setItem("lang", "eng");
          setIsLoading(false);
        }, 10);
        // ReloadScreen();
      },
      toggleMar: () => {
        // console.log("app lang: mar asaila pahije");
        setIsLoading(true);
        setTimeout(async () => {
          await AsyncStorage.setItem("lang", "mar");
          setIsLoading(false);
        }, 10);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("token");
      if (token === "NewSecretToken3") {
        setUserToken("NewSecretToken3");
      }
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          color: "red",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./assets/Images/ambarnath.png")}
          resizeMode="contain"
          style={{
            flex: 1,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="#a1a1a1"
            translucent={false}
          />
          {userToken === "NewSecretToken3" ? (
            <DrawerNavigator />
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
export default App;
