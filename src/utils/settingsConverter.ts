import Settings from "../models/settings/Settings";

const settingsConverter = {
  toFirestore: (settings: Settings) => ({
    nickName: settings.nickName,
    distanceGoal: settings.distanceGoal,
    caloriesGoal: settings.caloriesGoal,
  }),
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Settings({
      nickName: data.nickName,
      distanceGoal: data.distanceGoal,
      caloriesGoal: data.caloriesGoal,
    });
  },
};

export default settingsConverter;
