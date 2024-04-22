import { ref, get, database } from "../../firebase.js";

// Función para mostrar los datos en la tabla
const displayStudents = (snapshot, studentsTable) => {
  studentsTable.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos datos
  snapshot.forEach((childSnapshot) => {
    const studentData = childSnapshot.val();
    const studentKey = childSnapshot.key;
    const { Nombre, Apodo, Whatsapp, Estado, Observacion } = studentData;
    
    // Crear una fila de tabla HTML para cada estudiante
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${Nombre}</td>
      <td>${Apodo}</td>
      <td>${Whatsapp}</td>
      <td>${Estado}</td>
      <td>${Observacion}</td>
      <td class="display-flex-center">
        <button class="button is-warning" data-id="${studentKey}">
          <i class="bi bi-pencil-square"></i>
        </button>
      </td>
      <td>
        <button class="button is-danger btn-delete" data-id="${studentKey}">
          <i class="bi bi-journal-x"></i>
        </button>
      </td>
    `;
    studentsTable.appendChild(row); // Agregar la fila a la tabla
  });
};

// Exportar la función para que pueda ser importada en otros archivos
export { displayStudents };
