import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Activity from "../../models/activity/Activity";
import { State } from "../../services/store/store";
import { SET_ACTIVITIES_FILTERS } from "../../services/actions";
import { GREY_COLOR, ROYAL_BLUE_COLOR } from '../../utils/colors';
import { createdDateTimeFormat, durationTimeFormat } from "../../utils/constants";
import styles from "./activity-list.styles";

function ActivityList() {
  const dispatch = useDispatch();

  const { loading, hasError, data } = useSelector((store: State) => store.activities.activities);

  const range = useSelector((store: State) => store.activities.filters);

  const filteredActivities = useMemo(
    () =>
      data.filter(
        (activity) =>
          (!range.startDate || activity.createdDate >= range.startDate) &&
          (!range.endDate || activity.createdDate <= range.endDate)
      ),
    [data, range]
  );

  // const handleSelect = () => {
  //   dispatch({
  //     type: SET_ACTIVITIES_FILTERS,
  //     payload: ,
  //   });
  // }

  const renderItem = ({ item }: { item: Activity }) => {
    const { name, createdDate, duration, distance, calories } = item;
    const formatedCreatedDate = createdDate.toLocaleString("Ru-ru", createdDateTimeFormat);
    const formatedDuration = new Date(duration).toLocaleString("Ru-ru", durationTimeFormat);

    return (
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.rowContainer}>
              <FontAwesome5 
                name="calendar-check" 
                size={16} 
                color={GREY_COLOR} 
                style={styles.icon}
              />
              <Text style={styles.date}>{formatedCreatedDate}</Text>
            </View>
        </View>
        <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
            <FontAwesome5 
              name="stopwatch" 
              size={18} 
              color={ROYAL_BLUE_COLOR}
              style={styles.icon} 
            />
            <Text style={styles.infoElement}>{formatedDuration}</Text>
        </View>
        <View style={styles.rowContainer}>
            <FontAwesome5 
              name="map-marker-alt" 
              size={18} 
              color={ROYAL_BLUE_COLOR}
              style={styles.icon} 
            />
            <Text style={styles.infoElement}>{distance} km</Text>
          </View>
          <View style={styles.rowContainer}>
            <FontAwesome5 
              name="briefcase-medical" 
              size={18} 
              color={ROYAL_BLUE_COLOR}
              style={styles.icon} 
            />
            <Text style={styles.infoElement}>{calories} calories</Text>
            </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Text style={styles.delete}>Удалить</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderSeparator = () => <View style={styles.separator}></View>;

  const keyExtractor = (item: Activity) => item.id;

  return (
    <View style={styles.container}>
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
