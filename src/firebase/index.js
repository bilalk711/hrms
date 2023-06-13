import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
    apiKey: "AIzaSyCwjb-oH9SeCkePIm-sd-ckpQuMkW_IjW0",
    authDomain: "hrms-app-fe7d7.firebaseapp.com",
    projectId: "hrms-app-fe7d7",
    storageBucket: "hrms-app-fe7d7.appspot.com",
    messagingSenderId: "579683914695",
    appId: "1:579683914695:web:2f5570ee10f060ff1bbfe2",
    measurementId: "G-H7K47293XG"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

