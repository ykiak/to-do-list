export const filterTasks = (taskList, value) => {
    if (value === "all") {
        return taskList
    }
    else if (value === "done") {
        return taskList.filter((t) => t.done === true)
    }
    else {
        return taskList.filter((t) => t.done === false)
    }
}