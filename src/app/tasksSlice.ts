import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"
import {
  DeleteTaskResponse,
  Task,
  UpdateTaskResponse,
} from "../interfaces/Task"

interface TasksState {
  tasks: Task[]
  isLoading: boolean
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
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
      const itemIndex = state.tasks.findIndex((item) => item.id == taskId)
      if (itemIndex !== -1) {
        state.tasks.splice(itemIndex, 1)
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload as boolean
    },
    updateTask: (state, action) => {
      const updateTaskResponse: UpdateTaskResponse = action.payload

      const itemIndex = state.tasks.findIndex(
        (item) => item.id === updateTaskResponse.id,
      )
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

export const selectTasks = (state: RootState) => state.tasks.tasks
export const tasksIsLoading = (state: RootState) => state.tasks.isLoading

export default tasksSlice.reducer
