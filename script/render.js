const submitButton = document.querySelector("#create")
const inputData = document.querySelector("#task")
const selectValue = document.querySelector("select")
const searchInput = document.querySelector("#search")
const renderSpace = document.querySelector(".renderSpace")
const inputSpace = document.querySelector(".inputSpace")

const alert_message = document.createElement("p")
alert_message.className = "alert_message"
const infor_message = document.createElement("p")

export const renderTasks = (taskList, table, handlers) => {
    infor_message.textContent = `You have ${handlers.onCount()[0]} tasks, ${handlers.onCount()[1]} completed and ${handlers.onCount()[2]} pending`
    infor_message.className = "inforMessage" 
    inputSpace.append(infor_message)
    if (taskList.length === 0) {
        alert_message.textContent = "No tasks yet"
        renderSpace.append(alert_message)
        table.innerHTML = ""
    } else {
        table.innerHTML = ""

        taskList.forEach(task => {
            //creates a new row for each element
            const tr = document.createElement("tr")
            const cell1 = document.createElement("td")
            cell1.className = "cell1"
            const cell2 = document.createElement("td")

            //content of cell1
            const p = document.createElement("p")
            p.className = task.done ? "done" : ""
            p.textContent = task.name

            //content of cell2
            const doneButton = document.createElement("button")
            doneButton.className = "doneB"
            doneButton.textContent = task.done ? "UNDONE" : "DONE"
            doneButton.disabled = false

            const editButton = document.createElement("button")
            editButton.className = "edit"
            editButton.textContent = "EDIT"
            editButton.disabled = task.done
            let isEditing = false

            const deleteButton = document.createElement("button")
            deleteButton.className = "delete"
            deleteButton.textContent = "DELETE"
            deleteButton.disabled = false

            //listeners
            doneButton.addEventListener("click", (event) => {
                let parent = event.target.closest("tr")
                editButton.disabled = !task.done //users cannot edit done tasks
                doneButton.textContent = task.done ? "UNDONE" : "DONE"
                parent.querySelector("p").className = task.done ? "done" : ""

                handlers.onToggleDone(task.id)
            })
            editButton.addEventListener("click", (event) => {
                let parent = event.target.closest("tr")
                //users cannot delete or done tasks while editing
                doneButton.disabled = !doneButton.disabled
                deleteButton.disabled = !deleteButton.disabled

                if (!isEditing) {
                    editButton.textContent = "SAVE"

                    let p = parent.querySelector("p")
                    let input = document.createElement("input")
                    input.className = "dinamicInput"
                    input.type = "text"
                    input.value = p.textContent

                    p.replaceWith(input)
                    isEditing = true
                } else {
                    editButton.textContent = "EDIT"

                    let input = parent.querySelector("input")
                    let p = document.createElement("p")
                    p.textContent = input.value

                    input.replaceWith(p)
                    isEditing = false

                    handlers.onEdit(task.id, input.value)
                }

            })
            deleteButton.addEventListener("click", (event) => {
                const parent = event.target.closest("tr")
                parent.remove()

                handlers.onDelete(task.id)
            })
            //appends elements in table
            cell1.append(p)
            cell2.append(doneButton, editButton, deleteButton)
            tr.append(cell1, cell2)
            table.append(tr)

            //cleans alert alert_message
            alert_message.textContent = ""
        })
    }
}

export const renderCreateTasks = (handlers) => {
    submitButton.addEventListener("click", (event) => {
        event.preventDefault()

        if (!inputData.value.trim()) {
            alert_message.textContent = "You must type a name for your task"
            renderSpace.append(alert_message)
            table.innerHTML = ""
        } else {
            handlers.onCreate(inputData.value)
        }
        inputData.value = ""
    })
}

export const renderFilterTasks = (handlers) => {
    selectValue.addEventListener("change", () => {
        handlers.onFilter(selectValue.value)
    })
}

export const renderSearchTasks = (handlers) => {
    searchInput.addEventListener("input", () => {
        handlers.onSearch(searchInput.value, selectValue.value)
    })
}