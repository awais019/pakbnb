import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig().public;

  const firebaseConfig = {
    apiKey: runtimeConfig.firebase.apiKey,
    authDomain: runtimeConfig.firebase.authDomain,
    projectId: runtimeConfig.firebase.projectId,
    storageBucket: runtimeConfig.firebase.storageBucket,
    messagingSenderId: runtimeConfig.firebase.messagingSenderId,
    appId: runtimeConfig.firebase.appId,
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  const storage = getStorage(app);

  nuxtApp.provide("auth", auth);
  nuxtApp.provide("uploadImage", async (folderName: string, file: File) => {
    const storageRef = ref(storage, folderName + file.name);
    await uploadBytes(storageRef, file);
    const URL = await getDownloadURL(storageRef);
    return URL;
  });
});
