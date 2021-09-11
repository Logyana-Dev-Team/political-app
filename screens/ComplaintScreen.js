import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import ComplaintCard from "../components/ComplaintCard";
import axios from "axios";

const ComplaintScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("work");
    axios
      .get("nivaran")
      .then((res) => {
        setData(res.data);
        setLoading(false);
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
            <ComplaintCard
              id={item._id}
              type={item.type}
              name={item.name}
              complaint={item.complaint}
              images={item.images}
              desc={item.desc}
              timestamp={item.createdAt}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
};

export default ComplaintScreen;
