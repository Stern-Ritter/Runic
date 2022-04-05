import React from "react";
import { shallow, mount } from "enzyme";
import * as redux from "react-redux";
import Analytics from "./analytics";

const analytics = {
  activities: {
    activities: {
      loading: false,
      hasError: false,
      data: [
        {
          name: "Бег",
          createdDate: new Date(1640984400000),
          duration: 1320000,
          distance: 3,
          calories: 210,
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
        },
        {
          name: "Бег",
          createdDate: new Date(1648414800000),
          duration: 4620000,
          distance: 17,
          calories: 1190,
          coords: [
            {
              latitude: 55.751269847256864,
              longitude: 37.788149791283175,
            },
            {
              latitude: 55.75103386011331,
              longitude: 37.78666921190695,
            },
            {
              latitude: 55.750416656190495,
              longitude: 37.78600402407127,
            },
          ],
        },
        {
          name: "Бег",
          createdDate: new Date(1649116005839),
          duration: 3600000,
          distance: 12,
          calories: 840,
          coords: [
            {
              latitude: 55.750308820401415,
              longitude: 37.79293585715798,
            },
            {
              latitude: 55.75113175907041,
              longitude: 37.79248524604348,
            },
            {
              latitude: 55.75261421488572,
              longitude: 37.79528547225504,
            },
          ],
        },
      ],
    },
  },
  settings: {
    settings: {
      data: {
        nickName: "NickName",
        distanceGoal: 33,
        caloriesGoal: 2000,
      },
    },
  },
};

const useSelectorSpy = jest.spyOn(redux, "useSelector");

describe("Analytics list screen", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render ScrollableTabView", () => {
    useSelectorSpy.mockReturnValue(analytics);
    const wrapper = shallow(<Analytics />);

    const flatList = wrapper.find("ScrollableTabView");
    expect(flatList.exists()).toBeTruthy();
  });

  it("should render analytic tabs", () => {
    useSelectorSpy.mockReturnValue(analytics);
    const wrapper = shallow(<Analytics />);

    expect(wrapper.find("Tab")).toHaveLength(3);
    expect(
      wrapper
        .find("Tab")
        .findWhere((tab) => tab.prop("tabLabel") === "Цели")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Tab")
        .findWhere((tab) => tab.prop("tabLabel") === "Динамика")
        .exists()
    ).toBeTruthy();
    expect(
      wrapper
        .find("Tab")
        .findWhere((tab) => tab.prop("tabLabel") === "Активность")
        .exists()
    ).toBeTruthy();
  });

  it("should render Progress chart witch correct data", () => {
    useSelectorSpy.mockReturnValue(analytics);
    const wrapper = shallow(<Analytics />);

    console.log(wrapper.find("ProgressChart").props().data);

    expect(wrapper.find("ProgressChart").exists()).toBeTruthy();
    expect(wrapper.find("ProgressChart").props().data).toEqual({
      labels: ["Км.", "Калории"],
      data: [
          Math.round((12 / 33) * 100) / 100,
          Math.round((840 / 2000) * 100) / 100
    ],
    });
  });

  it("should render LineChart chart witch correct data", () => {
    useSelectorSpy.mockReturnValue(analytics);
    const wrapper = shallow(<Analytics />);

    expect(wrapper.find("LineChart").exists()).toBeTruthy();
    expect(wrapper.find("LineChart").props().data).toEqual({
      labels: ["янв. 2022 г.", "март 2022 г.", "апр. 2022 г."],
      datasets: [{ data: [3, 17, 12] }],
      legend: ["Километры"],
    });
  });

  it("should render ContributionGraph chart witch correct data", () => {
    useSelectorSpy.mockReturnValue(analytics);
    const wrapper = shallow(<Analytics />);

    expect(wrapper.find("ContributionGraph").exists()).toBeTruthy();
    expect(wrapper.find("ContributionGraph").props().values).toEqual([
      { date: "2021-12-31", count: 3 },
      { date: "2022-03-27", count: 17 },
      { date: "2022-04-04", count: 12 },
    ]);
  });
});
