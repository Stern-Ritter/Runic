import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import Activity from "../../models/activity/Activity";
import { State } from "../../services/store/store";
import { deleteActivity, SET_ACTIVITIES_FILTERS } from "../../services/actions";
import { GREY_COLOR, ROYAL_BLUE_COLOR } from "../../utils/colors";
import {
  filterDateTimeFormat,
  createdDateTimeFormat,
} from "../../utils/constants";
import formatTime from "../../utils/formatTime";
import { auth } from "../../models/storage";
import styles from "./activity-list.styles";

function ActivityList() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const { loading, hasError, data } = useSelector(
    (store: State) => store.activities.activities
  );

  const range = useSelector((store: State) => store.activities.filters);

  const formatedStartDate = range.startDate.toLocaleString(
    "Ru-ru",
    filterDateTimeFormat
  );
  const formatedEndDate = range.endDate.toLocaleString(
    "Ru-ru",
    filterDateTimeFormat
  );

  const filteredActivities = useMemo(
    () =>
      data
        .filter((activity) => {
          const comparedDate = new Date(
            activity.createdDate.getFullYear(),
            activity.createdDate.getMonth(),
            activity.createdDate.getDate()
          );
          return (
            (!range.startDate || comparedDate >= range.startDate) &&
            (!range.endDate || comparedDate <= range.endDate)
          );
        })
        .sort((f, s) => s.createdDate.getTime() - f.createdDate.getTime()),
    [data, range]
  );

  const deleteHandler = (id: string) => {
    if (user?.uid) {
      dispatch(deleteActivity(user.uid, id));
    }
  };

  const confirmeDelete = (id: string) =>
    Alert.alert("Подтверждение", "Вы хотите удалить эту тренировку?", [
      {
        text: "Да",
        onPress: () => deleteHandler(id),
      },
      {
        text: "Нет",
      },
    ]);

  const showStartDatePicker = () => {
    setOpenStartDatePicker(true);
  };
  const hideStartDatePicker = () => {
    setOpenStartDatePicker(false);
  };
  const showEndDatePicker = () => {
    setOpenEndDatePicker(true);
  };
  const hideEndDatePicker = () => {
    setOpenEndDatePicker(false);
  };
  const handleConfirmStartDatePicker = (date: Date) => {
    dispatch({
      type: SET_ACTIVITIES_FILTERS,
      payload: { startDate: date },
    });
    hideStartDatePicker();
  };
  const handleConfirmEndDatePicker = (date: Date) => {
    dispatch({
      type: SET_ACTIVITIES_FILTERS,
      payload: { endDate: date },
    });
    hideEndDatePicker();
  };

  const renderItem = ({ item }: { item: Activity }) => {
    const { name, createdDate, duration, distance, calories } = item;
    const formatedCreatedDate = createdDate.toLocaleString(
      "Ru-ru",
      createdDateTimeFormat
    );
    const formatedDuration = formatTime(duration);

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
              name="burn"
              size={18}
              color={ROYAL_BLUE_COLOR}
              style={styles.icon}
            />
            <Text style={styles.infoElement}>{calories} calories</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => confirmeDelete(item.id)}>
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
      <View style={styles.filterContainer}>
        <View>
          <View style={styles.filterTextContainer}>
            <FontAwesome5
              name="calendar-check"
              size={22}
              color={ROYAL_BLUE_COLOR}
            />
            <Text style={styles.filterText}>{formatedStartDate}</Text>
          </View>
          <Button title="Выбрать дату" onPress={showStartDatePicker} />
        </View>
        <Text style={styles.filterDelimiter}>-</Text>
        <View>
          <View style={styles.filterTextContainer}>
            <FontAwesome5
              name="calendar-check"
              size={22}
              color={ROYAL_BLUE_COLOR}
            />
            <Text style={styles.filterText}>{formatedEndDate}</Text>
          </View>
          <Button title="Выбрать дату" onPress={showEndDatePicker} />
        </View>
      </View>
      <DateTimePickerModal
        date={range.startDate}
        isVisible={openStartDatePicker}
        mode="date"
        onConfirm={handleConfirmStartDatePicker}
        onCancel={hideStartDatePicker}
        confirmTextIOS="Выбрать"
        cancelTextIOS="Отменить"
      />
      <DateTimePickerModal
        date={range.endDate}
        isVisible={openEndDatePicker}
        mode="date"
        onConfirm={handleConfirmEndDatePicker}
        onCancel={hideEndDatePicker}
        confirmTextIOS="Выбрать"
        cancelTextIOS="Отменить"
      />

      <FlatList
        style={styles.list}
        data={filteredActivities}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
      />
    </View>
  );
}

export default ActivityList;
