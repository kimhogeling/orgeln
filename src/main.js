import App from './App.svelte'
import {initializeApp} from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
})

const app = new App({
  target: document.getElementById('app')
})

// const analytics = getAnalytics(app);

export default app
