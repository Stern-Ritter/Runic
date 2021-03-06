import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  rootCollectionName,
  activitiesCollectionName,
  settingsCollectionName,
  mainSettingsDocumentName,
  firebaseConfig,
} from "../utils/api";
import FirebaseActivityModel from "./activity/FireBaseActivityModel";
import FirebaseSettingsModel from "./settings/FireBaseSettingsModel";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const activitiesStorage = new FirebaseActivityModel(
  db,
  rootCollectionName,
  activitiesCollectionName
);
const settingsStorage = new FirebaseSettingsModel(
  db,
  rootCollectionName,
  settingsCollectionName,
  mainSettingsDocumentName
);

const auth = getAuth();

export { db, auth, activitiesStorage, settingsStorage };
