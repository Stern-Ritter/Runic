import React from "react";
import { shallow, mount } from "enzyme";
import Preview from "./preview";

const mockedNavigate = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe("Preview screen", () => {
  it("should render a Image", () => {
    const wrapper = shallow(<Preview />);
    expect(wrapper.find("Image")).toHaveLength(1);
  });

  it("should render correct Text elements", () => {
    const wrapper = shallow(<Preview />);

    expect(wrapper.find("Text")).toHaveLength(4);

    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "Runic")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "The best app for running.")
        .exists()
    ).toBeTruthy();
  });

  it("should render buttons with correct handlers", () => {
    const wrapper = mount(<Preview />);

    expect(wrapper.find("ForwardRef")).toHaveLength(2);

    const createAccountBtn = wrapper
      .find("ForwardRef")
      .findWhere((f) => f.text() === "Регистрация")
      .first();
    const loginBtn = wrapper
      .find("ForwardRef")
      .findWhere((f) => f.text() === "Войти")
      .first();
    expect(createAccountBtn.exists()).toBeTruthy();
    expect(loginBtn.exists()).toBeTruthy();

    expect(mockedNavigate).toHaveBeenCalledTimes(0);

    createAccountBtn.props().onPress();
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenLastCalledWith("CreateAccount");

    loginBtn.props().onPress();
    expect(mockedNavigate).toHaveBeenCalledTimes(2);
    expect(mockedNavigate).toHaveBeenLastCalledWith("Login");
  });
});
