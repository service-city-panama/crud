import { ref, get, database } from "../firebase.js";
import { registerForm } from "./modules/register.js";
import {
  getStudentData,
  showUpdateModal,
} from "./modules/update.js";
import { deleteStudent } from "./modules/delete.js";
import { registerStudent, getStudents } from "./modules/databaseOperations.js";
import { displayStudents } from "./modules/displayData.js";

window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Obtener los datos de los estudiantes
    const snapshot = await getStudents();
    // Mostrar los datos de los estudiantes en la tabla
    const studentsTable = document.getElementById("studentsTable");
    if (snapshot) {
      displayStudents(snapshot, studentsTable);
    }
  } catch (error) {
    console.error("Error al obtener los datos de los estudiantes:", error);
  }
});

// Manejar el evento submit del formulario de registro
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Obtener los valores del formulario
  const nombre = registerForm["nombre"].value;
  const apodo = registerForm["apodo"].value;
  const whatsapp = registerForm["whatsapp"].value;
  const estado = registerForm["estado"].value;
  const observacion = registerForm["observacion"].value;

  try {
    // Registrar al estudiante utilizando la función de registro
    await registerStudent(nombre, apodo, whatsapp, estado, observacion);
    // Actualizar la tabla mostrando los nuevos datos
    updateStudentsTable();
  } catch (error) {
    console.error("Error al registrar estudiante:", error);
  }
});

const updateButtons = document.querySelectorAll(".is-warning");
updateButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("Botón de editar clickeado");
    const studentId = e.target.dataset.id;
    getStudentData(studentId);
    showUpdateModal(); // Aquí utilizamos showUpdateModal después de importarlo
    // Resto del código para actualizar el formulario de actualización con los datos del estudiante
  });
});

const deleteButtons = document.querySelectorAll(".btn-delete");
deleteButtons.forEach((button) => {
  button.addEventListener("click", async (e) => {
    const studentId = e.target.dataset.id;
    await deleteStudent(studentId);
    // Después de eliminar un estudiante, actualizar la tabla
    updateStudentsTable();
  });
});

// abrir el modal de actualización y obtener los datos del estudiante
const openUpdateModal = document.getElementById("openUpdateModal");
openUpdateModal.addEventListener("click", showUpdateModal);

// Obtener una referencia a la base de datos
const databaseRef = ref(database, "students");

// Obtener los datos de Firebase
get(databaseRef)
  .then((snapshot) => {
    // Llamar a la función displayStudents para mostrar los datos en la tabla
    const studentsTable = document.getElementById("studentsTable");
    displayStudents(snapshot, studentsTable);
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });

// Función para obtener y mostrar los datos en la tabla
const updateStudentsTable = async () => {
  const studentsTable = document.getElementById("studentsTable");
  const snapshot = await getStudents();
  if (snapshot) {
    displayStudents(snapshot, studentsTable);
  }
};

// Llamar a la función para obtener y mostrar los datos en la tabla al cargar la página
updateStudentsTable();

updateButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("Botón de editar clickeado");
    const studentId = e.target.dataset.id;
    getStudentData(studentId);
    showUpdateModal(); // Aquí utilizamos showUpdateModal después de importarlo
    // Resto del código para actualizar el formulario de actualización con los datos del estudiante
  });
});
