import "./App.css"
import { useEffect } from "react"
import { tasksIsLoading } from "./app/tasksSlice"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import TaskList from "./components/TaskList"
import { TaskForm } from "./components/TaskForm"
import Spinner from "./components/Spinner"
import { makeServer } from "./mockServer"
import { fetchTasks } from "./service/TaskService"

function App() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(tasksIsLoading)

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      makeServer({ environment: "development" })
    }
  }, [])

  useEffect(() => {
    fetchTasks(dispatch)
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <TaskForm /> <TaskList />
          </>
        )}
      </header>
    </div>
  )
}

export default App
