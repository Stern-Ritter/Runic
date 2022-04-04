import { getFirestore } from "firebase/firestore";
import { initializeApp, deleteApp, FirebaseApp } from "firebase/app";
import FirebaseSettingsModel from "./FireBaseSettingsModel";
import Settings from "./Settings";
import {
  firebaseConfig,
  testRootCollectionName,
  settingsCollectionName,
  mainSettingsDocumentName,
} from "../../utils/api";

const testUID = "testUID";
let app: FirebaseApp;
let db;
let storage: FirebaseSettingsModel;

describe("FirebaseSettingsModel", () => {
  beforeAll(() => {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = new FirebaseSettingsModel(
      db,
      testRootCollectionName,
      settingsCollectionName,
      mainSettingsDocumentName
    );
  });

  afterAll(() => {
    deleteApp(app);
  });

  beforeEach(async () => {
    await storage.delete(testUID);
  });

  it(`method get() return default value if
    method update() has never been called yet`, async () => {
    const settings = await storage.get(testUID);
    expect(settings).toStrictEqual(new Settings());
  });

  it(`method get() return correct value`, async () => {
    const options: SettingsOptions = {
      nickName: "NickName",
      distanceGoal: 50,
      caloriesGoal: 1500,
    };
    const expectedSettings = new Settings(options);
    const res = await storage.update(testUID, expectedSettings);

    const settings = await storage.get(testUID);
    expect(res).toBeTruthy();
    expect(settings).toEqual(expectedSettings);
  });
});
