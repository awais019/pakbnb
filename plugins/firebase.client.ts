import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

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

  nuxtApp.provide("auth", auth);
});
