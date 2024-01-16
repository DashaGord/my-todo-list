import React from "react"
import { Task } from "../interfaces/Task"
import styled from "styled-components"

interface TaskItemProps {
  task: Task
  onDeleteTask: () => void
  onFinishTask: () => void
}

const TaskLi = styled.li`
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  height: 100%;
  align-items: center;
`

const TaskListItem = styled.div<{ $finished: boolean }>`
  background-color: ${(props) => (props.$finished ? "lightgreen" : "#f1f0f0")};
  text-decoration: ${(props) => (props.$finished ? "line-through" : "none")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => (props.$finished ? "#74ce74" : "#ccc")};
  margin: 2px 0px;
  width: 95%;
  height: 100%;
`

const TaskButton = styled.button`
  background-color: #dc0909;
  color: white;
  border: none;
  cursor: pointer;
  width: 5%;
  font-size: 9px;
  font-weight: bold;
  height: 30px;
`

const TaskSpan = styled.span`
  padding: 5px;
  text-align: left;
  word-break: break-word;
  font-size: 14px;
`

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDeleteTask,
  onFinishTask,
}) => {
  return (
    <TaskLi>
      <TaskListItem $finished={task.finished} onClick={onFinishTask}>
        <TaskSpan>{task.title}</TaskSpan>
      </TaskListItem>
      <TaskButton onClick={onDeleteTask}>X</TaskButton>
    </TaskLi>
  )
}

export default TaskItem
