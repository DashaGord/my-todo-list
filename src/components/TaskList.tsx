import React from "react"
import TaskItem from "./TaskItem"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { selectTasks } from "../app/tasksSlice"
import { callDeleteTask, callUpdateTask } from "../service/TaskService"

export function TaskList() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={() => callDeleteTask(dispatch, task.id)}
          onFinishTask={() =>
            callUpdateTask(dispatch, { id: task.id, finished: true })
          }
        />
      ))}
    </ul>
  )
}

export default TaskList
