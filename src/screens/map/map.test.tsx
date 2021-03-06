import React from "react";
import { shallow, mount } from "enzyme";
import * as redux from "react-redux";
import * as Location from "expo-location";
import Map from "./map";

const activity = {
  isStarted: false,
  isPaused: false,
  indicators: {
    createdDate: Date.now(),
    distance: 10,
    calories: 10000,
  },
  coords: [
    {
      latitude: 55.74748971461038,
      longitude: 37.77570315494795,
    },
    {
      latitude: 55.749087283795774,
      longitude: 37.776025020029735,
    },
    {
      latitude: 55.74961979225828,
      longitude: 37.77596064701336,
    },
  ],
};
const timestamp = Date.now();

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const useForegroundPermissionsSpy = jest.spyOn(
  Location,
  "useForegroundPermissions"
);
const useBackgroundPermissionsSpy = jest.spyOn(
  Location,
  "useBackgroundPermissions"
);
const getCurrentPositionAsyncSpy = jest.spyOn(
  Location,
  "getCurrentPositionAsync"
);
const mockDispatchFn = jest.fn();

describe("Analytics list screen", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useForegroundPermissionsSpy.mockReturnValue([
      {
        canAskAgain: true,
        expires: "never",
        granted: true,
        // @ts-ignore
        status: "granted",
      },
    ]);
    useBackgroundPermissionsSpy.mockReturnValue([
      {
        canAskAgain: true,
        expires: "never",
        granted: true,
        // @ts-ignore
        status: "granted",
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render with correct indicators", () => {
    useSelectorSpy.mockReturnValue(activity);
    const wrapper = shallow(<Map />);

    expect(wrapper.find("IconClass")).toHaveLength(4);
    expect(
      wrapper
        .find("IconClass")
        .findWhere((icon) => icon.prop("name") === "stopwatch")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("IconClass")
        .findWhere((icon) => icon.prop("name") === "map-marker-alt")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("IconClass")
        .findWhere((icon) => icon.prop("name") === "running")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("IconClass")
        .findWhere((icon) => icon.prop("name") === "burn")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "0:00:00")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "10.00 km")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "0.00 km/h")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Text")
        .findWhere((text) => text.text() === "10000 cal")
        .exists()
    ).toBeTruthy();
  });

  it("should render ActivityIndicator if startGeoposition is not defined", () => {
    useSelectorSpy.mockReturnValue(activity);
    const wrapper = shallow(<Map />);

    expect(wrapper.find("ActivityIndicator").exists()).toBeTruthy();
    expect(wrapper.find("Map").exists()).toBeFalsy();
  });

  it("should render Map if startGeoposition is defined", async () => {
    useSelectorSpy.mockReturnValue(activity);
    getCurrentPositionAsyncSpy.mockReturnValue(
      Promise.resolve({
        coords: {
          accuracy: 13.343999862670898,
          altitude: 192.09999084472656,
          altitudeAccuracy: 3.75742769241333,
          heading: 256.6348571777344,
          latitude: 55.7474062,
          longitude: 37.7758476,
          speed: 0.255306601524353,
        },
        mocked: false,
        timestamp: 1649144588442,
      })
    );
    const wrapper = await mount(<Map />);

    expect(wrapper.find("Map").exists()).toBeTruthy();
  });
});
