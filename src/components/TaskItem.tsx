import React from "react"
import { Task } from "../interfaces/Task"
import styled from "styled-components"

interface TaskItemProps {
  task: Task
  onDeleteTask: () => void
  onFinishTask: () => void
}

const TaskSpan = styled.span<{ finished: boolean }>`
  background-color: ${(props) => (props.finished ? "green" : "transparent")};
  text-decoration: ${(props) => (props.finished ? "line-through" : "none")};
`

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDeleteTask,
  onFinishTask,
}) => {
  return (
    <li>
      <TaskSpan finished={task.finished} onClick={onFinishTask}>
        {task.title}
      </TaskSpan>
      <button onClick={onDeleteTask}>X</button>
    </li>
  )
}

export default TaskItem
