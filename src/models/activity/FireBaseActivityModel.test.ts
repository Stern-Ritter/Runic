import { getFirestore } from "firebase/firestore";
import { initializeApp, deleteApp, FirebaseApp } from "firebase/app";
import FirebaseActivityModel from "./FireBaseActivityModel";
import Activity from "./Activity";
import {
  firebaseConfig,
  testRootCollectionName,
  activitiesCollectionName,
} from "../../utils/api";

const testUID = "testUID";
let app: FirebaseApp;
let db;
let storage: FirebaseActivityModel;

describe("FirebaseActivityModel", () => {
  beforeAll(() => {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = new FirebaseActivityModel(
      db,
      testRootCollectionName,
      activitiesCollectionName
    );
  });

  afterAll(() => {
    deleteApp(app);
  });

  beforeEach(async () => {
    await storage.deleteAll(testUID);
  });

  it(`method getAll() return empty array if
    method create() has never been called yet`, async () => {
    const activities = await storage.getAll(testUID);
    expect(activities).toStrictEqual([]);
  });

  it(`method getAll() return correct values`, async () => {
    const elements: ActivityOptions[] = [
      {
        name: "Бег",
        createdDate: new Date(1640984400000),
        duration: 1320000,
        distance: 3,
        calories: 210,
        coords: [
          {
            latitude: 55.74748971461038,
            longitude: 37.77570315494795,
          },
          {
            latitude: 55.749087283795774,
            longitude: 37.776025020029735,
          },
          {
            latitude: 55.74961979225828,
            longitude: 37.77596064701336,
          },
        ],
      },
      {
        name: "Бег",
        createdDate: new Date(1648414800000),
        duration: 4620000,
        distance: 17,
        calories: 1190,
        coords: [
          {
            latitude: 55.751269847256864,
            longitude: 37.788149791283175,
          },
          {
            latitude: 55.75103386011331,
            longitude: 37.78666921190695,
          },
          {
            latitude: 55.750416656190495,
            longitude: 37.78600402407127,
          },
        ],
      },
      {
        name: "Бег",
        createdDate: new Date(1646082000000),
        duration: 3600000,
        distance: 12,
        calories: 840,
        coords: [
          {
            latitude: 55.750308820401415,
            longitude: 37.79293585715798,
          },
          {
            latitude: 55.75113175907041,
            longitude: 37.79248524604348,
          },
          {
            latitude: 55.75261421488572,
            longitude: 37.79528547225504,
          },
        ],
      },
    ];

    const operations: Promise<string>[] = [];
    elements.forEach((element) => {
      const activityObj = new Activity(element);
      operations.push(storage.create(testUID, activityObj) as Promise<string>);
    });
    const results = await Promise.all(operations);
    results.forEach((id, idx) => {
      elements[idx].id = id;
    });

    const transactions = await storage.getAll(testUID);
    elements.forEach((expectedTransaction) => {
      expect(transactions).toContainEqual(expectedTransaction);
    });
  });

  it("method delete() deletes activity correctly", async () => {
    const elements: ActivityOptions[] = [
      {
        name: "Бег",
        createdDate: new Date(1640984400000),
        duration: 1320000,
        distance: 3,
        calories: 210,
        coords: [
          {
            latitude: 55.74748971461038,
            longitude: 37.77570315494795,
          },
          {
            latitude: 55.749087283795774,
            longitude: 37.776025020029735,
          },
          {
            latitude: 55.74961979225828,
            longitude: 37.77596064701336,
          },
        ],
      },
      {
        name: "Бег",
        createdDate: new Date(1648414800000),
        duration: 4620000,
        distance: 17,
        calories: 1190,
        coords: [
          {
            latitude: 55.751269847256864,
            longitude: 37.788149791283175,
          },
          {
            latitude: 55.75103386011331,
            longitude: 37.78666921190695,
          },
          {
            latitude: 55.750416656190495,
            longitude: 37.78600402407127,
          },
        ],
      },
      {
        name: "Бег",
        createdDate: new Date(1646082000000),
        duration: 3600000,
        distance: 12,
        calories: 840,
        coords: [
          {
            latitude: 55.750308820401415,
            longitude: 37.79293585715798,
          },
          {
            latitude: 55.75113175907041,
            longitude: 37.79248524604348,
          },
          {
            latitude: 55.75261421488572,
            longitude: 37.79528547225504,
          },
        ],
      },
    ];

    const operations: Promise<string>[] = [];
    elements.forEach((element) => {
      const activityObj = new Activity(element);
      operations.push(storage.create(testUID, activityObj) as Promise<string>);
    });
    const results = await Promise.all(operations);
    results.forEach((id, idx) => {
      elements[idx].id = id;
    });

    const done = await storage.delete(testUID, elements[2].id as string);
    const transactions = await storage.getAll(testUID);
    expect(done).toBeTruthy();
    expect(transactions).not.toContainEqual(elements[2]);
    expect(transactions).toContainEqual(elements[0]);
    expect(transactions).toContainEqual(elements[1]);
  });
});
