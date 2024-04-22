import { ref, push, set, get, database } from "../../firebase.js";

const databaseRef = ref(database, "students");

const registerStudent = async (
  nombre,
  apodo,
  whatsapp,
  estado,
  observacion
) => {
  try {
    const newStudentRef = push(databaseRef);
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
};

const getStudents = async () => {
  try {
    const snapshot = await get(databaseRef);
    return snapshot;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
};

// Otras funciones para actualizar, eliminar, etc.

export { registerStudent, getStudents };
