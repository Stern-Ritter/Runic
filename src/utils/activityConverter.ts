import Activity from "../models/activity/activity";

const activityConverter = {
  toFirestore: (activity: Activity) => ({
    name: activity.name,
    time: activity.time,
    distance: activity.distance,
    date: activity.date,
    coords: activity.coords,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Activity({
      id: snapshot.id,
      name: snapshot.name,
      time: snapshot.time,
      distance: snapshot.distance,
      date: snapshot.date,
      coords: snapshot.coords,
    });
  },
};

export default activityConverter;
