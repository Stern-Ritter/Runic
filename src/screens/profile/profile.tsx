import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import Settings from "../../models/settings/Settings";
import {
  setSettingsFormValue,
  getSettings,
  updateSettings,
} from "../../services/actions";
import { State } from "../../services/store/store";
import { auth } from "../../models/storage";
import { MEDIUM_STATE_BLUE_COLOR } from "../../utils/colors";
import styles from "./profile.styles";

function Profile() {
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);

  const distanceGoalRef = useRef<TextInput>(null);
  const caloriesGoalRef = useRef<TextInput>(null);

  useEffect(() => {
    if (user) {
      dispatch(getSettings(user.uid));
    }
  }, [user]);

  const {
    loading,
    hasError,
    data: { nickName, distanceGoal, caloriesGoal },
  } = useSelector((store: State) => store.settings.settings);

  const updateIsLoading = useSelector(
    (store: State) => store.settings.updateSettingsRequest
  );
  const updateHasError = useSelector(
    (store: State) => store.settings.updateSettingsFailed
  );

  const nextInputFocus = (ref: TextInput | null) => {
    if (ref) {
      ref.focus();
    }
  };

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
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/images/rune.png")}
          />
          <TextInput
            placeholder="Никнейм"
            placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
            keyboardType="phone-pad"
            returnKeyType="next"
            onSubmitEditing={() => nextInputFocus(distanceGoalRef.current)}
            onChangeText={(value) => onInputChange("nickName", value)}
            value={nickName}
            style={styles.input}
          />
          <TextInput
            ref={distanceGoalRef}
            placeholder="Цель дистанции"
            placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => nextInputFocus(caloriesGoalRef.current)}
            onChangeText={(value) =>
              onInputChange("distanceGoal", Number(value))
            }
            value={String(distanceGoal)}
            style={styles.input}
          />
          <TextInput
            ref={distanceGoalRef}
            placeholder="Цель калорий"
            placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
            keyboardType="default"
            returnKeyType="next"
            onChangeText={(value) =>
              onInputChange("caloriesGoal", Number(value))
            }
            value={String(caloriesGoal)}
            style={styles.input}
          />

          {updateHasError && (
            <Text style={styles.error}>
              {`При обновлении настроек прозошла ошибка.\nПопробуйте позже.`}
            </Text>
          )}

          <TouchableOpacity
            onPress={onFormSend}
            disabled={updateIsLoading}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Сохранить</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            disabled={updateIsLoading}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Сменить пользователя</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Profile;
