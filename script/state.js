export const getTasks = () => {
    return JSON.parse(localStorage.getItem("tasks")) || []
}

export const saveTasks = (taskList) => {
    localStorage.setItem("tasks", JSON.stringify(taskList))
}