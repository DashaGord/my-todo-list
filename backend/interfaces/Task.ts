export interface Task {
    id: number;
    title: string;
    finished: boolean;
}

export interface CreateTaskRequest {
    title: string;
}

export interface UpdateTaskRequest extends Task {}

export interface DeleteTaskResponse {
    id: number;
}
