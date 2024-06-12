import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from 'fs';

const firebaseConfig = {
  apiKey: "AIzaSyCDSqTs8-_B_hHkUP77OgJhmn1bQ8GhtaI",
  authDomain: "rentify-e4acd.firebaseapp.com",
  projectId: "rentify-e4acd",
  storageBucket: "rentify-e4acd.appspot.com",
  messagingSenderId: "487474656037",
  appId: "1:487474656037:web:342469a69eea3ca56620cc",
  measurementId: "G-BB68X8H9ZJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Read the file from the filesystem


const getImageLink = async (id,name,path) => {

const file = fs.readFileSync(path);
const storageRef = ref(storage, `${id}/${name}.png`);

try {

  await uploadBytes(storageRef, file);



  const url = await getDownloadURL(storageRef);

  fs.unlink(path,(err) => {
    if (err) {
      console.log("not deleted");
    } 
  })
  return url; 
} catch (error) {
  console.error('Error uploading file or getting download URL:', error);
  throw error; 
}
}

export {getImageLink};