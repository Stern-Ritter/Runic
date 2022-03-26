import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { store, auth } from "../models/storage";
import { collectionName } from "../utils/api";
import styles from "./activity-list.styles";

function ActivityList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const ref = collection(store, collectionName);
    getDocs(ref).then((querySnapshot) => {
      querySnapshot.forEach((document) => console.log(document.data()));
    });
  }, []);

  const workoutsActivities = [];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.distance}>{item.distance} km.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.delete}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator}></View>;

  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Последние тренировки:</Text>
      <FlatList
        data={workoutsActivities}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

export default ActivityList;
