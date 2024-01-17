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
import { toast } from "react-toastify"

// Создайте экземпляр axios с предопределенной конфигурацией
const api = axios.create({
  baseURL: "http://localhost:3000",
})

export const fetchTasks = (dispatch: Dispatch) => {
  dispatch(setLoading(true))
  api
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
  api
    .post("/api/task", { request })
    .then((response) => {
      toast.success("Задача создана!", { autoClose: 3000 })
      dispatch(addTask(response.data as Task))
    })
    .catch(() => {
      toast.error("Задача не создана!", { autoClose: 3000 })
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}

export const callDeleteTask = (dispatch: Dispatch, taskId: number) => {
  dispatch(setLoading(true))
  api
    .delete(`/api/task/${taskId}`)
    .then((response) => {
      toast.success("Задача удалена!", { autoClose: 3000 })
      const deleteTaskResponse: DeleteTaskResponse = response.data
      dispatch(removeTask(deleteTaskResponse))
    })
    .catch(() => {
      toast.error("Задача не удалена!", { autoClose: 3000 })
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
  api
    .patch("/api/task/", { request })
    .then((response) => {
      toast.success("Задача обновлена!", { autoClose: 3000 })
      const updateTaskResponse: UpdateTaskResponse = response.data
      dispatch(updateTask(updateTaskResponse))
    })
    .catch(() => {
      toast.error("Задача не обновлена!", { autoClose: 3000 })
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}
