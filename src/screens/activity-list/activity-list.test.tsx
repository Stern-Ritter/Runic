import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import ActivityList from "./activity-list";
import { getDateWithoutTimeWithShift } from "../../utils/date";
import {
  filterDateTimeFormat,
} from "../../utils/constants";

const activities = {
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
        createdDate: new Date(1646082000000),
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
  filters: {
    startDate: getDateWithoutTimeWithShift(-6),
    endDate: getDateWithoutTimeWithShift(0),
  },
  createActivityRequest: false,
  createActivityFailed: false,
  deleteActivityRequest: false,
  deleteActivityFailed: false,
};

const useSelectorSpy = jest.spyOn(redux, "useSelector");
const useDispatchSpy = jest.spyOn(redux, "useDispatch");
const mockDispatchFn = jest.fn();

describe("Actiity list screen", () => {
  beforeAll(() => {
    useDispatchSpy.mockReturnValue(mockDispatchFn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render FlatList', () => {
    useSelectorSpy.mockReturnValue(activities);
    const wrapper = shallow(<ActivityList />);

    const flatList = wrapper.find("FlatList");
    expect(flatList.exists()).toBeTruthy();
  });

  it('should render date filter buttons', () => {
    useSelectorSpy.mockReturnValue(activities);
    const wrapper = shallow(<ActivityList />);

    expect(wrapper.find('Text').findWhere((text) => 
      text.text() === activities.filters.startDate.toLocaleString(
        "Ru-ru",
        filterDateTimeFormat
      )).exists()).toBeTruthy();

      expect(wrapper.find('Text').findWhere((text) => 
      text.text() === activities.filters.endDate.toLocaleString(
        "Ru-ru",
        filterDateTimeFormat
      )).exists()).toBeTruthy();

      expect(wrapper.find('ForwardRef')
        .findWhere((f) => f.text() === 'Выбрать дату')).toHaveLength(2);

      expect(wrapper.find('IconClass')).toHaveLength(2);

      expect(wrapper.find('Memo()')).toHaveLength(2);

      let startDatePickerProps = wrapper.find('Memo()').first().props();
      // @ts-ignore
      const startDatePickerShow = wrapper.find('ForwardRef').first().props().onPress;
      // @ts-ignore
      expect(startDatePickerProps.isVisible).toBeFalsy();
      startDatePickerShow();
      wrapper.update();
      startDatePickerProps = wrapper.find('Memo()').first().props();
      // @ts-ignore
      expect(startDatePickerProps.isVisible).toBeTruthy();

      let endDatePickerProps = wrapper.find('Memo()').last().props();
      // @ts-ignore
      const endDatePickerShow = wrapper.find('ForwardRef').last().props().onPress;
      // @ts-ignore
      expect(endDatePickerProps.isVisible).toBeFalsy();
      endDatePickerShow();
      wrapper.update();
      endDatePickerProps = wrapper.find('Memo()').last().props();
      // @ts-ignore
      expect(endDatePickerProps.isVisible).toBeTruthy();
  });
});
