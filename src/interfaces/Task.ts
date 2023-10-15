interface HasId {
  id: number
}

export interface Task extends HasId {
  title: string
  finished: boolean
}

export interface CreateTaskRequest {
  title: string
}

export interface CreateTaskResponse extends Task {}

export interface DeleteTaskResponse extends HasId {}

export interface UpdateTaskRequest extends HasId {
  finished: boolean
}

export interface UpdateTaskResponse extends Task {}
