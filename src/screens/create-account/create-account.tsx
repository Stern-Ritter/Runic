import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Platform,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  CREATE_USER_FORM_CLEAR_STATE,
  createAccount,
  setCreateUserFormValue,
} from "../../services/actions";
import { State } from "../../services/store/store";
import { auth } from "../../models/storage";
import { MEDIUM_STATE_BLUE_COLOR } from "../../utils/colors";
import styles from "./create-account.styles";

function CreateAccount() {
  const dispatch = useDispatch();
  const passwordRef = useRef<TextInput>(null);
  const repeatPasswordRef = useRef<TextInput>(null);

  useEffect(() => {
    dispatch({ type: CREATE_USER_FORM_CLEAR_STATE });
  }, [dispatch]);

  const {
    success,
    error,
    data: { email, password, repeatPassword },
  } = useSelector((store: State) => store.createUserForm);

  const nextInputFocus = (ref: TextInput | null) => {
    if (ref) {
      ref.focus();
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const isRepeatPasswordNotMatch = useMemo(
    () => password !== repeatPassword,
    [password, repeatPassword]
  );

  const onInputChange = (field: string, value: string) => {
    dispatch(setCreateUserFormValue({ field, value }));
  };

  const onFormSend = () => {
    dispatch(createAccount(auth, email, password));
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/images/rune.png")}
          />
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => nextInputFocus(passwordRef.current)}
            onChangeText={(text) => onInputChange("email", text)}
            value={email}
            style={styles.input}
          />
          <TextInput
            ref={passwordRef}
            placeholder="????????????"
            placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
            returnKeyType="next"
            secureTextEntry
            onSubmitEditing={() => nextInputFocus(repeatPasswordRef.current)}
            onChangeText={(text) => onInputChange("password", text)}
            value={password}
            style={styles.input}
          />
          <TextInput
            ref={repeatPasswordRef}
            placeholder="?????????????????? ????????????"
            placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
            returnKeyType="done"
            secureTextEntry
            onChangeText={(text) => onInputChange("repeatPassword", text)}
            onSubmitEditing={onFormSend}
            value={repeatPassword}
            style={styles.input}
          />

          {isRepeatPasswordNotMatch && (
            <Text style={styles.error}>???????????? ???? ??????????????????</Text>
          )}
          <Text style={styles.error}>{error}</Text>

          <TouchableOpacity
            onPress={onFormSend}
            disabled={isRepeatPasswordNotMatch}
            style={styles.button}
          >
            <Text style={styles.buttonText}>????????????????????????????????????</Text>
          </TouchableOpacity>

          {success && (
            <Text style={styles.success}>???? ?????????????? ????????????????????????????????!</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default CreateAccount;
