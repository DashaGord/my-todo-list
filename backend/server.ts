import express, {Request, Response} from "express"
import bodyParser from "body-parser"
import cors from "cors"
import {CreateTaskRequest, Task} from "./interfaces/Task"
import binarySearchByNumber from "./service/binaryService"
import {DatabaseService, getAllTasks, insertTask, setupDatabase} from "./service/databaseService"

import {isMainThread, parentPort, Worker, workerData} from 'worker_threads';

const app = express()
app.use(cors())
app.use(bodyParser.json())
let lastId = 1

const databaseService = new DatabaseService('./db/mydb.sqlite');

function createTask(title: string): Task {
  return { id: lastId++, title: title, number: 0, finished: false }
}

type TaskMap = Map<number, Task>

async function setup() {
  const db = databaseService.db
  const tasks = await getAllTasks(db)
  const taskMap: TaskMap = new Map(tasks.map((task: Task) => [task.id, task]))

  app.get("/api/task", async (req: Request, res: Response) => {
    const tasks = await getAllTasks(db)
    res.send(tasks)
  })

  // O(N)
  app.get("/api/task/slow/:num", async (req: Request, res: Response) => {
    const num = parseInt(req.params.num, 10)
    const tasks = await getAllTasks(db)
    const task = tasks.filter((t) => t.number === num)
    res.send(task)
  })

  // O(LOG(N))
  // Это работает только с отсорт коллекциями
  app.get("/api/task/middle/:num", async (req: Request, res: Response) => {
    const num = parseInt(req.params.num, 10)
    const tasks = await getAllTasks(db)
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
      await insertTask(db, newTask)
      res.send(newTask)
    },
  )

  // многопоточный пример
// Шаг 2: Создание и выполнение независимых запросов с использованием многопоточности
  app.get('/api/task/multithreading', async (req, res) => {
    if (isMainThread) {
      const worker1 = new Worker(__filename, { workerData: { tableName: 'table1' } });
      const worker2 = new Worker(__filename, { workerData: { tableName: 'table2' } });

      // Ожидание завершения работы всех worker'ов
      try {
        const [result1, result2] = await Promise.all([
          worker1.on('message', (msg) => msg),
          worker2.on('message', (msg) => msg),
        ]);

        // Шаг 3: Объединение результатов
        const numericResult1 = Number(result1) || 0;
        const numericResult2 = Number(result2) || 0;

        // Combine numeric results
        const combinedResult = numericResult1 + numericResult2;
        console.log('Combined Result:', combinedResult);

        // Отправка объединенного результата клиенту
        res.json({ combinedResult });
      } catch (error) {
        console.error('Error in worker:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } finally {
        // Шаг 4: Закрытие базы данных
        databaseService.closeConnection();
      }
    } else {
      // Шаг 2 (продолжение): Выполнение запроса в отдельном worker'е
      const tableName = workerData.tableName;

      try {
        const total = await databaseService.executeQuery(tableName);
        // Отправка результата обратно в главный поток
        if (parentPort) {
          parentPort.postMessage(total);
        }
      } catch (error) {
        console.error('Error in worker:', error);
      }
    }
  });

  // ... остальные обработчики

  app.listen(3000, () => console.log("Server running on port 3000"))
}

setup().then(() => {})