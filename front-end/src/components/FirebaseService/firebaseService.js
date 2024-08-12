import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Read the file from the filesystem

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

export const deleteImageLink = async (id, name, file) => {
  const storageRef = ref(storage, `${id}/${name}.png`);

  // Delete the file
  deleteObject(storageRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export { getImageLink };
