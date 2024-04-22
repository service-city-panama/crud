export const getTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    return querySnapshot;
}

window.addEventListener("DOMContentLoaded", async (e) => {
    const querySnapshot = await getTasks();
    querySnapshot.forEach((doc => {
        console.log(doc.data());
        taskContainer.innerHTML +=
        `<div class="card card-body mt-2 border-primary">
    ${doc.data().title}
    ${doc.data().description}
    </div>`;
    }));
});

taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = taskForm["task-title"].value;
    const description = taskForm["task-description"].value;

    await saveTask(title, description);

    taskForm.reset();
    title.focus();
});
