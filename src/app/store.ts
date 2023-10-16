import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./tasksSlice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>