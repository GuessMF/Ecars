// import {initializeApp, getApp} from "firebase/app";
// import {getDatabase} from "firebase/database";
// import {getStorage} from "firebase/storage";

// // const databaseURL = process.env.REACT_APP_FIREBASE_DATABASE_URL;
// // const correctedDatabaseURL = databaseURL.endsWith('/') ? databaseURL : `${databaseURL}/`;

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_API_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);
// const database = getDatabase(app);

// export {storage, database};

import {initializeApp, getApp, FirebaseApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const createFirebaseApp = (config = {}): FirebaseApp => {
  try {
    return getApp();
  } catch (error) {
    {
      return initializeApp(config);
    }
    throw error;
  }
};

const firebaseApp = createFirebaseApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const storage = getStorage(firebaseApp);
// const database = getDatabase(firebaseApp);
const db = getFirestore(firebaseApp);

export {storage, db};
