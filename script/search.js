export const searchTasks = (taskList, userInput) => {
    let normalizedInput = userInput.toLowerCase().trim()

    return taskList.filter(t => t.name.toLowerCase().trim().includes(normalizedInput))
}