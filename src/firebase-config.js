// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDAjcRODXx6nquiMi_BNRvbQ3pytdYVUNU",
    authDomain: "fir-study-2c509.firebaseapp.com",
    projectId: "fir-study-2c509",
    storageBucket: "fir-study-2c509.appspot.com",
    messagingSenderId: "307451445033",
    appId: "1:307451445033:web:de010b795d33e57bff4138",
    measurementId: "G-N2SHTE2EJ7"
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);