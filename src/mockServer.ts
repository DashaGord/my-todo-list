import { createServer, Model } from "miragejs"
import {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskResponse,
  Task,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from "./interfaces/Task"

export function makeServer({ environment = "development" } = {}) {
  let lastId = 1

  function createTask(title: string) {
    return { id: lastId++, title: title, finished: false }
  }

  const server = createServer({
    environment,

    models: {
      task: Model.extend<Partial<Task>>({}),
    },

    routes() {
      this.namespace = "api"

      this.get("/task", (schema): Promise<Task[]> => {
        return new Promise<Task[]>((resolve) => {
          setTimeout(() => {
            resolve(schema.db.tasks as Task[])
          }, 2000)
        })
      })

      this.post("/task", (schema, request): Promise<CreateTaskResponse> => {
        return new Promise<CreateTaskResponse>((resolve) => {
          setTimeout(() => {
            const createTaskRequest = JSON.parse(request.requestBody)
              .request as CreateTaskRequest
            const newTask = createTask(createTaskRequest.title)
            server.create("task", {
              id: newTask.id.toString(),
              title: newTask.title,
              finished: newTask.finished,
            })
            resolve(newTask as CreateTaskResponse)
          }, 100)
        })
      })

      this.delete(
        "/task/:id",
        (schema, request): Promise<DeleteTaskResponse> => {
          return new Promise<DeleteTaskResponse>((resolve, reject) => {
            setTimeout(() => {
              const taskId = request.params.id
              const findTask = schema.find("task", taskId)
              if (findTask) {
                findTask.destroy()
                resolve({ id: parseInt(taskId) } as DeleteTaskResponse)
              } else {
                reject(new Error("Задача не найдена"))
              }
            }, 100)
          })
        },
      )

      this.patch("/task/", (schema, request): Promise<UpdateTaskResponse> => {
        return new Promise<UpdateTaskResponse>((resolve, reject) => {
          setTimeout(() => {
            const updateTaskRequest = JSON.parse(request.requestBody)
              .request as UpdateTaskRequest
            const findTask = schema.find(
              "task",
              updateTaskRequest.id.toString(),
            )
            if (findTask) {
              findTask.update(updateTaskRequest)
              resolve(findTask.attrs as UpdateTaskResponse)
            } else {
              reject(new Error("Задача не найдена"))
            }
          }, 100)
        })
      })
    },

    seeds(server) {
      server.db.loadData({
        tasks: [
          createTask("Task 1"),
          createTask("Task 2"),
          createTask("Task 3"),
        ],
      })
    },
  })

  return server
}
