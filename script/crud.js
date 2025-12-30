export const createTasks = (taskList, newTask) => {
    return [...taskList, newTask]
}

export const doneTasks = (taskList, id) => {
    return taskList.map(t => 
        t.id === id ? {...t, done: !t.done} : t
    )
}
export const editTasks = (taskList, id, newName) => {
   return taskList.map(t => 
    t.id === id ? {...t, name: newName} : t
   )
}
export const deleteTasks = (taskList, id) => {
    return taskList.filter(t => t.id !== id)
}