import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { CreateTaskRequest, Task } from "./interfaces/Task"
import binarySearchByNumber from "./service/binaryService"
import { DatabaseService } from "./service/databaseService"

async function main() {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  let lastId = 1

  const databaseService = await DatabaseService.build()

  function createTask(title: string): Task {
    return { id: lastId++, title: title, number: 0, finished: false }
  }

  type TaskMap = Map<number, Task>

  async function setup() {
    const tasks = await databaseService.getAllTasks()
    const taskMap: TaskMap = new Map(tasks.map((task: Task) => [task.id, task]))

    app.get("/api/task", async (req: Request, res: Response) => {
      const tasks = await databaseService.getAllTasks()
      res.send(tasks)
    })

    // O(N)
    app.get("/api/task/slow/:num", async (req: Request, res: Response) => {
      const num = parseInt(req.params.num, 10)
      const tasks = await databaseService.getAllTasks()
      const task = tasks.filter((t) => t.number === num)
      res.send(task)
    })

    // O(LOG(N))
    // Это работает только с отсорт коллекциями
    app.get("/api/task/middle/:num", async (req: Request, res: Response) => {
      const num = parseInt(req.params.num, 10)
      const tasks = await databaseService.getAllTasks()
      const task = binarySearchByNumber(tasks, num)
      res.send(task)
    })

    // O(1)
    // Предположим у нас заранее сохранен кэш в виде коллекции МАП
    app.get("/api/task/fast/:num", async (req: Request, res: Response) => {
      const num = parseInt(req.params.num, 10)
      const task = taskMap.get(num)
      res.send(task)
    })

    app.post(
      "/api/task",
      async (req: Request<{}, {}, CreateTaskRequest>, res: Response) => {
        const newTask = createTask(req.body.title)
        await databaseService.insertTask(newTask)
        res.send(newTask)
      },
    )

    // многопоточный пример
    app.get("/api/task/multithreading", async (req, res) => {
      try {
        const results = await Promise.all([
          databaseService.sumTable1(),
          databaseService.sumTable2(),
        ])
        const totalSum = results.reduce((a, b) => a + b, 0)
        res.json(totalSum)
      } catch (err) {
        if (err instanceof Error) {
          res.status(500).send(err.message)
        } else {
          res.status(500).send("An unknown error occurred")
        }
      }
    })

    // ... остальные обработчики

    app.listen(3000, () => console.log("Server running on port 3000"))
  }

  setup()
}

main()
