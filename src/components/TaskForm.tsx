import React, { useState } from "react"

import { useAppDispatch } from "../app/hooks"
import { callCreateTask } from "../service/TaskService";

export function TaskForm() {
  const dispatch = useAppDispatch()
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    callCreateTask(dispatch, { title: title })
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button type="submit">Add Task</button>
    </form>
  )
}
