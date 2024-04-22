import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAczBzL80MoEe8qm91CCHHxX-_8iAla-S8",
  authDomain: "service-city-app.firebaseapp.com",
  projectId: "service-city-app",
  storageBucket: "service-city-app.appspot.com",
  messagingSenderId: "1068099519430",
  appId: "1:1068099519430:web:a896e65c893c36d833a8c7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const openModal = document.getElementById("openRegisterModal");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeRegisterModal");
const registerForm = document.getElementById("registerForm");

const studentRef = ref(database, "students");

const showUpdateModal = () => {
  updateModal.classList.toggle("is-active");
};

openModal.addEventListener("click", showRegisterModal);
closeModal.addEventListener("click", showRegisterModal);

window.addEventListener("DOMContentLoaded", async (e) => {
  await studentRef.on("value", (students) => {
    studentsTable.innerHTML = "";
    students.forEach((student) => {
      let studentData = student.val();
      studentsTable.innerHTML += `<tr>
          
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
      updateButtons.forEach((button) =>
        button.addEventListener("click", (e) => {
          showRegisterModal();
          firebase
            .database()
            .ref(`students/${e.target.dataset.id}`)
            .once("value")
            .then((student) => {
              const data = student.val();
              console.log(data);
              registerForm["nombre"].value = data.nombre;
              registerForm["apodo"].value = data.apodo;
              registerForm["whatsapp"].value = data.whatsapp;
              registerForm["estado"].value = data.estado;
              registerForm["observacion"].value = data.observacion;




            });
        })
      );

      const deleteButtons = document.querySelectorAll(".is-danger");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          deleteStudent(e.target.dataset.id);
        });
      });
    });
  });
});
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = updateForm["nombre"].value;
  const apodo = updateForm["apodo"].value;
  const whatsapp = updateForm["whatsapp"].value;
  const estado = updateForm["estado"].value;
  const observacion = updateForm["observacion"].value;

  const registerStudent = studentRef.push();
  registerStudent
    .set({
      Uid: registerStudent.path.pieces_[1],
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
