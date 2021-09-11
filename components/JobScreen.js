import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import JobCard from "./JobCard";
import axios from "axios";

const JobScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("jobs")
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
            <JobCard
              id={item._id}
              title={item.title}
              posts={item.posts}
              salary={item.salary}
              place={item.place}
              desc={item.desc}
              link={item.link}
              timestamp={item.createdAt}
            />
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
};

export default JobScreen;
