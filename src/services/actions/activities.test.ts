import { getActivities, createActivity, deleteActivity } from "./activities";
import {
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_SUCCESS,
  FINISH_ACTIVITY,
  GET_ACTIVITIES,
  GET_ACTIVITIES_SUCCESS,
  DELETE_ACTIVITY,
  DELETE_ACTIVITY_SUCCESS,
} from "../actions";
import Activity from "../../models/activity/Activity";
import { AppDispatch } from "../store/store";

const activity = {
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
};
const testUID = "testActionsUID";
let activityId: string;
const mockDispatch = jest.fn((action) => {
  if (action.type === CREATE_ACTIVITY_SUCCESS) {
    activityId = action?.payload.id;
  }
}) as AppDispatch;

describe("Activities actions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip("methods getActivities, createActivity, deleteActivity work correct", async () => {
    const activityObj = new Activity(activity);

    const createActivityThunk = createActivity(testUID, activityObj);
    await createActivityThunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, { type: CREATE_ACTIVITY });

    const createdActivity = new Activity({
      ...activity,
      id: activityId,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(2, {
      type: CREATE_ACTIVITY_SUCCESS,
      payload: createdActivity,
    });
    expect(mockDispatch).toHaveBeenNthCalledWith(3, { type: FINISH_ACTIVITY });

    const getActivitiesThunk = getActivities(testUID);
    await getActivitiesThunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(5);
    expect(mockDispatch).toHaveBeenNthCalledWith(4, { type: GET_ACTIVITIES });
    expect(mockDispatch).toHaveBeenNthCalledWith(5, {
      type: GET_ACTIVITIES_SUCCESS,
      payload: [createdActivity],
    });

    const deleteActivityThunk = deleteActivity(testUID, createdActivity.id);
    await deleteActivityThunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(7);
    expect(mockDispatch).toHaveBeenNthCalledWith(6, { type: DELETE_ACTIVITY });
    expect(mockDispatch).toHaveBeenNthCalledWith(7, {
      type: DELETE_ACTIVITY_SUCCESS,
      payload: createdActivity.id,
    });
  });
});
