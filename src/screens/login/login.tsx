import React, { useEffect, useRef } from "react";
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
  AUTHENTICATION_FORM_CLEAR_STATE,
  setAuthenticationFormValue,
  login,
} from "../../services/actions";
import { State } from "../../services/store/store";
import { auth } from "../../models/storage";
import { MEDIUM_STATE_BLUE_COLOR } from "../../utils/colors";
import styles from "./login.styles";

function Login() {
  const dispatch = useDispatch();
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    dispatch({ type: AUTHENTICATION_FORM_CLEAR_STATE });
  }, [dispatch]);

  const {
    error,
    data: { email, password },
  } = useSelector((store: State) => store.authenticationForm);

  const nextInputFocus = (ref: TextInput | null) => {
    if (ref) {
      ref.focus();
    }
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const onInputChange = (field: string, value: string) => {
    dispatch(setAuthenticationFormValue({ field, value }));
  };

  const onFormSend = () => {
    dispatch(login(auth, email, password));
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
            onChangeText={(text) => onInputChange("email", text)}
            onSubmitEditing={() => nextInputFocus(passwordRef.current)}
            value={email}
            style={styles.input}
          />
          <TextInput
            ref={passwordRef}
            placeholder="????????????"
            placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
            returnKeyType="done"
            secureTextEntry
            onChangeText={(text) => onInputChange("password", text)}
            onSubmitEditing={onFormSend}
            value={password}
            style={styles.input}
          />

          <Text style={styles.error}>{error}</Text>

          <TouchableOpacity onPress={onFormSend} style={styles.button}>
            <Text style={styles.buttonText}>??????????</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Login;
