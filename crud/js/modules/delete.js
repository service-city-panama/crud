import { database, ref, remove } from "../../firebase.js";

const deleteStudent = (uid) => {
  const studentRef = ref(database, `students/${uid}`);
  remove(studentRef)
    .then(() => {
      console.log("Estudiante eliminado correctamente");
    })
    .catch((error) => {
      console.error("Error al eliminar estudiante:", error);
    });
};

export { deleteStudent };
