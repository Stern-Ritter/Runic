import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Settings from "../../models/settings/Settings";
import { setSettingsFormValue, updateSettings } from "../../services/actions";
import { State } from "../../services/store/store";
import { auth } from "../../models/storage";
import { MEDIUM_STATE_BLUE_COLOR } from "../../utils/colors";
import styles from "./profile.styles";

function Profile() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const {
    settings: {
      loading,
      hasError,
      data: { nickName, distanceGoal, caloriesGoal },
    },
    updateSettingsRequest,
    updateSettingsFailed,
  } = useSelector((store: State) => store.settings);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const onInputChange = (field: string, value: string | number) => {
    dispatch(setSettingsFormValue({ field, value }));
  };

  const onFormSend = () => {
    if (user) {
      const settings = new Settings({
        nickName,
        distanceGoal,
        caloriesGoal,
      });
      dispatch(updateSettings(user.uid, settings));
    }
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/images/rune.png")}
          />
          <Text style={styles.section}>Основные:</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Имя пользователя</Text>
            <TextInput
              placeholder="Ник"
              placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
              onChangeText={(value) => onInputChange("nickName", value)}
              value={nickName}
              style={styles.input}
            />
          </View>
          <Text style={styles.section}>Цели на неделю:</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Километры</Text>
            <TextInput
              placeholder="Цель километров"
              keyboardType="numeric"
              placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
              onChangeText={(value) =>
                onInputChange("distanceGoal", Number(value))
              }
              value={String(distanceGoal)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Калории</Text>
            <TextInput
              placeholder="Цель калорий"
              keyboardType="numeric"
              placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
              onChangeText={(value) =>
                onInputChange("caloriesGoal", Number(value))
              }
              value={String(caloriesGoal)}
              style={styles.input}
            />
          </View>

          {updateSettingsFailed && (
            <Text style={styles.error}>
              {`При обновлении настроек прозошла ошибка.\nПопробуйте позже.`}
            </Text>
          )}

          <TouchableOpacity
            onPress={onFormSend}
            disabled={updateSettingsRequest}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Сохранить</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={logout}
            disabled={updateSettingsRequest}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Сменить пользователя</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default Profile;
