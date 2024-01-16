import { createSlice } from "@reduxjs/toolkit"
import {
  DeleteTaskResponse,
  Task,
  UpdateTaskResponse,
} from "../interfaces/Task"
import { createSelector } from "reselect"
import {RootState} from "./store";

interface TasksState {
  tasks: Task[]
  isLoading: boolean
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
}

interface State {
  tasks: {
    isLoading: boolean;
  };
}

export const tasksSlice = createSlice({
  name: "tasksSlice",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task: Task = action.payload
      state.tasks.push(task)
    },
    removeTask: (state, action) => {
      const taskId = (action.payload as DeleteTaskResponse).id
      const itemIndex = state.tasks.findIndex((item) => item.id === taskId)
      if (itemIndex !== -1) {
        state.tasks.splice(itemIndex, 1)
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload as boolean
    },
    updateTask: (state, action) => {
      const updateTaskResponse: UpdateTaskResponse = action.payload
      const taskId = updateTaskResponse.id
      const itemIndex = state.tasks.findIndex((item) => item.id === taskId)
      if (itemIndex !== -1) {
        state.tasks[itemIndex] = {
          ...state.tasks[itemIndex],
          ...updateTaskResponse,
        }
      }
    },
  },
})

export const { addTask, removeTask, setLoading, updateTask } =
  tasksSlice.actions

const getTasks = (state: RootState) => state.tasks.tasks

// Селектор для получения всех пользователей
export const getAllTasks = createSelector([getTasks], (tasks) => {
  return tasks
})

const getIsLoading = (state: RootState) => state.tasks.isLoading

// Селектор для получения статуса загрузки
export const getIsLoadingStatus = createSelector(
  [getIsLoading],
  (isLoading: boolean) => {
    return isLoading
  },
)

export default tasksSlice.reducer
