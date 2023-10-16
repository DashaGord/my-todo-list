import React from "react"
import {Task} from "../interfaces/Task"
import styled from "styled-components"

interface TaskItemProps {
    task: Task
    onDeleteTask: () => void
    onFinishTask: () => void
}


const TaskListItem = styled.li`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  margin-bottom: 8px;
  //padding: 8px;
`;

const TaskContainer = styled.div`
  display: inline-block; /* Добавляем эту строку */
  align-items: center; /* Добавляем эту строку */
  width: 90%;
`;

const TaskButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8.5px 12px;
  cursor: pointer;
  margin-left: -15px;
`;

const TaskSpan = styled.span<{ finished: boolean }>`
  background-color: ${(props) => (props.finished ? "lightgreen" : "#f1f0f0")};
  text-decoration: ${(props) => (props.finished ? "line-through" : "none")};
  display: inline-block;
  width: 100%;
  padding-left: 7px;
  text-align: left;
  word-break: break-word;
`;


const TaskItem: React.FC<TaskItemProps> = ({
                                               task,
                                               onDeleteTask,
                                               onFinishTask,
                                           }) => {
    return (
        <TaskListItem>
            <TaskContainer>
                <TaskSpan finished={task.finished} onClick={onFinishTask}>
                    {task.title}
                </TaskSpan>
            </TaskContainer>
            <TaskButton onClick={onDeleteTask}>X</TaskButton>
        </TaskListItem>
    )
}

export default TaskItem


