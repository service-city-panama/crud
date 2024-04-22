import { db } from "./firebaseConfig";
import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
