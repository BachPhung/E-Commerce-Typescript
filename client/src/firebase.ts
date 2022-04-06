import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "e-commerce-7d49a.firebaseapp.com",
  projectId: "e-commerce-7d49a",
  storageBucket: "e-commerce-7d49a.appspot.com",
  messagingSenderId: "967535279906",
  appId: "1:967535279906:web:4ba8f85382815db826af7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app