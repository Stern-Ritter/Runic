import Settings from "./Settings";

abstract class SettingsModel {
  abstract get(userUID: string): any;
  abstract update(userUID: string, settings: Settings): any;
}

export default SettingsModel;
