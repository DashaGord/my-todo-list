import React from "react"
import TaskItem from "./TaskItem"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { getAllTasks } from "../app/tasksSlice"
import { callDeleteTask, callUpdateTask } from "../service/TaskService"
import { Task } from "../interfaces/Task"

export function TaskList() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(getAllTasks)

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
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
    </ul>
  )
}

export default TaskList
