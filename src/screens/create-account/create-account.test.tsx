import React from "react";
import { shallow, mount } from "enzyme";
import * as redux from "react-redux";
import { Keyboard } from "react-native";
import CreateAccount from "./create-account";
import * as createUserFormActions from "../../services/actions/create-account";
import { auth } from "../../models/storage";
import { 
  CREATE_USER_FORM_CLEAR_STATE,
} from "../../services/actions";

const createUserForm = {
  success: false,
  error: '',
  data: {
    email: "test@mail.ru",
    password: "password",
    repeatPassword: "password",
  },
};

let originKeyboardDismiss: () => void;
const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockKeyboardDismiss = jest.fn();

const setCreateUserFormValueSpy = jest
    .spyOn(createUserFormActions, "setCreateUserFormValue");
const createAccountSpy = jest
    .spyOn(createUserFormActions, "createAccount");

describe("Create account screen", () => {
  beforeAll(() => {
    jest.useFakeTimers();
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
    useSelectorSpy.mockReturnValue(createUserForm);
    const wrapper = shallow(<CreateAccount />);

    const touchableWithoutFeedback = wrapper.find("TouchableWithoutFeedback");
    const keyboardAvoidingView = wrapper.find("KeyboardAvoidingView");
    expect(touchableWithoutFeedback.exists()).toBeTruthy();
    expect(keyboardAvoidingView.exists()).toBeTruthy();

    //@ts-ignore
    touchableWithoutFeedback.props().onPress();
    expect(mockKeyboardDismiss).toHaveBeenCalledTimes(1);
  });

  it(`should clear form state after component mount`, () => {
    useSelectorSpy.mockReturnValue(createUserForm);
    mount(<CreateAccount />);

    expect(mockDispatchFn).toHaveBeenCalledTimes(1);
    expect(mockDispatchFn).toHaveBeenLastCalledWith({ type : CREATE_USER_FORM_CLEAR_STATE});
  });

  it(`should render Image`, () => {
    useSelectorSpy.mockReturnValue(createUserForm);
    const wrapper = shallow(<CreateAccount />);

    expect(wrapper.find("Image")).toHaveLength(1);
  });

  it(`should default render without error and succes text blocks`, () => {
    useSelectorSpy.mockReturnValue(createUserForm);
    const wrapper = shallow(<CreateAccount />);

    expect(wrapper.find('Text').findWhere((text) => 
      text.text() === 'Вы успешно зарегистрированы!').exists()).toBeFalsy();
    expect(wrapper.find('Text').findWhere((text) => 
      text.text() === 'Пароли не совпадают').exists()).toBeFalsy();
  });

  it(`should render inputs with correct props, values and handlers`, () => {
    useSelectorSpy.mockReturnValue(createUserForm);
    const wrapper = shallow(<CreateAccount />);

    expect(wrapper.find("TextInput")).toHaveLength(3);
    const emailInput = wrapper.find("TextInput")
        .filterWhere((input) => input.props().placeholder === 'E-mail');
    const passwordInput = wrapper.find("TextInput")
        .filterWhere((input) => input.props().placeholder === 'Пароль');
    const repeatPasswordInput = wrapper.find("TextInput")
        .filterWhere((input) => input.props().placeholder === 'Повторите пароль');       
  
    expect(emailInput.prop('returnKeyType')).toBe('next');
    expect(emailInput.prop('value')).toBe(createUserForm.data.email);

    expect(passwordInput.prop('returnKeyType')).toBe('next');
    expect(passwordInput.prop('secureTextEntry')).toBeTruthy();
    expect(passwordInput.prop('value')).toBe(createUserForm.data.password);

    expect(repeatPasswordInput.prop('returnKeyType')).toBe('done');
    expect(repeatPasswordInput.prop('secureTextEntry')).toBeTruthy();
    expect(repeatPasswordInput.prop('value')).toBe(createUserForm.data.repeatPassword);

    emailInput.simulate('changeText', 'text');
    expect(setCreateUserFormValueSpy).toHaveBeenCalledTimes(1);
  });

  it(`should render button with correct handler`, async () => {
    useSelectorSpy.mockReturnValue(createUserForm);
    const wrapper = mount(<CreateAccount />);

    const createAccountBtn = wrapper.find('ForwardRef')
      .findWhere((f) => f.text() === 'Зарегистрироваться').first();
    
    expect(createAccountBtn.prop('disabled')).toBeFalsy();

    createAccountBtn.props().onPress();
    expect(createAccountSpy).toHaveBeenCalledTimes(1);
    expect(createAccountSpy).toHaveBeenCalledWith(
      auth,
      createUserForm.data.email,
      createUserForm.data.password
    );
  });

  it(`should render message about success registration`, async () => {
    useSelectorSpy.mockReturnValue({...createUserForm, success: true});
    const wrapper = shallow(<CreateAccount />);

    expect(wrapper.find('Text').findWhere((text) => 
      text.text() === 'Вы успешно зарегистрированы!').exists()).toBeTruthy();
  });

  it(`should render message about create account error`, async () => {
    useSelectorSpy.mockReturnValue({...createUserForm, error: 'Create account error'});
    const wrapper = shallow(<CreateAccount />);

    expect(wrapper.find('Text').findWhere((text) => 
      text.text() === 'Create account error').exists()).toBeTruthy();
  });

  it(`should render message about password not math error`, async () => {
    useSelectorSpy.mockReturnValue({
      ...createUserForm,
      data: {
        ...createUserForm.data,
        password: 'password',
        repeatPassword: 'pass'
      }
    });
    const wrapper = mount(<CreateAccount />);

    expect(wrapper.find('Text').findWhere((text) => 
      text.text() === 'Пароли не совпадают').exists()).toBeTruthy();
  });
});
