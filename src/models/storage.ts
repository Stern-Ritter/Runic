import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  rootCollectionName,
  activitiesCollectionName,
  firebaseConfig,
} from "../utils/api";
import FirebaseActivityModel from "./activity/FireBaseActivityModel";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const activitiesStorage = new FirebaseActivityModel(
  db,
  rootCollectionName,
  activitiesCollectionName
);

const auth = getAuth();

export { db, auth, activitiesStorage };
