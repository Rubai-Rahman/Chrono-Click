import firebaseConfig from './config';
import { initializeApp, getApps } from 'firebase/app';

// Initialize Firebase only if it hasn't been initialized already
const FirebaseInitialize = () => {
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
};

export default FirebaseInitialize;
