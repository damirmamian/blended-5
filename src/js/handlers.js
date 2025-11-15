import { nanoid } from "nanoid";
import localStorageApi from "./local-storage-api";
import { renderTasks } from "./render-tasks";

export function onFormSubmit(e) {
    e.preventDefault();
    const { taskName, taskDescription } = e.target.elements
    const name = taskName.value.trim()
    const description = taskDescription.value.trim()
    if (!name || !description) {
        console.log("Fill in the text")
        return
    }
    const task = {
        name,
        description,
        id: nanoid()
    }

    localStorageApi.saveTasks(task)
    const tasks = localStorageApi.getTasks()
    renderTasks(tasks)

    e.target.reset()
}

export function onTaskDelete(e) {
    if (e.target.nodeName !== "BUTTON") {
        return
    }
    const taskId = e.target.dataset.id
    localStorageApi.deleteTask(taskId)
    const tasks = localStorageApi.getTasks()
    renderTasks(tasks)
}