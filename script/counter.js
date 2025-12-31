export const countTasks = (taskList) => {
    let doneTasks = taskList.filter(t => t.done === true)
    
    return [taskList.length, doneTasks.length, taskList.length - doneTasks.length]
}