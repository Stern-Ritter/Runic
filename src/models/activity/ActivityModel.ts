import Activity from "./activity";

abstract class ActivityModel {
  abstract getAll(userUID: string): any;
  abstract create(userUID: string, activity: Activity): any;
  abstract delete(userUID: string, id: string): any;
  abstract deleteAll(userUID: string): any;
}

export default ActivityModel;
