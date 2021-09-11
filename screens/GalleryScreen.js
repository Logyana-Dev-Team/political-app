import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GalleryPhotos from "../components/GalleryPhotos";
import RenderImage from "../components/RenderImage";

const Gallery = createStackNavigator();

const GalleryScreen = ({ navigation, images }) => {
    return (
      <Gallery.Navigator initialRouteName="GalleryPhotos">
        <Gallery.Screen
          name="GalleryPhotos"
          component={GalleryPhotos}
          options={{
            headerShown: false,
            
          }}
          navigation={navigation}
        />
        <Gallery.Screen
          name="RenderImage"
          component={RenderImage}
          options={{
            headerShown: false,
          }}
        />
      </Gallery.Navigator>
    );
};

export default GalleryScreen;