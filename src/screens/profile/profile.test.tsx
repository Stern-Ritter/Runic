import React from "react";
import { shallow, mount } from "enzyme";
import * as redux from "react-redux";
import { Keyboard } from "react-native";
import Profile from "./profile";
import * as profileActions from "../../services/actions/profile";

const settings = {
  settings: {
    loading: false,
    hasError: false,
    data: {
      nickName: "NickName",
      distanceGoal: "25",
      caloriesGoal: "2000",
    },
  },
  updateSettingsRequest: false,
  updateSettingsFailed: false,
};

let originKeyboardDismiss: () => void;
const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();
const mockKeyboardDismiss = jest.fn();

const setSettingsFormValueSpy = jest.spyOn(
  profileActions,
  "setSettingsFormValue"
);

describe("Profile screen", () => {
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

  it(`should render TouchableWithoutFeedback and ScrollView components
  with correct handler`, () => {
    useSelectorSpy.mockReturnValue(settings);
    const wrapper = shallow(<Profile />);

    const touchableWithoutFeedback = wrapper.find("TouchableWithoutFeedback");
    const scrollView = wrapper.find("ScrollView");
    expect(touchableWithoutFeedback.exists()).toBeTruthy();
    expect(scrollView.exists()).toBeTruthy();

    // @ts-ignore
    touchableWithoutFeedback.props().onPress();
    expect(mockKeyboardDismiss).toHaveBeenCalledTimes(1);
  });

  it(`should render Image`, () => {
    useSelectorSpy.mockReturnValue(settings);
    const wrapper = shallow(<Profile />);

    expect(wrapper.find("Image")).toHaveLength(1);
  });

  it(`should section names and labels`, () => {
    useSelectorSpy.mockReturnValue(settings);
    const wrapper = shallow(<Profile />);

    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "Основные:")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "Имя пользователя")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "Цели на неделю:")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "Километры")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "Калории")
        .exists()
    ).toBeTruthy();
  });

  it(`should render inputs with correct props, values and handlers`, () => {
    useSelectorSpy.mockReturnValue(settings);
    const wrapper = shallow(<Profile />);

    expect(wrapper.find("TextInput")).toHaveLength(3);
    const nameInput = wrapper
      .find("TextInput")
      .filterWhere((input) => input.props().placeholder === "Ник");
    const distanceGoalInput = wrapper
      .find("TextInput")
      .filterWhere((input) => input.props().placeholder === "Цель километров");
    const caloriesGoalInput = wrapper
      .find("TextInput")
      .filterWhere((input) => input.props().placeholder === "Цель калорий");

    expect(nameInput.prop("value")).toBe(settings.settings.data.nickName);

    expect(distanceGoalInput.prop("keyboardType")).toBe("numeric");
    expect(distanceGoalInput.prop("value")).toBe(
      settings.settings.data.distanceGoal
    );

    expect(caloriesGoalInput.prop("keyboardType")).toBe("numeric");
    expect(caloriesGoalInput.prop("value")).toBe(
      settings.settings.data.caloriesGoal
    );

    nameInput.simulate("changeText", "New nick");
    expect(setSettingsFormValueSpy).toHaveBeenCalledTimes(1);
    expect(setSettingsFormValueSpy).toHaveBeenLastCalledWith({
      field: "nickName",
      value: "New nick",
    });

    distanceGoalInput.simulate("changeText", "33");
    expect(setSettingsFormValueSpy).toHaveBeenCalledTimes(2);
    expect(setSettingsFormValueSpy).toHaveBeenLastCalledWith({
      field: "distanceGoal",
      value: 33,
    });

    caloriesGoalInput.simulate("changeText", "1500");
    expect(setSettingsFormValueSpy).toHaveBeenCalledTimes(3);
    expect(setSettingsFormValueSpy).toHaveBeenLastCalledWith({
      field: "caloriesGoal",
      value: 1500,
    });
  });

  it(`should render buttons with correct handlers`, async () => {
    useSelectorSpy.mockReturnValue(settings);
    const wrapper = mount(<Profile />);

    expect(wrapper.find("ForwardRef")).toHaveLength(2);
    const saveBtn = wrapper
      .find("ForwardRef")
      .findWhere((f) => f.text() === "Сохранить")
      .first();
    const logoutBtn = wrapper
      .find("ForwardRef")
      .findWhere((f) => f.text() === "Сменить пользователя")
      .first();

    expect(saveBtn.exists()).toBeTruthy();
    expect(saveBtn.prop("disabled")).toBeFalsy();
    expect(logoutBtn.exists()).toBeTruthy();
    expect(logoutBtn.prop("disabled")).toBeFalsy();
  });

  it(`should render message about save settings error`, async () => {
    useSelectorSpy.mockReturnValue({ ...settings, updateSettingsFailed: true });
    const wrapper = shallow(<Profile />);

    expect(
      wrapper
        .find("Text")
        .findWhere(
          (text) =>
            text.text() ===
            `При обновлении настроек прозошла ошибка.\nПопробуйте позже.`
        )
        .exists()
    ).toBeTruthy();
  });
});
