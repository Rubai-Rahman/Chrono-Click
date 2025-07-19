import firebaseConfig from "./config";
import { initializeApp } from "firebase/app";

const FirebaseInitialize = () => {
  initializeApp(firebaseConfig);
};
export default FirebaseInitialize;