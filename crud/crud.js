import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  get,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAczBzL80MoEe8qm91CCHHxX-_8iAla-S8",
  authDomain: "service-city-app.firebaseapp.com",
  projectId: "service-city-app",
  storageBucket: "service-city-app.appspot.com",
  messagingSenderId: "1068099519430",
  appId: "1:1068099519430:web:a896e65c893c36d833a8c7",
  databaseURL: "https://service-city-app-default-rtdb.firebaseio.com/",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Register action
// Open/Close - Register Modal
const registerModal = document.getElementById("registerModal");
const openRegisterModal = document.getElementById("openRegisterModal");
const closeRegisterModal = document.getElementById("closeRegisterModal");
const registerForm = document.getElementById("registerForm");
const showRegisterModal = () => {
  registerModal.classList.toggle("is-active");
};
openRegisterModal.addEventListener("click", showRegisterModal);
closeRegisterModal.addEventListener("click", showRegisterModal);

// Escucha el evento submit del formulario de registro
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = registerForm["nombre"].value;
  const apodo = registerForm["apodo"].value;
  const whatsapp = registerForm["whatsapp"].value;
  const estado = registerForm["estado"].value;
  const observacion = registerForm["observacion"].value;

  try {
   // Guarda los datos en Firebase
  const newStudentRef = push(ref(database, "students"));
  await set(newStudentRef, {
    Uid: newStudentRef.key,
    Nombre: nombre,
    Apodo: apodo,
    Whatsapp: whatsapp,
    Estado: estado,
    Observacion: observacion,
  })
      console.log("Estudiante registrado correctamente");
    } catch (error) {
      console.error("Error al registrar estudiante:", error);
    };
    showRegisterModal();
});

// Open/Close - Update Modal
const updateModal = document.getElementById("updateModal");
const openUpdateModal = document.getElementById("openUpdateModal");
const closeUpdateModal = document.getElementById("closeUpdateModal");
const updateForm = document.getElementById("updateForm");
const showUpdateModal = () => {
  updateModal.classList.toggle("is-active");
};
openUpdateModal.addEventListener("click", showUpdateModal);
closeUpdateModal.addEventListener("click", showUpdateModal);

let studentId;
openUpdateModal.addEventListener("click", (e) => {
  const studentId = e.target.dataset.id;
});

// Función para obtener los datos del estudiante
const getStudentData = (studentId) => {
  const studentRef = ref(database, `students/${studentId}`);
  get(studentRef).then((snapshot) => {
    const studentData = snapshot.val();

    if (studentData) {
      registerForm["nombre"].value = data.nombre;
      registerForm["apodo"].value = data.apodo;
      registerForm["whatsapp"].value = data.whatsapp;
      registerForm["estado"].value = data.estado;
      registerForm["observacion"].value = data.observacion;
    }
  });
};

// Llamar a la función para obtener los datos del estudiante
window.addEventListener("DOMContentLoaded", () => {
  if (studentId) {
    getStudentData(studentId);
  }
});

window.addEventListener("DOMContentLoaded", async (e) => {
  const studentRef = ref(database, "students");

  await onValue(studentRef, (students) => {
    studentsTable.innerHTML = "";
    students.forEach((student) => {
      let studentData = student.val();
      let studentKey = student.key;
      studentsTable.innerHTML += `
            <tr>
                <td>${studentData.Nombre}</td>
                <td>${studentData.Apodo}</td>
                <td>${studentData.Whatsapp}</td>
                <td>${studentData.Estado}</td>
                <td>${studentData.Observacion}</td>
                <td>
                    <button class="button is-warning">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                </td>
                <td>
                    <button class="button is-danger">
                        <i class="bi bi-journal-x"></i>
                    </button>
                </td>
            </tr>`;

      const updateButtons = document.querySelectorAll(".is-warning");
      updateButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          showUpdateModal();
          const uid = e.target.dataset.id;
          updateForm["nombre"].value = studentData.Nombre;
          updateForm["apodo"].value = studentData.Apodo;
          updateForm["whatsapp"].value = studentData.whatsapp;
          updateForm["estado"].value = studentData.Estado;
          updateForm["observacion"].value = studentData.Observacion;

          updateForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = updateForm["nombre"].value;
            const apodo = updateForm["apodo"].value;
            const whatsapp = updateForm["whatsapp"].value;
            const estado = updateForm["estado"].value;
            const observacion = updateForm["observacion"].value;

            firebase
              .database()
              .ref(`students/${uid}`)
              .update({
                Nombre: nombre,
                Apodo: apodo,
                whatsapp: whatsapp,
                Estado: estado,
                Observacion: observacion,
              })
              .then(() => {
                console.log("Editado correctamente");
              })
              .catch((error) => {
                console.error("Error al editar:", error);
              });
            showUpdateModal();
          });
        });
      });

      const deleteButtons = document.querySelectorAll(".is-danger");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const studentId = e.target.dataset.id;
          deleteStudent(studentId);
        });
      });
    });
  });
});

const deleteStudent = (uid) => {
  firebase.database().ref(`students/${uid}`).remove();
};
