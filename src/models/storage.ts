import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
    firebaseConfig,
} from "../utils/api";

const app = initializeApp(firebaseConfig);
const store = getFirestore(app);
const auth = getAuth();

export { store, auth };
