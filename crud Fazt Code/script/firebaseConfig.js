import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyAczBzL80MoEe8qm91CCHHxX-_8iAla-S8",
    authDomain: "service-city-app.firebaseapp.com",
    databaseURL: "https://service-city-app-default-rtdb.firebaseio.com",
    projectId: "service-city-app",
    storageBucket: "service-city-app.appspot.com",
    messagingSenderId: "1068099519430",
    appId: "1:1068099519430:web:a896e65c893c36d833a8c7",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const getDocs = getDocs(collection(db, "tasks"))