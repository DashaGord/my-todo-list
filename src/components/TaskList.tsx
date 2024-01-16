import React from "react"
import TaskItem from "./TaskItem"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getAllTasks } from "../app/tasksSlice"
import { callDeleteTask, callUpdateTask } from "../service/TaskService"
import { Task } from "../interfaces/Task"
import styled from "styled-components"

const TaskListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export function TaskList() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(getAllTasks)

  return (
    <TaskListUl>
      {tasks.map((task: Task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={() => callDeleteTask(dispatch, task.id)}
          onFinishTask={() =>
            task.finished
              ? null
              : callUpdateTask(dispatch, { id: task.id, finished: true })
          }
        />
      ))}
    </TaskListUl>
  )
}

export default TaskList
