import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

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

const getImageLink = async (id, name, file) => {
  const storageRef = ref(storage, `${id}/${name}.png`);

  try {
    // const getStorageRef = ref(storage, `${id}`);
    // listAll(getStorageRef)
    //   .then((res) => {
    //     res.items.forEach(async (item) => {
    //       if (item.name == `${id}/${name}.png`) {
    //         const url = await getDownloadURL(storageRef);
    //         // console.log(url);
    //         return url;
    //       }
    //     });
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //   });
    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);
    // console.log(url);
    return url;
  } catch (error) {
    // console.log("Error uploading file or getting download URL:", error);
    throw error;
  }
};

export const deleteImageLink = async (id, name, file) => {
  const storageRef = ref(storage, `${id}/${name}.png`);
  // Delete the file
  deleteObject(storageRef)
    .then(() => {
      // File deleted successfully
      return true;
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    //   console.log("Error deleting file:", error);
      return false;
    });
};

export { getImageLink };
