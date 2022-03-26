import Activity from "../models/activity/Activity";

const activityConverter = {
  toFirestore: (activity: Activity) => ({
    name: activity.name,
    createdDate: activity.createdDate,
    duration: activity.duration,
    distance: activity.distance,
    calories: activity.calories,
    coords: activity.coords,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Activity({
      id: snapshot.id,
      name: snapshot.name,
      createdDate: snapshot.createdDate,
      duration: snapshot.duration,
      distance: snapshot.distance,
      calories: snapshot.calories,
      coords: snapshot.coords,
    });
  },
};

export default activityConverter;
