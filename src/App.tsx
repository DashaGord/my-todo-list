import "./App.css"
import { useEffect } from "react"
import { getIsLoadingStatus } from "./app/tasksSlice"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import TaskList from "./components/TaskList"
import { TaskForm } from "./components/TaskForm"
import Spinner from "./components/Spinner"
import { fetchTasks } from "./service/TaskService"
import styled from "styled-components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const StyledTaskContainer = styled.div`
  width: 550px;
  height: 550px;
`

function App() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getIsLoadingStatus)

  useEffect(() => {
    fetchTasks(dispatch)
  }, [dispatch])

  return (
    <div className="App">
      <header className="App-header">
        <ToastContainer />
        {isLoading ? (
          <Spinner />
        ) : (
          <StyledTaskContainer>
            <TaskForm /> <TaskList />
          </StyledTaskContainer>
        )}
      </header>
    </div>
  )
}

export default App
