import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import GovtWorkCard from "../components/GovtWorkCard";
import axios from "axios";

const GovernmentWorkScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("work");
    axios
      .get("karya")
      .then((res) => {
        // console.log(res.data[0]);
        setData(res.data);
        setLoading(false);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <SafeAreaView
      style={{ paddingHorizontal: 10, backgroundColor: "white", flex: 1 }}
    >
      {loading ? (
        <ActivityIndicator color="black" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <GovtWorkCard
              id={item._id}
              title={item.title}
              desc={item.desc}
              image={item.images}
              video={item.videolink}
              timestamp={item.createdAt}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
};

export default GovernmentWorkScreen;
