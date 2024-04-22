
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
const db = getFirestore(app);

// Create
const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("tasks-container");

const saveTask = async (title, description) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), {
            title,
            description,
        });
        console.log("Documento agregado con ID: ", docRef.id);
        console.log(title, description);
    } catch (error) {
        console.error("Error al agregar documento: ", error);
    }
};

// Read
const getTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot;
}

window.addEventListener("DOMContentLoaded", async (e) => {
    const querySnapshot = await getTasks();
    querySnapshot.forEach((doc => {
        console.log(doc.data());
        taskContainer.innerHTML +=
        `<div class="card card-body mt-2 border-primary">
    ${doc.data().title}
    ${doc.data().description}
    </div>`;
    }));
});

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = taskForm["task-title"].value;
    const description = taskForm["task-description"].value;

    await saveTask(title, description);

    taskForm.reset();
    title.focus();
});
