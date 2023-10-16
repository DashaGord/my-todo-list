import axios from "axios"
import {
  CreateTaskRequest,
  DeleteTaskResponse,
  Task,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "../interfaces/Task"
import { Dispatch } from "redux"
import { addTask, removeTask, setLoading, updateTask } from "../app/tasksSlice"

export const fetchTasks = (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  axios
    .get("/api/task")
    .then((response) => {
      const data: Task[] = response.data
      data.forEach((task: Task) => dispatch(addTask(task)))
    })
    .catch((error) => {
      alert(error)
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}

export const callCreateTask = (
  dispatch: Dispatch,
  request: CreateTaskRequest,
) => {
  dispatch(setLoading(true))
  axios
    .post("/api/task", { request })
    .then((response) => {
        alert("Задача создана")
      dispatch(addTask(response.data as Task))
    })
    .catch((error) => {
      alert(error)
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}

export const callDeleteTask = (dispatch: Dispatch, taskId: number) => {
  dispatch(setLoading(true))
  axios
    .delete(`/api/task/${taskId}`)
    .then((response) => {
        alert("Задача удалена")
      const deleteTaskResponse: DeleteTaskResponse = response.data
      dispatch(removeTask(deleteTaskResponse))
    })
    .catch((error) => {
      alert(error)
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}

export const callUpdateTask = (
  dispatch: Dispatch,
  request: UpdateTaskRequest,
) => {
  dispatch(setLoading(true))
  axios
    .patch("/api/task/", { request })
    .then((response) => {
        alert("Задача обновлена")
      const updateTaskResponse: UpdateTaskResponse = response.data
      dispatch(updateTask(updateTaskResponse))
    })
    .catch((error) => {
      alert(error)
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}
