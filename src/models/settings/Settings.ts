class Settings {
  nickName: string;
  distanceGoal: number;
  caloriesGoal: number;

  constructor(option = { 
      nickName: "Пользователь",
      distanceGoal: 10,
      caloriesGoal: 1000 
    }) {
    const { nickName, distanceGoal, caloriesGoal } = option;
    this.nickName = nickName;
    this.distanceGoal = distanceGoal;
    this.caloriesGoal = caloriesGoal;
  }
}

export default Settings;
