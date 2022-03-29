import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Activity from "../../models/activity/Activity";
import { State } from "../../services/store/store";
import { SET_ACTIVITIES_FILTERS } from "../../services/actions";
import styles from "./activity-list.styles";

function ActivityList() {
  const dispatch = useDispatch();

  const { loading, hasError, data } = useSelector(
    (store: State) => store.activities.activities
  );

  const range = useSelector((store: State) => store.activities.filters);

  const filteredActivities = useMemo(
    () =>
      data.filter((activity) => {
        const date = new Date(activity.createdDate);
        return (
          (!range.startDate || date >= range.startDate) &&
          (!range.endDate || date <= range.endDate)
        );
      }),
    [data, range]
  );

  // const handleSelect = () => {
  //   dispatch({
  //     type: SET_ACTIVITIES_FILTERS,
  //     payload: ,
  //   });
  // }

  const renderItem = ({ item }: { item: Activity }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.createdDate}</Text>
        </View>
        <Text style={styles.time}>{item.duration}</Text>
        <Text style={styles.distance}>{item.distance} km.</Text>
        <Text style={styles.distance}>{item.calories} calories</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Text style={styles.delete}>Удалить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSeparator = () => <View style={styles.separator}></View>;

  const keyExtractor = (item: Activity) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Последние тренировки:</Text>
      <FlatList
        data={filteredActivities}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

export default ActivityList;
