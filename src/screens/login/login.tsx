import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import {
  AUTHENTICATION_FORM_CLEAR_STATE,
  setAuthenticationFormValue,
  setAuthenticationFormErrorMessage,
} from "../../services/actions";
import { State } from "../../services/store/store";
import { auth } from "../../models/storage";
import { MEDIUM_STATE_BLUE_COLOR } from "../../constants/colors";
import styles from "./login.styles";

interface LoginScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

function Login({ navigation }: LoginScreenProps) {
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

  const goToCreateAccount = () => {
    navigation.navigate("CreateAccount");
  };

  const onInputChange = (field: string, value: string) => {
    dispatch(setAuthenticationFormValue({ field, value }));
  };

  const onFormSend = () => {
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      dispatch(setAuthenticationFormErrorMessage({ text: err.message }));
    });
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/images/rune.png")}
          />
          <Text style={styles.title}>Введите данные:</Text>
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={MEDIUM_STATE_BLUE_COLOR}
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={(text) => onInputChange("email", text)}
            onSubmitEditing={() => nextInputFocus(passwordRef.current)}
            value={email}
            style={styles.input}
          />
          <TextInput
            ref={passwordRef}
            placeholder="Пароль"
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
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToCreateAccount} style={styles.button}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Login;
