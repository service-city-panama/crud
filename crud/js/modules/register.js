import { ref, push, set, getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Obtener la referencia de la base de datos
const database = getDatabase();

// Obtener el formulario de registro del DOM
const registerForm = document.getElementById("registerForm");

// Función para mostrar el modal de registro
function showRegisterModal() {
  const registerModal = document.getElementById("registerModal");
  registerModal.classList.toggle("is-active");
}

// Manejar el evento submit del formulario de registro
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = registerForm["nombre"].value;
  const apodo = registerForm["apodo"].value;
  const whatsapp = registerForm["whatsapp"].value;
  const estado = registerForm["estado"].value;
  const observacion = registerForm["observacion"].value;

  try {
    // Guardar los datos en Firebase
    const newStudentRef = push(ref(database, "students"));
    await set(newStudentRef, {
      Uid: newStudentRef.key,
      Nombre: nombre,
      Apodo: apodo,
      Whatsapp: whatsapp,
      Estado: estado,
      Observacion: observacion,
    });
    console.log("Estudiante registrado correctamente");
  } catch (error) {
    console.error("Error al registrar estudiante:", error);
  }
  showRegisterModal();
});

// Exportar el formulario de registro para que pueda ser importado en otros archivos
export { registerForm };

// Agregar evento de clic al botón de "Agregar"
const openRegisterModal = document.getElementById("openRegisterModal");
openRegisterModal.addEventListener("click", showRegisterModal);

// Agregar evento de clic al botón de cerrar el modal
const closeRegisterModal = document.getElementById("closeRegisterModal");
closeRegisterModal.addEventListener("click", showRegisterModal);