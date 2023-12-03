import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "./components/config/firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);

const imageDb = getStorage(firebaseApp);

const textDb = getFirestore(firebaseApp);

export { imageDb, textDb };
