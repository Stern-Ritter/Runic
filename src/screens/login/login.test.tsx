import React from "react";
import { shallow, mount } from "enzyme";
import * as redux from "react-redux";
import { Keyboard } from "react-native";
import Login from "./login";
import * as loginFormActions from "../../services/actions/login";
import { auth } from "../../models/storage";
import { AUTHENTICATION_FORM_CLEAR_STATE } from "../../services/actions";

const authenticationForm = {
  data: {
    email: "test@mail.ru",
    password: "password",
  },
  error: "",
};

let originKeyboardDismiss: () => void;
const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockKeyboardDismiss = jest.fn();

const setAuthenticationFormValueSpy = jest
    .spyOn(loginFormActions, "setAuthenticationFormValue");
const loginSpy = jest
    .spyOn(loginFormActions, "login");

describe("Login screen", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    originKeyboardDismiss = Keyboard.dismiss;
    Keyboard.dismiss = mockKeyboardDismiss;
  });

  afterAll(() => {
    Keyboard.dismiss = originKeyboardDismiss;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`should render TouchableWithoutFeedback and 
  KeyboardAvoidingView components with correct handlers`, () => {
    useSelectorSpy.mockReturnValue(authenticationForm);
    const wrapper = shallow(<Login />);

    const touchableWithoutFeedback = wrapper.find("TouchableWithoutFeedback");
    const keyboardAvoidingView = wrapper.find("KeyboardAvoidingView");
    expect(touchableWithoutFeedback.exists()).toBeTruthy();
    expect(keyboardAvoidingView.exists()).toBeTruthy();

    //@ts-ignore
    touchableWithoutFeedback.props().onPress();
    expect(mockKeyboardDismiss).toHaveBeenCalledTimes(1);
  });

  it(`should clear form state after component mount`, () => {
    useSelectorSpy.mockReturnValue(authenticationForm);
    mount(<Login />);

    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
    expect(mockDispatchFn).toHaveBeenLastCalledWith({ type :AUTHENTICATION_FORM_CLEAR_STATE });
  });

  it(`should render Image`, () => {
    useSelectorSpy.mockReturnValue(authenticationForm);
    const wrapper = shallow(<Login />);

    expect(wrapper.find("Image")).toHaveLength(1);
  });

  it(`should render inputs with correct props, values and handlers`, () => {
    useSelectorSpy.mockReturnValue(authenticationForm);
    const wrapper = shallow(<Login />);

    expect(wrapper.find("TextInput")).toHaveLength(2);
    const emailInput = wrapper.find("TextInput")
        .filterWhere((input) => input.props().placeholder === 'E-mail');
    const passwordInput = wrapper.find("TextInput")
        .filterWhere((input) => input.props().placeholder === 'Пароль');
  
    expect(emailInput.prop('returnKeyType')).toBe('next');
    expect(emailInput.prop('keyboardType')).toBe('email-address');
    expect(emailInput.prop('value')).toBe(authenticationForm.data.email);

    expect(passwordInput.prop('returnKeyType')).toBe('done');
    expect(passwordInput.prop('returnKeyType')).toBe('done');
    expect(passwordInput.prop('secureTextEntry')).toBeTruthy();
    expect(passwordInput.prop('value')).toBe(authenticationForm.data.password);

    emailInput.simulate('changeText', 'text1');
    expect(setAuthenticationFormValueSpy).toHaveBeenCalledTimes(1);
    expect(setAuthenticationFormValueSpy).toHaveBeenLastCalledWith({field: "email", value: "text1"});

    passwordInput.simulate('changeText', 'text2');
    expect(setAuthenticationFormValueSpy).toHaveBeenCalledTimes(2);
    expect(setAuthenticationFormValueSpy).toHaveBeenLastCalledWith({field: "password", value: "text2"});

    passwordInput.simulate('submitEditing');
    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledWith(
      auth,
      authenticationForm.data.email,
      authenticationForm.data.password
    );
  });

  it(`should render button with correct handler`, async () => {
    useSelectorSpy.mockReturnValue(authenticationForm);
    const wrapper = mount(<Login />);

    const createAccountBtn = wrapper.find('ForwardRef')
      .findWhere((f) => f.text() === 'Войти').first();
    
    createAccountBtn.props().onPress();
    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledWith(
      auth,
      authenticationForm.data.email,
      authenticationForm.data.password
    );
  });

  it(`should render message about create account error`, async () => {
    useSelectorSpy.mockReturnValue({...authenticationForm, error: 'Authentication error'});
    const wrapper = shallow(<Login />);

    expect(wrapper.find('Text').findWhere((text) => 
      text.text() === 'Authentication error').exists()).toBeTruthy();
  });

});
