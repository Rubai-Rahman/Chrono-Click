import firebaseConfig from "./Firebase.config";
import { initializeApp } from "firebase/app";

const FirebaseInitialize = () =>{
    const app= initializeApp (firebaseConfig)
}
export default FirebaseInitialize;