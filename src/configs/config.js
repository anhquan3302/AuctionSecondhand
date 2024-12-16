import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBdM4h2aYxygrq7ghPa7trr1ZMiEqE1oWE",
    authDomain: "auction-firebase-ff9de.firebaseapp.com",
    projectId: "auction-firebase-ff9de",
    storageBucket: "auction-firebase-ff9de.appspot.com",
    messagingSenderId: "459437694003",
    appId: "1:459437694003:web:adc2dbd0218e4da5ddd746",
    measurementId: "G-4W89D990QD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const api = "http://localhost:8080/api/v1";
export {api, storage};
export {default as chartsConfig} from "./charts-config";
