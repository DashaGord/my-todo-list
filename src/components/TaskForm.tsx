import React, {useState} from "react"
import styled from "styled-components";


import {useAppDispatch} from "../app/hooks"
import {callCreateTask} from "../service/TaskService";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  width: 30%;
  background-color: deepskyblue;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
`;

export function TaskForm() {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (title.trim() !== "") {
            callCreateTask(dispatch, {title: title})
            setTitle("")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Container>
                <StyledInput
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название задачи"
                />
                <StyledButton type="submit">+ Добавить</StyledButton>
            </Container>
        </form>
    )
}
