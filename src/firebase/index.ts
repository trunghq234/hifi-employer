import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCruTIhkiTaMnlQxqVrizCK3t1D-XYYsW4",
  authDomain: "hifi-3ab1d.firebaseapp.com",
  projectId: "hifi-3ab1d",
  storageBucket: "hifi-3ab1d.appspot.com",
  messagingSenderId: "1044923880176",
  appId: "1:1044923880176:web:b5edf6ff5362fc58cae835",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
