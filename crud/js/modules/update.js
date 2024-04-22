import { database, ref, get } from "../../firebase.js";

const updateForm = document.getElementById("updateForm");

const getStudentData = (studentId) => {
  const studentRef = ref(database, `students/${studentId}`);
  get(studentRef).then((snapshot) => {
    const studentData = snapshot.val();

    if (studentData) {
      updateForm["nombre"].value = studentData.Nombre;
      updateForm["apodo"].value = studentData.Apodo;
      updateForm["whatsapp"].value = studentData.Whatsapp;
      updateForm["estado"].value = studentData.Estado;
      updateForm["observacion"].value = studentData.Observacion;
    }
  });
};

// Definición de showUpdateModal
function showUpdateModal() {
  // Código para mostrar el modal de actualización
}

export { updateForm, getStudentData, showUpdateModal };
