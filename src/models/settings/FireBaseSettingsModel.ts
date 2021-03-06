import { Firestore, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import Settings from "./Settings";
import SettingsModel from "./SettingsModel";
import settingsConverter from "../../utils/settingsConverter";

class FirebaseSettingsModel extends SettingsModel {
  private db;
  private rootCollectionName;
  private collectionName;
  private documentName;

  constructor(
    db: Firestore,
    rootCollectionName: string,
    collectionName: string,
    documentName: string
  ) {
    super();
    this.db = db;
    this.rootCollectionName = rootCollectionName;
    this.collectionName = collectionName;
    this.documentName = documentName;
  }

  async get(userUID: string): Promise<Settings | null> {
    try {
      const ref = doc(
        this.db,
        this.rootCollectionName,
        userUID,
        this.collectionName,
        this.documentName
      ).withConverter(settingsConverter);
      const querySnapshot = await getDoc(ref);
      console.log(`Received user #${userUID} settings`);
      return querySnapshot.exists() ? querySnapshot.data() : new Settings();
    } catch (err) {
      console.log(`Error receiving user #${userUID} settings: ${err}`);
      return null;
    }
  }

  async update(userUID: string, settings: Settings): Promise<boolean> {
    try {
      const ref = doc(
        this.db,
        this.rootCollectionName,
        userUID,
        this.collectionName,
        this.documentName
      ).withConverter(settingsConverter);
      await setDoc(ref, settings);
      console.log(`User #${userUID} settings updated`);
      return true;
    } catch (err) {
      console.log(`Error updating user #${userUID} settings`);
      return false;
    }
  }

  async delete(userUID: string): Promise<boolean> {
    try {
      await deleteDoc(
        doc(
          this.db,
          this.rootCollectionName,
          userUID,
          this.collectionName,
          this.documentName
        )
      );
      console.log(`User #${userUID} settings deleted`);
      return true;
    } catch (err) {
      console.log(`Error deleting user #${userUID} settings: ${err}`);
      return false;
    }
  }
}

export default FirebaseSettingsModel;
