import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "./activity-list.styles";

const workoutsActivities = [
  { id: 1, name: "Running", time: "48:50", distance: 12, date: "23.02.2022" },
  { id: 2, name: "Running", time: "48:50", distance: 24, date: "23.02.2022" },
  { id: 3, name: "Running", time: "48:50", distance: 10, date: "23.02.2022" },
];

function ActivityList() {
  const renderItem = ({ item }) => {
    return (
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
  };

  const renderSeparator = () => {
    return (<View style={styles.separator}></View>);
  };

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
