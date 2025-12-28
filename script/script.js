const submitButton = document.querySelector("#create")
const inputData = document.querySelector("#task")
const table = document.querySelector("#table")
const alert_message = document.querySelector("#alert_message")
const taskList = JSON.parse(localStorage.getItem("tasks")) || []

//functions
//RENDER TASK and ACTIONS
const renderTask = () => {
    table.innerHTML = ""

    taskList.forEach(element => {
        //create a new row for each element
        let tr = document.createElement("tr")
        let cell1 = document.createElement("td")
        let cell2 = document.createElement("td")
        let p = document.createElement("p")

        //create buttons (content of cell2) and their actions
        //DONE
        const doneButton = document.createElement("button")
        doneButton.textContent = "DONE"
        let isDone = false //state
        doneButton.addEventListener("click", (event) => {
            let parent = event.target.closest("tr")
            if (!isDone) {
                doneButton.textContent = "UNDONE"
                parent.querySelector("p").className = "done"
                editButton.disabled = true
                isDone = true
            } else {
                doneButton.textContent = "DONE"
                parent.querySelector("p").className = ""
                editButton.disabled = false
                isDone = false
            }
        })

        //EDIT
        const editButton = document.createElement("button")
        editButton.textContent = "EDIT"
        let isEditing = false //state
        editButton.addEventListener("click", (event) => {
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

                input.replaceWith(p)
                isEditing = false
            }
        })

        //DELETE
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "DELETE"
        deleteButton.addEventListener("click", (event) => {
            let parent = event.target.closest("tr")
            let acessP = parent.children[0].children[0]

            let newTaskList = taskList.filter(((t) => t !== acessP.textContent))
            localStorage.setItem("tasks", JSON.stringify(newTaskList))

            parent.remove()
        })

        //content of cell1
        p.textContent = element

        //append elements in table
        cell1.append(p)
        cell2.append(doneButton, editButton, deleteButton)
        tr.append(cell1, cell2)
        table.append(tr)

        //clean alert_message 
        alert_message.textContent = ""
    })
}
//CREATE TASK
submitButton.addEventListener("click", (event) => {
    event.preventDefault()
    if (!inputData.value.trim()) {
        alert_message.textContent = "You must type a name for your task"
    } else {
        taskList.push(inputData.value)
        localStorage.setItem("tasks", JSON.stringify(taskList))
    }

    renderTask()
    //clean input
    inputData.value = ""
})

window.addEventListener("load", renderTask())


