const submitButton = document.querySelector("#create")
const inputData = document.querySelector("#task")
const table = document.querySelector("#table")
const alert_message = document.querySelector("#alert_message")
const selectValue = document.querySelector("select")
const searchInput = document.querySelector("#search")
let taskList = JSON.parse(localStorage.getItem("tasks")) || []

//functions
//RENDER TASKS and ACTIONS
const renderTasks = (array) => {
    if (array.length === 0) {
        alert_message.textContent = "No tasks yet"
        table.innerHTML = ""
    } else {
        table.innerHTML = ""

        array.forEach(element => {
            //create a new row for each element
            let tr = document.createElement("tr")
            let cell1 = document.createElement("td")
            let cell2 = document.createElement("td")
            let p = document.createElement("p")
            p.className = element.done ? "done" : ""

            //create buttons (content of cell2) and their actions
            //DONE
            const doneButton = document.createElement("button")
            doneButton.disabled = false
            doneButton.textContent = element.done ? "UNDONE" : "DONE"
            doneButton.addEventListener("click", (event) => {
                editButton.disabled = !element.done

                let parent = event.target.closest("tr")
                element.done = !element.done //change state

                doneButton.textContent = element.done ? "UNDONE" : "DONE"
                parent.querySelector("p").className = element.done ? "done" : ""

                taskList = taskList.map(t => {
                    if (t.id === element.id) {
                        return { ...t, done: element.done }
                    } else {
                        return t
                    }
                })
                localStorage.setItem("tasks", JSON.stringify(taskList))
            })

            //EDIT
            const editButton = document.createElement("button")
            editButton.disabled = element.done
            editButton.textContent = "EDIT"
            let isEditing = false //state
            editButton.addEventListener("click", (event) => {
                doneButton.disabled = !doneButton.disabled
                deleteButton.disabled = !deleteButton.disabled

                let parent = event.target.closest("tr")
                if (!isEditing) {
                    editButton.textContent = "SAVE"
                    let p = parent.querySelector("p")

                    let input = document.createElement("input")
                    input.type = "text"
                    input.value = p.textContent

                    p.replaceWith(input)
                    isEditing = true
                } else {
                    editButton.textContent = "EDIT"
                    let input = parent.querySelector("input")

                    let p = document.createElement("p")
                    p.textContent = input.value

                    taskList = taskList.map(t => {
                        if (t.id === element.id) {
                            return { ...t, name: p.textContent }
                        } else {
                            return t
                        }
                    })
                    localStorage.setItem("tasks", JSON.stringify(taskList))

                    input.replaceWith(p)
                    isEditing = false
                }
            })

            //DELETE
            const deleteButton = document.createElement("button")
            deleteButton.disabled = false
            deleteButton.textContent = "DELETE"
            deleteButton.addEventListener("click", (event) => {
                let parent = event.target.closest("tr")
                parent.remove()

                taskList = taskList.filter((t) => t.id !== element.id)
                localStorage.setItem("tasks", JSON.stringify(taskList))
            })

            //content of cell1
            p.textContent = element.name

            //append elements in table
            cell1.append(p)
            cell2.append(doneButton, editButton, deleteButton)
            tr.append(cell1, cell2)
            table.append(tr)

            //clean alert_message 
            alert_message.textContent = ""
        })
    }
}
//CREATE TASKS
submitButton.addEventListener("click", (event) => {
    event.preventDefault()
    if (!inputData.value.trim()) {
        alert_message.textContent = "You must type a name for your task"
    } else {
        const generateId = () => {
            return Math.random().toString(36).slice(2, 10)
        }

        let obj = {
            id: generateId(),
            name: inputData.value,
            done: false
        }

        taskList.push(obj)

        localStorage.setItem("tasks", JSON.stringify(taskList))
    }

    renderTasks(taskList)
    //clean input
    inputData.value = ""
})

//FILTER TASKS
selectValue.addEventListener("change", () => {
    let doneTaskList = taskList.filter((t) => t.done === true)
    let undoneTaskList = taskList.filter((t) => t.done === false)

    if (selectValue.value === "all") {
        renderTasks(taskList)
    }
    else if (selectValue.value === "done") {
        renderTasks(doneTaskList)
    }
    else {
        renderTasks(undoneTaskList)
    }
})

//SEARCH TASKS
searchInput.addEventListener("input", () => {
    let normalizedInput = searchInput.value.toLowerCase().trim()
    let  results = []
    
    taskList.forEach((t) => {
        if(selectValue.value === "done" && t.done === true && t.name.toLowerCase().trim().includes(normalizedInput)){
            results.push(t)
            renderTasks(results)
        }
        else if(selectValue.value === "undone" && t.done === false && t.name.toLowerCase().trim().includes(normalizedInput)){
            results.push(t)
            renderTasks(results)
        }else if(selectValue.value === "all" && t.name.toLowerCase().trim().includes(normalizedInput)){
            results.push(t)
            renderTasks(results)
        }
    })

})

window.addEventListener("load", renderTasks(taskList))


