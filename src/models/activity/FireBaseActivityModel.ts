import {
    Firestore,
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
  } from "firebase/firestore";
  import Activity from "./activity";
  import ActivityModel from "./ActivityModel";
  import activityConverter from "../../utils/activityConverter";
  
  class FirebaseActivityModel extends ActivityModel {
    private db;
    private rootCollectionName;
    private collectionName;
  
    constructor(
      db: Firestore,
      rootCollectionName: string,
      collectionName: string
    ) {
      super();
      this.db = db;
      this.rootCollectionName = rootCollectionName;
      this.collectionName = collectionName;
    }
  
    async getAll(userUID: string): Promise<Activity[] | null> {
      try {
        const ref = collection(
          this.db,
          this.rootCollectionName,
          userUID,
          this.collectionName
        ).withConverter(activityConverter);
        const querySnapshot = await getDocs(ref);
        const activities: Activity[] = [];
        querySnapshot.forEach((document) => activities.push(document.data()));
        return activities;
      } catch (err) {
        console.log("Error get activities: ", err);
        return null;
      }
    }
  
    async create(
      userUID: string,
      activity: Activity
    ): Promise<string | null> {
      try {
        const ref = collection(
          this.db,
          this.rootCollectionName,
          userUID,
          this.collectionName
        ).withConverter(activityConverter);
        const querySnapshot = await addDoc(ref, activity);
        console.log("Activity written with ID: ", querySnapshot.id);
        return querySnapshot.id;
      } catch (err) {
        console.log("Error adding activity: ", err);
        return null;
      }
    }
  
    async delete(userUID: string, id: string): Promise<boolean> {
      try {
        await deleteDoc(
          doc(
            this.db,
            this.rootCollectionName,
            userUID,
            this.collectionName,
            String(id)
          )
        );
        console.log("Activity with ID deleted: ", id);
        return true;
      } catch (err) {
        console.log("Error deleting activity: ", err);
        return false;
      }
    }
  
    async deleteAll(userUID: string): Promise<boolean> {
      try {
        const activities = (await this.getAll(userUID)) ?? [];
        const operations: Promise<void>[] = [];
        activities.forEach((activity) =>
          operations.push(
            deleteDoc(
              doc(
                this.db,
                this.rootCollectionName,
                userUID,
                this.collectionName,
                String(activity.id)
              )
            )
          )
        );
        await Promise.all(operations);
        console.log("All activities deleted");
        return true;
      } catch (err) {
        console.log("Error deleting all activities: ", err);
        return false;
      }
    }
  }
  
  export default FirebaseActivityModel;