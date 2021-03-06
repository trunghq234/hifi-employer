import { RcFile } from "antd/lib/upload";
import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, googleProvider, storage } from "./";

const uploadImage = async (file: RcFile) => {
  try {
    const storageRef = ref(storage, `/images/${file.uid}_${new Date().valueOf()}`);
    const imageUrl = await uploadBytes(storageRef, file).then((snapshot) => {
      const url = getDownloadURL(snapshot.ref);
      return url;
    });
    return { url: imageUrl };
  } catch (error: any) {
    return { error: error?.message ?? "Something went wrong!" };
  }
};
const deteteImage = async (url: string | undefined) => {
  try {
    if (!url) return;
    const start = url.indexOf("/images%2F") + "/images%2F".length;
    const end = url.indexOf("?alt");
    const fileName = url.slice(start, end);
    const storageRef = ref(storage, `/images/${fileName}`);
    await deleteObject(storageRef);
  } catch (error: any) {
    return;
  }
};
export { uploadImage, deteteImage };
