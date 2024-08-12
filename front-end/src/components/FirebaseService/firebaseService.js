import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

console.log("Firebase Storage Bucket:", process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);
console.log(process.env.REACT_APP_FIREBASE_API_KEY);
console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const getImageLink = async (id, name, file) => {
  const storageRef = ref(storage, `${id}/${name}.png`);

  try {
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    throw error;
  }
};

export const deleteImageLink = async (id, name) => {
  const storageRef = ref(storage, `${id}/${name}.png`);

  try {
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    return false;
  }
};

export { getImageLink };

