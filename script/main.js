import { getTasks, saveTasks } from "./state.js"
import { renderTasks, renderCreateTasks, renderFilterTasks, renderSearchTasks } from "./render.js"
import { doneTasks, editTasks, deleteTasks, createTasks } from "./crud.js"
import { generateId } from "./utils.js"
import { filterTasks } from "./filters.js"
import { searchTasks } from "./search.js"
import { countTasks } from "./counter.js"

const table = document.querySelector("#table")

let taskList = getTasks()

export const handlers = {
    onCount() {
        return countTasks(taskList)
    },
    onSearch(userInput, selectValue) {
        let filteredTaskList = filterTasks(taskList, selectValue)
        let results = searchTasks(filteredTaskList, userInput)
        renderTasks(results, table, handlers)
    },
    onFilter(selectValue) {
        let filtered = filterTasks(taskList, selectValue)
        renderTasks(filtered, table, handlers)
    },
    onCreate(taskName) {
        let newTask = {
            id: generateId(),
            name: taskName,
            done: false
        }
        taskList = createTasks(taskList, newTask)
        saveTasks(taskList)
        renderTasks(taskList, table, handlers)
    },
    onToggleDone(id) {
        taskList = doneTasks(taskList, id)
        saveTasks(taskList)
        renderTasks(taskList, table, handlers)
    },
    onEdit(id, newName) {
        taskList = editTasks(taskList, id, newName)
        saveTasks(taskList)
        renderTasks(taskList, table, handlers)
    },
    onDelete(id) {
        taskList = deleteTasks(taskList, id)
        saveTasks(taskList)
        renderTasks(taskList, table, handlers)
    }
}

renderTasks(taskList, table, handlers)
renderCreateTasks(handlers)
renderFilterTasks(handlers)
renderSearchTasks(handlers)