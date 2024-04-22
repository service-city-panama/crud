import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    set,
    onValue,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAczBzL80MoEe8qm91CCHHxX-_8iAla-S8",
    authDomain: "service-city-app.firebaseapp.com",
    projectId: "service-city-app",
    storageBucket: "service-city-app.appspot.com",
    messagingSenderId: "1068099519430",
    appId: "1:1068099519430:web:a896e65c893c36d833a8c7",
    databaseURL: "https://service-city-app-default-rtdb.firebaseio.com/",
};

export const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const openModal = document.getElementById("openRegisterModal");
const modal = document.getElementById("modal");
const updateModal = document.getElementById("modalUpdate");
const updateForm = document.getElementById("updateForm");
const closeUpdateModal = document.getElementById('closeUpdateModal')
const closeModal = document.getElementById("closeRegisterModal");
const registerForm = document.getElementById("registerForm");
const studentsTable = document.getElementById("studentsTable");
const studentRef = ref(database, "students");

const showRegisterModal = () => {
    modal.classList.toggle("is-active");
};

openModal.addEventListener("click", showRegisterModal);
closeModal.addEventListener("click", showRegisterModal);

const deleteStudent = (uid) => {
    firebase.database().ref(`students/${uid}`).remove();
};

const showUpdateModal = () => {
    updateModal.classList.toggle("is-active");
};

closeUpdateModal.addEventListener('click', showUpdateModal)

window.addEventListener("DOMContentLoaded", async (e) => {
    await onValue(studentRef, (snapshot) => {
        studentsTable.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            const studentData = childSnapshot.val();
            const studentKId = childSnapshot.key;
            studentsTable.innerHTML += `
            <tr>
                <th><i class="bi bi-person-square"><i></th>
                <td>${studentData.Nombre}</td>
                <td>${studentData.Apodo}</td>
                <td>${studentData.WhatsApp}</td>
                <td>${studentData.Estado}</td>
                <td>${studentData.Observacion}</td>
                <td>
                    <button class="button is-warning" data-id="${studentData.Uid}">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
                <td>
                    <button class="button is-danger" data-id='${studentData.Uid}">
                        <i class="bi bi-journal-x"></i>
                    </button>
                </td>
            </tr>`;

            const updateButtons = document.querySelectorAll(".is-warning");
            updateButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    showUpdateModal();
                    const studentId = e.target.dataset.id;
                    const studentDataRef = ref(database, `students/${e.target.dataset.id}`)

                    get(studentDataRef).then((snapshot) => {
                        const data = snapshot.val();
                        updateForm["nombre"].value = data.nombre;
                        updateForm["apodo"].value = data.apodo;
                        updateForm["whatsapp"].value = data.whatsapp;
                        updateForm["estado"].value = data.estado;
                        updateForm["observacion"].value = data.observacion;
                    }).catch((error) => {
                        console.error("Error al obtener los datos del estudiante:", error);
                    });

                    updateForm.addEventListener('submit', async (e) => {
                        e.preventDefault();
                        const nombre = updateForm["nombre"].value;
                        const apodo = updateForm["apodo"].value;
                        const whatsapp = updateForm["whatsapp"].value;
                        const estado = updateForm["estado"].value;
                        const observacion = updateForm["observacion"].value;

                        try {
                            await ref(database, `students/${e.target.dataset.id}`)
                                .update({
                                    Nombre: nombre,
                                    Apodo: apodo,
                                    whatsapp: whatsapp,
                                    Estado: estado,
                                    Observacion: observacion,
                                });
                            console.log("Editado correctamente");
                        } catch (error) {
                            console.error("Error al editar:", error);
                        };
                        showRegisterModal();
                    });
                });
            });

            const studentId = e.target.dataset.id;
            const studentRef = ref(database, `students/${studentId}`);
            showRegisterModal();

            // Obtener los datos del estudiante
            get(studentRef).then((snapshot) => {
                const studentData = snapshot.val();
                registerForm["nombre"].value = data.nombre;
                registerForm["apodo"].value = data.apodo;
                registerForm["whatsapp"].value = data.whatsapp;
                registerForm["estado"].value = data.estado;
                registerForm["observacion"].value = data.observacion;
            });
        });
    });

    const deleteButtons = document.querySelectorAll(".is-danger");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
      
            deleteStudent(studentId);
        });
    });
});

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = registerForm["nombre"].value;
    const apodo = registerForm["apodo"].value;
    const whatsapp = registerForm["whatsapp"].value;
    const estado = registerForm["estado"].value;
    const observacion = registerForm["observacion"].value;

    const newStudentRef = push(studentRef);
    set(newStudentRef, {
        Uid: newStudentRef.key,
        Nombre: nombre,
        Apodo: apodo,
        whatsapp: whatsapp,
        Estado: estado,
        Observacion: observacion,
    })
        .then(() => {
            console.log("Estudiante registrado correctamente");
        })
        .catch((error) => {
            console.error("Error al registrar estudiante:", error);
        });
    showRegisterModal();
});
