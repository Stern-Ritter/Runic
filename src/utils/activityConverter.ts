import Activity from "../models/activity/Activity";

const activityConverter = {
  toFirestore: (activity: Activity) => ({
    name: activity.name,
    createdDate: activity.createdDate.getTime(),
    duration: activity.duration,
    distance: activity.distance,
    calories: activity.calories,
    coords: activity.coords,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Activity({
      id: snapshot.id,
      name: data.name,
      createdDate: new Date(data.createdDate),
      duration: data.duration,
      distance: data.distance,
      calories: data.calories,
      coords: data.coords,
    });
  },
};

export default activityConverter;
